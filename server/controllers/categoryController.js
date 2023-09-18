import db from '../db.js';
import ApiError from '../exeptions/apiError.js';
import { primaryCheckUser } from '../services/primaryCheckUser.js';
import translitPrepare from '../services/translitPrepare.js';
import ResetSeq from '../services/resetSequence.js';
import fs from 'fs';
import { config } from 'dotenv';
import sharp from 'sharp';


class CategoryController {
	async addCategory(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();
		// получаем id юзера, по email из токена
		const getUser = await db.query(`
			SELECT * FROM users
			WHERE email = '${isAccessValid.email}';
		`);
		if (!getUser.rowCount) throw ApiError.UnathorizedError();
		const user_id = getUser.rows[0].id;

		try {
			// после всех проверок достаём категорию для занесения её в БД
			const { categoryText } = req.body;
			let picture;
			if (req.files) picture = Object.values(req.files)[0];

			// транслитерация названия
			const captionLat = translitPrepare(categoryText).toLowerCase().replaceAll(" ", '_');

			let previewPath = null;
			let bgPath = null;

			// описываем путь, по которому расположится папка категории
			const mainPath = `static/category/${captionLat}`;
			// создаём папку для категории
			fs.mkdirSync(mainPath, { recursive: true }, err => console.log(err));

			// если есть файл изображения
			if (picture) {
				// описываем путь, по которому расположится файл
				previewPath = `${mainPath}/photo.jpg`;
				bgPath = `${mainPath}/bg.jpg`;

				// перемещаем файл в папку, изменяя его размер для превью
				sharp(picture.data)
					.resize({ width: 170, height: 140 })
					.toFormat('jpeg')
					.jpeg({ quality: 80 })
					.toFile(previewPath, (err, info) => {
						if (err) {
							console.log(err);
						}
					});
				// перемещаем файл в папку, изменяя его размер для фона
				sharp(picture.data)
					.resize({ width: 1920, height: 1080 })
					.toFormat('jpeg')
					.jpeg({ quality: 100 })
					.toFile(bgPath, (err, info) => {
						if (err) {
							console.log(err);
						}
					});
			}

			// убираем из пути слово 'static'
			const photopreview = picture ? previewPath && previewPath.replace('static', '') : null;
			const bg = picture ? bgPath && bgPath.replace('static', '') : null;

			await ResetSeq.resetSequence('category');
			const newCategory = await db.query(`
				INSERT INTO category(user_id, caption, photopreview, bg, caption_lat)
				VALUES ('${user_id}','${categoryText}', ${photopreview ? `'${photopreview}'` : null}, ${bg ? `'${bg}'` : null}, '${captionLat}')
				RETURNING *;
			`);
			if (!newCategory.rowCount) throw ApiError.BadRequest("Can't to add new category");
			res.json(newCategory.rows[0]);
		} catch (err) {
			console.log(err);
			res.status(400).json(err)
		}

	}

	async deleteCategory(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

		try {
			// после всех проверок достаём категорию для удаления её из БД
			const { categoryCaption } = req.body;
			const deletedCategory = await db.query(`
				DELETE FROM category
				WHERE caption='${categoryCaption}'
				RETURNING caption;
			`);
			if (!deletedCategory.rowCount) throw ApiError.BadRequest("Can't to delete category");

			const captionLat = translitPrepare(categoryCaption).toLowerCase().replaceAll(" ", '_');
			// удаляем папку категории в static
			fs.rmSync(`static/category/${captionLat}`, { force: true, recursive: true, maxRetries: 3 }, err => console.log(err));

			res.json(deletedCategory.rows[0].caption);
		} catch (err) {
			res.status(400).json(
				Number(err.code) === 23503
					? { message: "возможно к данной категории ещё принадлежат некоторые блоги или рецепты" }
					: err
			);
		}
	}

	async editCategory(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

		try {
			// после всех проверок достаём категории для изменения в БД
			const { oldCategory, newCategory } = req.body;
			const categoryLat = translitPrepare(newCategory).toLowerCase().replaceAll(" ", '_')
			let file;
			if (req.files) file = Object.values(req.files)[0];

			// определяем пути для изображений
			let bgImage;
			let photoPreview;

			// изменяем название папки категории в папке category в случае изменения названия категории
			// описываем путь для старой папки категории
			const oldPath = `static/category/${translitPrepare(oldCategory).toLowerCase().replaceAll(" ", '_')}`;
			// описываем путь для новой папки категории
			const newPath = `static/category/${categoryLat}`;
			// переименовываем папку для категории
			fs.renameSync(oldPath, newPath, err => console.log(err));
			

			// если картинка была заменёна
			if (file) {
				// перемещаем файл в папку, изменяя его размер для превью
				sharp(file.data)
					.resize({ width: 170, height: 140 })
					.toFormat('jpeg')
					.jpeg({ quality: 80 })
					.toFile(`${newPath}/photo.jpg`, (err, info) => {
						if (err) {
							console.log(err);
						}
					});
				// перемещаем файл в папку, изменяя его размер для фона
				sharp(file.data)
					.resize({ width: 1920, height: 1080 })
					.toFormat('jpeg')
					.jpeg({ quality: 100 })
					.toFile(`${newPath}/bg.jpg`, (err, info) => {
						if (err) {
							console.log(err);
						}
					});
			}

			// создаём пути к файлам для БД
			bgImage = `${newPath.replace('static', '')}/bg.jpg`;
			photoPreview = `${newPath.replace('static', '')}/photo.jpg`;


			const updatedCategory = await db.query(`
				UPDATE category
				SET
				caption='${newCategory}',
				photopreview='${photoPreview}',
				bg='${bgImage}',
				caption_lat='${categoryLat}'
				
				WHERE "caption"='${oldCategory}'
				RETURNING caption;
			`);

			res.json(updatedCategory.rows[0]);
		} catch (err) {
			res.status(400).json({ message: err });
		}
	}

	async getAllCategories(req, res) {
		try {
			const { isAccessValid } = await primaryCheckUser(req.cookies);
			if (!isAccessValid.email) throw ApiError.UnathorizedError();

			// после всех проверок достаём категории
			const categories = await db.query(`SELECT * FROM category;`);

			const categoryData = categories.rows.map(category => {
				return (
					{
						caption: category.caption,
						categoryname: translitPrepare(category.caption).toLowerCase().replaceAll(" ", '_'),
						photopreview: category.photopreview
					}
				)
			});
			res.json(categoryData);
		} catch (err) {
			res.status(err.status).json({ message: err });
		}
	}

	async getCategoryName(req, res) {
		// получение имён (на латинице и кирилице) и фонового изображения
		try {
			const { lat_name } = req.body;

			const categoryName = await db.query(`
				SELECT caption, caption_lat, bg
				FROM category
				WHERE caption_lat='${lat_name}';
			`);
			if (!categoryName.rowCount) throw ApiError.BadRequest("Error while getting categoryName");

			const categoryData = {
				caption: categoryName.rows[0].caption,
				captionLat: categoryName.rows[0].caption_lat,
				bg: config().parsed.LOCAL_ADDRESS + categoryName.rows[0].bg
			}
			res.json(categoryData);
		} catch (err) {
			console.log(err);
			res.status(err.status).json({ message: err });
		}
	}
}

export default new CategoryController;
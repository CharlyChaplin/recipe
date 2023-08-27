import db from '../db.js';
import ApiError from '../exeptions/apiError.js';
import { primaryCheckUser } from '../services/primaryCheckUser.js';
import translitPrepare from '../services/translitPrepare.js';


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
			db.query(`SELECT MAX(id) FROM category;`)
				.then(resp => db.query(`ALTER SEQUENCE category_id_seq RESTART WITH ${resp.rows[0].max + 1};`));
			const newCategory = await db.query(`
				INSERT INTO category(user_id, caption)
				VALUES ('${user_id}','${categoryText}')
				RETURNING *;
			`);
			if (!newCategory.rowCount) throw ApiError.BadRequest("Can't to add new category");
			res.json(newCategory.rows[0]);
		} catch (err) {
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
			res.json(deletedCategory.rows[0].caption);
		} catch (err) {
			res.status(400).json(err)
		}
	}

	async editCategory(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

		try {
			// после всех проверок достаём категории для изменения в БД
			const { oldCategory, newCategory } = req.body;
			const updatedCategory = await db.query(`
				UPDATE category SET "caption"='${newCategory}'
				WHERE "caption"='${oldCategory}'
				RETURNING caption;
			`);
			console.log(updatedCategory.rows);
			res.json(updatedCategory.rows[0]);
		} catch (err) {
			res.status(400).json(err);
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
						categoryname: translitPrepare(category.caption).toLowerCase().replace(" ", '_'),
						photopreview: category.photopreview
					}
				)
			});
			res.json(categoryData);
		} catch (err) {
			res.status(err.status).json(err);
		}
	}

	async getCategoryName(req, res) {
		// получение имён (на латинице и кирилице)
		try {
			const { lat_name } = req.body;

			const categoryName = await db.query(`SELECT caption, caption_lat FROM category WHERE caption_lat='${lat_name}';`);
			if (!categoryName.rowCount) throw ApiError.BadRequest("Error while getting categoryName");

			const categoryData = {
				caption: categoryName.rows[0].caption,
				captionLat: categoryName.rows[0].caption_lat
			}
			res.json(categoryData);
		} catch (err) {
			console.log(err);
			res.status(err.status).json(err);
		}
	}
}

export default new CategoryController;
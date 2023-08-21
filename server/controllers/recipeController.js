import db from '../db.js';
import ApiError from '../exeptions/apiError.js';
import { primaryCheckUser } from '../services/primaryCheckUser.js';
import { config } from 'dotenv';
import translitPrepare from '../services/translitPrepare.js';
import fs from 'fs';


class RecipeController {
	async addRecipe(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

		let user_id = 0;
		// получаем id юзера, по email из токена
		const getUser = await db.query(`
			SELECT * FROM users
			WHERE email = '${isAccessValid.email}';
		`);
		if (!getUser.rowCount) throw ApiError.UnathorizedError();
		user_id = getUser.rows[0].id;

		// после всех проверок достаём фразу для занесения её в БД
		const { phraseText } = req.body;
		db.query(`SELECT MAX(id) FROM phrase;`)
			.then(resp => db.query(`ALTER SEQUENCE phrase_id_seq RESTART WITH ${resp.rows[0].max + 1};`));
		db.query(`INSERT INTO phrase(user_id, caption) VALUES (
			'${user_id}','${phraseText}') RETURNING *;`)
			.then(resp => res.json(resp.rows[0]))
			.catch(err => {
				res.status(400).json(err)
			});
	}

	async deleteRecipe(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

		try {
			// после всех проверок достаём рецепт для удаления его из БД
			const { recipeCaption } = req.body;
			const deletedRecipe = await db.query(`
				DELETE FROM recipe
				WHERE caption='${recipeCaption}'
				RETURNING *;
			`);
			if (!deletedRecipe.rowCount) throw ApiError.BadRequest("Error while deleting the recipe");

			const captionLat = translitPrepare(recipeCaption).toLowerCase().replace(" ", '_');
			// удаляем папку рецепта в static
			fs.rmSync(`static/recipe/${captionLat}`, { force: true, recursive: true, maxRetries: 3 }, err => console.log(err));

			res.json(deletedRecipe.rows[0].caption);
		} catch (err) {
			res.status(400).json(err);
		}

	}

	async changeRecipe(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

		// после всех проверок достаём рецепт из запроса для изменения в БД
		let { dateadd, owner, caption, description, oldRecipeCaption } = req.body;
		let file = null;
		if (req.files) file = Object.values(req.files)[0];

		console.log(dateadd, owner, caption, description, oldBlogCaption, file);

		// берём данные из текущего состояния рецепта
		// const recipeNow = await db.query(`
		// 	SELECT * FROM recipe
		// 	WHERE caption='${oldRecipeCaption}';
		// `);

		// // если какие-либо данные отсутствуют, то запрашиваем их из текущей записи
		// if (!dateadd) {
		// 	dateadd = datePrepare(recipeNow.rows[0].dateadd);
		// };

		// if (!caption) {
		// 	caption = recipeNow.rows[0].caption;
		// };
		// if (!description) {
		// 	description = recipeNow.rows[0].description;
		// };
		// if (!owner) {
		// 	const currentOwner = await db.query(`
		// 		SELECT B.user_id FROM blog A, persondata B
		// 		WHERE A.caption='${oldBlogCaption}' AND A.user_id=B.user_id;
		// 	`);
		// 	owner = currentOwner.rows[0].user_id;
		// } else {
		// 	const getOwnerId = await db.query(`
		// 		SELECT user_id FROM persondata
		// 		WHERE name='${owner}';
		// 	`);
		// 	owner = getOwnerId.rows[0].user_id;
		// }

		// // определяем пути для изображений
		// let photoorig = blogNow.rows[0].photoorig;
		// let photopreview = blogNow.rows[0].photopreview;

		// // изменяем название папки блога в папке blogs в случае изменения названия блога
		// if (caption != undefined && (caption !== oldBlogCaption)) {
		// 	// описываем путь для старой папки блога
		// 	const oldPath = `static/blogs/${translitPrepare(oldBlogCaption).toLowerCase().replace(" ", '_')}`;
		// 	// описываем путь для новой папки блога
		// 	const newPath = `static/blogs/${translitPrepare(caption).toLowerCase().replace(" ", '_')}`;
		// 	// переименовываем папку для блога
		// 	fs.renameSync(oldPath, newPath, err => console.log(err));
		// 	photoorig = `${newPath.replace('static', '')}/photo.jpg`;
		// 	photopreview = `${newPath.replace('static', '')}/photo.jpg`;
		// }

		// // если картинка была заменёна
		// if (file) {
		// 	// перемещаем файл в папку
		// 	file.mv(`static/${photoorig}`, err => {
		// 		if (err) {
		// 			return res.status(500).send({ err: err, msg: "Error occurred" });
		// 		}
		// 	});
		// }

		try {
			// const updatedBlog = await db.query(`
			// 	UPDATE blog
			// 	SET dateadd='${dateadd}',
			// 		 user_id=${owner},
			// 		 photoorig='${photoorig}',
			// 		 photopreview='${photopreview}',
			// 		 caption='${caption}',
			// 		 description='${description}'

			// 	WHERE caption='${oldBlogCaption}'
			// 	RETURNING *;
			// `);
			// if (!updatedBlog.rowCount) throw ApiError.BadRequest("Can't to UPDATE blog");
			// res.json(updatedBlog.rows);
			res.json();
		} catch (err) {
			res.status(400).json(err);
		}

	}

	async getOneRecipe(req, res) {

		// достаём данные рецепта
		const { recipeCaption } = req.body;

		try {
			const isRecipe = await db.query(`
				SELECT * FROM recipe
				WHERE caption='${recipeCaption}';
			`);
			if (!isRecipe.rowCount) throw ApiError.BadRequest("Error while getting the recipe");
			// достаём владельца рецепта
			const owner = await db.query(`
				SELECT name FROM persondata
				WHERE user_id=${isRecipe.rows[0].user_id};
			`);
			let recipeData = Object.assign(
				{},
				owner.rows[0],
				isRecipe.rows[0],
			);
			
			// получаем текущую категорию в виде кириллицы
			const currentCategoryCyr = await db.query(`
				SELECT caption FROM category
				WHERE id = '${isRecipe.rows[0].category_id}';
			`);
			if (!currentCategoryCyr.rowCount) throw ApiError.BadRequest("Error while getting the categoryCyr");

			// достаём ингредиенты рецепта
			const ingredients = await db.query(`
				SELECT caption FROM ingredient
				WHERE recipe_id = ${isRecipe.rows[0].id}
			`);
			// формируем объект для выдачи
			recipeData = {
				...recipeData,
				photopreview: config().parsed.LOCAL_ADDRESS + isRecipe.rows[0].photopreview,
				photoorig: config().parsed.LOCAL_ADDRESS + isRecipe.rows[0].photoorig,
				ingredients: ingredients.rows.map(item => item.caption),
				category: currentCategoryCyr.rows[0].caption
			}
			delete recipeData.id;
			delete recipeData.user_id;
			delete recipeData.category_id;
			res.json(recipeData);
		} catch (err) {
			res.status(400).json(err)
		}
	}

	async getAllRecipies(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

		try {
			// получаем id юзера, по email из токена
			const getUser = await db.query(`
				SELECT * FROM users
				WHERE email = '${isAccessValid.email}';
		`);
			if (!getUser.rowCount) throw ApiError.UnathorizedError();
			const user_id = getUser.rows[0].id;
			const role = getUser.rows[0].role;
			const roleDescription = role === 1 ? 'admin' : role === 2 ? 'user' : 'unknown';
			// после всех проверок достаём рецепты в зависимости от прав пользователя
			if (roleDescription === 'admin') {
				db.query('SELECT * FROM recipe;')
					.then(resp => {
						const out = resp.rows.map(item => item.caption);
						res.json(out);
					})
					.catch(err => res.status(400).json(err));
			} else if (roleDescription === 'user') {
				db.query(`
					SELECT * FROM recipe
					WHERE user_id = ${user_id};
			`)
					.then(resp => {
						const out = resp.rows.map(item => item.caption);
						res.json(out);
					})
					.catch(err => res.status(400).json(err));
			}
		} catch (err) {
			res.status(400).json(err);
		}

	}

	async getPreviewRecipies(req, res) {

		try {
			const recipiesCategory = await db.query(`
				SELECT caption, photopreview
				FROM category
				ORDER BY caption ASC;
		`);

			const recipiesData = recipiesCategory.rows.map(recipe => {
				const photopreview = config().parsed.LOCAL_ADDRESS + recipe.photopreview;

				recipe = {
					categoryname: translitPrepare(recipe.caption).toLowerCase().replace(" ", '_'),
					caption: recipe.caption,
					photopreview: photopreview
				}
				return recipe;
			});

			res.json(recipiesData);
		} catch (err) {
			res.status(400).json(err);
		}
	}

	async getRecipiesInCategory(req, res) {
		const { categoryName } = req.body;

		try {
			const recipiesFromCategory = await db.query(`
				SELECT A.caption_lat, A.photopreview, A.caption
				FROM recipe as A, category as B
				WHERE A.category_id = B.id AND B.caption_lat = '${categoryName}';
			`);

			// выдаём массив, подцепляя пусть сервера к адресам картинок
			const recipiesData = recipiesFromCategory.rowCount
				? recipiesFromCategory.rows.map(el => ({ ...el, photopreview: config().parsed.LOCAL_ADDRESS + el.photopreview }))
				: null;


			res.json(recipiesData);
		} catch (err) {
			res.status(400).json(err);
		}
	}

}

export default new RecipeController;
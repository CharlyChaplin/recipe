import db from '../db.js';
import ApiError from '../exeptions/apiError.js';
import { primaryCheckUser } from '../services/primaryCheckUser.js';
import { config } from 'dotenv';
import translitPrepare from '../services/translitPrepare.js';


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
				RETURNING caption;
			`);
			if (!deletedRecipe.rowCount) throw ApiError.BadRequest("Error while deleting the recipe");

			res.json(deletedRecipe.rows[0].caption);
		} catch (err) {
			res.status(400).json(err);
		}

	}

	async changeRecipe(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

		// после всех проверок достаём блоги для изменения в БД
		const { oldBlog, newBlog } = req.body;
		db.query(`
			UPDATE blog SET "caption"='${newPhrase}'
			WHERE "caption"='${oldPhrase}' RETURNING *;
		`)
			.then(resp => res.json(resp.rows[0]))
			.catch(err => res.status(400).json(err));
	}

	async getOneRecipe(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

		try {
			// после всех проверок достаём данные рецепта
			const { recipeCaption } = req.body;
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
			const userData = Object.assign(
				{},
				owner.rows[0],
				isRecipe.rows[0]
			);
			delete userData.id;
			delete userData.user_id;
			delete userData.category_id;
			res.json(userData);
		} catch (err) {
			res.status(400).json(err)
		}
	}

	async getAllRecipies(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

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
	}

	async getPreviewRecipies(req, res) {
		const recipiesCategory = await db.query(`
			SELECT caption, preview
			FROM category
			ORDER BY caption ASC;
		`);

		const recipiesData = recipiesCategory.rows.map(recipe => {
			const photopreview = config().parsed.LOCAL_ADDRESS + recipe.preview;

			recipe = {
				categoryname: translitPrepare(recipe.caption).toLowerCase().replace(" ", '_'),
				caption: recipe.caption,
				photopreview: photopreview
			}
			return recipe;
		});

		res.json(recipiesData);
	}

}

export default new RecipeController;
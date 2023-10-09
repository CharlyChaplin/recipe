import db from '../db.js';
import ApiError from '../exeptions/apiError.js';
import { primaryCheckUser } from '../services/primaryCheckUser.js';
import { config } from 'dotenv';
import ResetSeq from '../services/resetSequence.js';
import translitPrepare from '../services/translitPrepare.js';
import { datePrepareForDB, datePrepareForFrontend } from '../services/datePrepare.js';
import fs from 'fs';
import sharp from 'sharp';


class RecipeController {
	async addRecipe(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();


		// после всех проверок достаём рецепт и файл картинки для занесения их в БД
		const { dateadd, owner, caption, shortDescription, ingredients, category, cookingText } = req.body;

		try {
			let picture;
			if (req.files) picture = Object.values(req.files)[0];

			const captionLat = translitPrepare(caption).toLowerCase().replaceAll(" ", '_');

			// описываем путь, по которому расположится папка рецепта
			const mainPath = `static/recipe/${captionLat}`;
			// создаём папку для рецепта
			fs.mkdirSync(mainPath, { recursive: true }, err => console.log(err));
			// описываем путь, по которому расположится файл
			const previewPath = `${mainPath}/preview.jpg`;
			const origPath = `${mainPath}/photo.jpg`;

			// перемещаем файл в папку, изменяя его размер для превью
			sharp(picture.data)
				.resize({ width: 200, height: 140 })
				.toFormat('jpeg')
				.jpeg({ quality: 80 })
				.toFile(previewPath, (err, info) => {
					if (err) {
						console.log(err);
					}
				});
			sharp(picture.data)
				.resize({ width: 320, height: 240 })
				.toFormat('jpeg')
				.jpeg({ quality: 100 })
				.toFile(origPath, (err, info) => {
					if (err) {
						console.log(err);
					}
				});

			// получаем id категории
			const getCategoryId = await db.query(`SELECT id FROM category WHERE caption='${category}'`);
			const categoryId = getCategoryId.rows[0].id;

			// получаем id юзера по e-mail из токена
			const getUserId = await db.query(`SELECT id FROM users WHERE email='${isAccessValid.email}';`)
			const userId = getUserId.rows[0].id;

			// убираем из пути слово 'static'
			const photopreview = previewPath.replace('static', '');
			const photoorig = origPath.replace('static', '');


			// сбрасываем счётчик последовательности в таблице recipe
			await ResetSeq.resetSequence('recipe');
			// добавляем запись в таблицу recipe
			const newRecipe = await db.query(`
				INSERT INTO recipe(user_id, category_id, dateadd, caption, caption_lat, photoorig, photopreview, shortdescription, cookingtext)
				VALUES (${userId}, ${categoryId}, '${datePrepareForDB(dateadd)}', '${caption}', '${captionLat}', '${photoorig}', '${photopreview}', '${shortDescription}', '${cookingText}')
				RETURNING *;
			`);
			// добавляем записи в таблицу ingredient
			// рождаем строки для множественного добавления
			const ings = JSON.parse(ingredients).map(ing => {
				return (
					ing.value.includes('--true')
						? `(${userId}, ${newRecipe.rows[0].id}, '${ing.value.replace('--true', '')}', true)`
						: `(${userId}, ${newRecipe.rows[0].id}, '${ing.value}', NULL)`
				)
			});
			// сбрасываем последовательность
			await ResetSeq.resetSequence('ingredient');
			// добавляем запись
			const newIngredients = await db.query(`
				INSERT INTO ingredient(user_id, recipe_id, caption, definition)
				VALUES ${ings}
				RETURNING *;
			`);
			const recipeData = {
				recipe: newRecipe.rows[0],
				ingredients: newIngredients.rows
			}
			res.json(recipeData);
		} catch (err) {
			console.log(err);
			res.status(400).json({ message: err.message });
		}
	}

	async deleteRecipe(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

		try {
			// после всех проверок достаём рецепт для удаления его из БД
			const { recipeCaption } = req.body;
			// получаем id рецепта
			const recipeId = await db.query(`SELECT id FROM recipe WHERE caption='${recipeCaption}'`);
			// удаляем ингредиенты для рецепта
			const deleteIngredients = await db.query(`
				DELETE FROM ingredient
				WHERE recipe_id=${recipeId.rows[0].id}
			`);
			if (!deleteIngredients.rowCount) throw ApiError.BadRequest("Error while deleting ingredients");
			// удаляем непосредственно рецепт
			const deletedRecipe = await db.query(`
				DELETE FROM recipe
				WHERE caption='${recipeCaption}'
				RETURNING *;
			`);
			if (!deletedRecipe.rowCount) throw ApiError.BadRequest("Error while deleting the recipe");

			const captionLat = translitPrepare(recipeCaption).toLowerCase().replaceAll(" ", '_');
			// удаляем папку рецепта в static
			fs.rmSync(`static/recipe/${captionLat}`, { force: true, recursive: true, maxRetries: 3 }, err => console.log(err));

			res.json(deletedRecipe.rows[0].caption);
		} catch (err) {
			console.log(err);
			res.status(400).json({ message: err.message });
		}

	}

	async changeRecipe(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

		try {
			// после всех проверок достаём рецепт из запроса для изменения в БД
			let { dateadd, owner, caption, shortDescription, ingredients, category, cookingText, oldRecipeCaption } = req.body;
			let file = null;
			if (req.files) file = Object.values(req.files)[0];
			if (!oldRecipeCaption) {
				throw ApiError.BadRequest("Absent old caption")
			};

			let categoryId;
			let captionLat;

			// берём данные из текущего состояния рецепта
			const recipeNow = await db.query(`
				SELECT * FROM recipe
				WHERE caption_lat='${oldRecipeCaption}';
			`);

			// если какие-либо данные отсутствуют, то запрашиваем их из текущей записи
			if (!dateadd) {
				dateadd = recipeNow.rows[0].dateadd;
			};

			if (!caption) caption = recipeNow.rows[0].caption;
			captionLat = translitPrepare(caption).toLowerCase().replaceAll(" ", '_');


			if (!shortDescription) {
				shortDescription = recipeNow.rows[0].shortdescription;
			};

			// если не пришла, то берём текущее значение из БД в виде id
			if (!category) {
				categoryId = recipeNow.rows[0].category_id;
			} else {
				// берём данные категории, исходя из тектового названия пришедшей категории
				const categoryNow = await db.query(`
					SELECT id FROM category
					WHERE caption='${category}';
				`);
				categoryId = categoryNow.rows[0].id;
			}

			if (!cookingText) {
				cookingText = recipeNow.rows[0].cookingtext;
			}

			if (!owner) {
				const currentOwner = await db.query(`
					SELECT B.user_id
					FROM recipe A, persondata B
					WHERE A.caption_lat='${oldRecipeCaption}' AND A.user_id=B.user_id;
				`);
				owner = currentOwner.rows[0].user_id;
			} else {
				const getOwnerId = await db.query(`
					SELECT user_id FROM persondata
					WHERE name='${owner}';
				`);
				owner = getOwnerId.rows[0].user_id;
			}

			// определяем пути для изображений
			let photoorig = recipeNow.rows[0].photoorig;
			let photopreview = recipeNow.rows[0].photopreview;

			// если картинка была заменёна
			if (file) {
				// перемещаем файл в папку, изменяя его размер для превью
				sharp(file.data)
					.resize({ width: 200, height: 140 })
					.toFormat('jpeg')
					.jpeg({ quality: 80 })
					.toFile(`static/${photopreview}`, (err, info) => {
						if (err) {
							console.log(err);
						}
					});
				// перемещаем файл в папку, изменяя его размер
				sharp(file.data)
					.resize({ width: 320, height: 240 })
					.toFormat('jpeg')
					.jpeg({ quality: 100 })
					.toFile(`static/${photoorig}`, (err, info) => {
						if (err) {
							console.log(err);
						}
					});
			}

			// изменяем название папки рецепта в папке recipe в случае изменения названия рецепта
			if (caption != undefined && (caption !== oldRecipeCaption)) {
				// описываем путь для старой папки рецепта
				const oldPath = `static/recipe/${oldRecipeCaption}`;
				// описываем путь для новой папки рецепта
				const newPath = `static/recipe/${translitPrepare(caption).toLowerCase().replaceAll(" ", '_')}`;
				// переименовываем папку для рецепта
				fs.renameSync(oldPath, newPath, err => console.log(err));
				photoorig = `${newPath.replace('static', '')}/photo.jpg`;
				photopreview = `${newPath.replace('static', '')}/preview.jpg`;
			}


			// обновляем запись рецепта
			const updatedRecipe = await db.query(`
				UPDATE recipe
				SET user_id=${owner},
					 category_id=${categoryId},
					 dateadd='${datePrepareForDB(dateadd)}',
					 caption='${caption}',
					 caption_lat='${captionLat}',
					 photoorig='${photoorig}',
					 photopreview='${photopreview}',
					 shortdescription='${shortDescription}',
					 cookingtext='${cookingText}'

				WHERE caption_lat='${oldRecipeCaption}'
				RETURNING *;
			`);
			if (!updatedRecipe.rowCount) throw ApiError.BadRequest("Результат запроса вернул пустую строку");

			// обновляем запись ингредиентов (для начала удалив все текущие, касательно данного рецепта)
			const deleteOldIngredientsForCurrentRecipe = await db.query(`
				DELETE FROM ingredient
				WHERE recipe_id=${recipeNow.rows[0].id};
			`);
			// создаём ингредиенты для текущего рецепта
			// рождаем строки для множественного добавления
			const ings = JSON.parse(ingredients).map(ing => {
				if (ing[0].includes('--true')) {
					ing[0] = ing[0].replace('--true', '');
					ing[1] = true;
				}

				return `(1, ${recipeNow.rows[0].id}, '${ing[0]}', ${ing[1]})`;
			});

			// сбрасываем счётчик последовательности в таблице ingredient
			await ResetSeq.resetSequence('ingredient');
			// добавляем запись
			const newIngredients = await db.query(`
				INSERT INTO ingredient(user_id, recipe_id, caption, definition)
				VALUES ${ings}
				RETURNING *;
			`);
			if (!newIngredients.rowCount) throw ApiError.BadRequest("Can't to UPDATE ingredients while EDIT recipe");

			const recipeData = {
				caption: updatedRecipe.rows[0].caption_lat
			}

			res.json(recipeData);
		} catch (err) {
			console.log(err);
			res.status(400).json(err.message);
		}

	}

	async getOneRecipe(req, res) {

		// достаём данные рецепта
		const { recipeCaption } = req.body;

		try {
			const isRecipe = await db.query(`
				SELECT * FROM recipe
				WHERE caption_lat='${translitPrepare(recipeCaption).toLowerCase().replaceAll(" ", '_')}';
			`);
			if (!isRecipe.rowCount) throw ApiError.NotFoundURL("Not found data");
			isRecipe.rows[0].dateadd = datePrepareForFrontend(isRecipe.rows[0].dateadd);

			// достаём владельца рецепта
			const owner = await db.query(`
				SELECT name FROM persondata
				WHERE user_id=${isRecipe.rows[0].user_id};
			`);

			let recipeData = Object.assign(
				{},
				isRecipe.rows[0],
				owner.rows[0]
			);

			// получаем текущую категорию в виде кириллицы
			const currentCategoryCyr = await db.query(`
				SELECT caption FROM category
				WHERE id = '${isRecipe.rows[0].category_id}';
			`);
			if (!currentCategoryCyr.rowCount) throw ApiError.BadRequest("Error while getting the categoryCyr");

			// достаём ингредиенты рецепта
			const ingredients = await db.query(`
				SELECT * FROM ingredient
				WHERE recipe_id = ${isRecipe.rows[0].id} ORDER BY id ASC
			`);
			// формируем объект для выдачи
			recipeData = {
				...recipeData,
				photopreview: config().parsed.LOCAL_ADDRESS + isRecipe.rows[0].photopreview,
				photoorig: config().parsed.LOCAL_ADDRESS + isRecipe.rows[0].photoorig,
				ingredients: ingredients.rows.map(item => [item.caption, item.definition]),
				category: currentCategoryCyr.rows[0].caption
			}
			delete recipeData.id;
			delete recipeData.user_id;
			delete recipeData.category_id;
			res.json(recipeData);
		} catch (err) {
			console.log(err);
			res.status(err.status).json(err.message);
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
				db.query('SELECT * FROM recipe ORDER BY caption ASC;')
					.then(resp => {
						const out = resp.rows.map(item => item.caption);
						res.json(out);
					})
					.catch(err => res.status(400).json({ message: err }));
			} else if (roleDescription === 'user') {
				db.query(`
					SELECT * FROM recipe
					WHERE user_id = ${user_id}
					ORDER BY caption ASC;
			`)
					.then(resp => {
						const out = resp.rows.map(item => item.caption);
						res.json(out);
					})
					.catch(err => res.status(400).json({ message: err }));
			}
		} catch (err) {
			res.status(400).json({ message: err.message });
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
					categoryname: translitPrepare(recipe.caption).toLowerCase().replaceAll(" ", '_'),
					caption: recipe.caption,
					photopreview: photopreview
				}
				return recipe;
			});

			res.json(recipiesData);
		} catch (err) {
			res.status(400).json({ message: err.message });
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
			console.log(err);
			res.status(400).json({ message: err.message });
		}
	}
}

export default new RecipeController;
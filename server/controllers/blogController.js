import db from '../db.js';
import ApiError from '../exeptions/apiError.js';
import { primaryCheckUser } from '../services/primaryCheckUser.js';
import { datePrepare, datePrepareForDB, datePrepareForFrontend } from '../services/datePrepare.js';
import { config } from 'dotenv';
import ResetSeq from '../services/resetSequence.js';
import translitPrepare from '../services/translitPrepare.js';
import fs from 'fs';
import limitText from '../services/limitText.js';


class BlogController {
	async addBlog(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

		// после всех проверок достаём данные блога
		const { dateadd, caption, description } = req.body;
		const [file] = Object.values(req.files);

		const captionLat = translitPrepare(caption).toLowerCase().replaceAll(" ", '_');

		try {
			// описываем путь, по которому расположится папка блога
			const mainPath = `static/blogs/${captionLat}`;
			// создаём папку для блога
			fs.mkdirSync(mainPath, { recursive: true }, err => console.log(err));
			// описываем путь, по которому расположится файл
			const filePath = `${mainPath}/photo.jpg`;
			// перемещаем файл в папку
			file.mv(`${filePath}`, err => {
				if (err) {
					return res.status(500).send({ err: err, msg: "Error occurred" });
				}
			});

			// получаем id юзера по e-mail из токена
			const getUserId = await db.query(`SELECT id FROM users WHERE email='${isAccessValid.email}';`)
			const userId = getUserId.rows[0].id;

			// убираем из пути слово 'static'
			const photoorig = filePath.replace('static', '');
			const photopreview = filePath.replace('static', '');


			// сбрасываем счётчик последовательности в таблице blog
			await ResetSeq.resetSequence('blog');
			const newBlog = await db.query(`
				INSERT INTO blog(user_id, dateadd, caption, caption_lat, photoorig, photopreview, description)
				VALUES (${userId}, '${datePrepareForDB(dateadd)}', '${caption}', '${captionLat}', '${photoorig}', '${photopreview}', '${description}')
				RETURNING *;
			`);
			res.json(newBlog.rows[0]);
		} catch (err) {
			console.log(err);
			res.status(400).json({ message: err });
		}
	}

	async deleteBlog(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

		try {
			// после всех проверок достаём блог для удаления его из БД
			const { caption } = req.body;
			const deletedBlog = await db.query(`
				DELETE FROM blog
				WHERE caption='${caption}'
				RETURNING caption;
			`);
			if (!deletedBlog.rowCount) throw ApiError.BadRequest("Error while deleting the blog");

			const captionLat = translitPrepare(caption).toLowerCase().replaceAll(" ", '_');
			// удаляем папку блога в static
			fs.rmSync(`static/blogs/${captionLat}`, { force: true, recursive: true, maxRetries: 3 }, err => console.log(err));

			res.json(deletedBlog.rows[0].caption);
		} catch (err) {
			res.status(400).json({ message: err });
		}

	}

	async changeBlog(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();


		// после всех проверок достаём блоги для изменения в БД
		let { dateadd, owner, caption, description, oldBlogCaption } = req.body;
		let file = null;
		if (req.files) file = Object.values(req.files)[0];


		try {
			// берём данные из текущего состояния блога
			const blogNow = await db.query(`
			SELECT * FROM blog
			WHERE caption='${oldBlogCaption}';
		`);

			// если какие-либо данные отсутствуют, то запрашиваем их из текущей записи
			if (!dateadd) {
				dateadd = blogNow.rows[0].dateadd;
			};
			dateadd = datePrepareForFrontend(dateadd);

			if (!caption) {
				caption = blogNow.rows[0].caption;
			};
			if (!description) {
				description = blogNow.rows[0].description;
			};
			if (!owner) {
				const currentOwner = await db.query(`
				SELECT B.user_id FROM blog A, persondata B
				WHERE A.caption='${oldBlogCaption}' AND A.user_id=B.user_id;
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
			let photoorig = blogNow.rows[0].photoorig;
			let photopreview = blogNow.rows[0].photopreview;

			// изменяем название папки блога в папке blogs в случае изменения названия блога
			if (caption != undefined && (caption !== oldBlogCaption)) {
				// описываем путь для старой папки блога
				const oldPath = `static/blogs/${translitPrepare(oldBlogCaption).toLowerCase().replaceAll(" ", '_')}`;
				// описываем путь для новой папки блога
				const newPath = `static/blogs/${translitPrepare(caption).toLowerCase().replaceAll(" ", '_')}`;
				// переименовываем папку для блога
				fs.renameSync(oldPath, newPath, err => console.log(err));
				photoorig = `${newPath.replace('static', '')}/photo.jpg`;
				photopreview = `${newPath.replace('static', '')}/photo.jpg`;
			}

			// если картинка была заменёна
			if (file) {
				// перемещаем файл в папку
				file.mv(`static/${photoorig}`, err => {
					if (err) {
						return res.status(500).send({ err: err, msg: "Error occurred" });
					}
				});
			}


			const updatedBlog = await db.query(`
				UPDATE blog
				SET dateadd='${datePrepareForDB(dateadd)}',
					 user_id=${owner},
					 photoorig='${photoorig}',
					 photopreview='${photopreview}',
					 caption='${caption}',
					 description='${description}'

				WHERE caption='${oldBlogCaption}'
				RETURNING *;
			`);
			if (!updatedBlog.rowCount) throw ApiError.BadRequest("Can't to UPDATE blog");
			res.json(updatedBlog.rows[0]);
		} catch (err) {
			console.log(err);
			res.status(400).json({ message: err });
		}

	}

	async getOneBlog(req, res) {
		try {
			let { blogCaption } = req.body;
			blogCaption = translitPrepare(blogCaption).toLowerCase().replaceAll(" ", "_");
			const isBlog = await db.query(`
				SELECT * FROM blog
				WHERE caption_lat='${blogCaption}';
			`);
			if (!isBlog.rowCount) throw ApiError.BadRequest("Error while getting the blog");

			// достаём владельца блога
			const owner = await db.query(`
				SELECT name FROM persondata
				WHERE user_id=${isBlog.rows[0].user_id};
			`);
			// редактируем данные для БД
			isBlog.rows[0].dateadd = datePrepareForFrontend(isBlog.rows[0].dateadd);
			isBlog.rows[0].photopreview = config().parsed.LOCAL_ADDRESS + isBlog.rows[0].photopreview;
			isBlog.rows[0].photoorig = config().parsed.LOCAL_ADDRESS + isBlog.rows[0].photoorig;
			const userData = Object.assign(
				{},
				owner.rows[0],
				isBlog.rows[0]
			);
			delete userData.user_id;
			delete userData.id;
			res.json(userData);
		} catch (err) {
			console.log(err);
			res.status(400).json({ message: err });
		}
	}

	async getAllBlogs(req, res) {
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
		// после всех проверок достаём фразы в зависимости от прав пользователя
		if (roleDescription === 'admin') {
			db.query('SELECT * FROM blog;')
				.then(resp => {
					const out = resp.rows.map(item => item.caption);
					res.json(out);
				})
				.catch(err => res.status(400).json({ message: err }));
		} else if (roleDescription === 'user') {
			db.query(`
				SELECT * FROM blog
				WHERE user_id = ${user_id};
			`)
				.then(resp => {
					const out = resp.rows.map(item => item.caption);
					res.json(out);
				})
				.catch(err => res.status(400).json({ message: err }));
		}

	}

	async getPreviewBlogs(req, res) {
		try {
			const blogs = await db.query(`
				SELECT A.id, B.name, A.dateadd, A.photopreview, A.caption, A.caption_lat, A.description
				FROM blog A, persondata B
				WHERE A.user_id = B.user_id
				ORDER BY A.id;
		`);

			const blogsData = blogs.rows.map(blog => {
				const photopreview = config().parsed.LOCAL_ADDRESS + blog.photopreview

				blog = {
					...blog,
					dateadd: datePrepareForFrontend(blog.dateadd),
					photopreview: photopreview,
					description: limitText(blog.description, 35),
				}
				return blog;
			});

			res.json(blogsData);
		} catch (err) {
			res.status(400).json({ message: err });
		}
	}
}

export default new BlogController;
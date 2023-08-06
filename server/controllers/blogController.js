import db from '../db.js';
import ApiError from '../exeptions/apiError.js';
import TokenService from '../services/tokenService.js';
import { primaryCheckUser } from '../services/primaryCheckUser.js';
import { datePrepare } from '../services/datePrepare.js';
import { config } from 'dotenv';


class BlogController {
	async addBlog(req, res) {
		const { accesstoken } = req.cookies;
		if (!accesstoken) throw ApiError.UnathorizedError();
		// проверяем accessToken на валидность
		const isAccessValid = TokenService.validAccessToken(accesstoken);
		// если токен валиден
		let user_id = 0;
		if (isAccessValid) {
			// получаем id юзера, по email из токена
			const getUser = await db.query(`
				SELECT * FROM users
				WHERE email = '${isAccessValid.email}';
			`);
			if (!getUser.rowCount) throw ApiError.UnathorizedError();
			user_id = getUser.rows[0].id;
		}
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

			res.json(deletedBlog.rows[0].caption);
		} catch (err) {
			res.status(400).json(err);
		}

	}

	async changeBlog(req, res) {
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

	async getOneBlog(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

		// после всех проверок достаём данные блога
		try {
			const { blogCaption } = req.body;
			const isBlog = await db.query(`
				SELECT * FROM blog
				WHERE caption='${blogCaption}';
			`);
			if (!isBlog.rowCount) throw ApiError.BadRequest("Error while getting the blog");

			// достаём владельца блога
			const owner = await db.query(`
				SELECT name FROM persondata
				WHERE user_id=${isBlog.rows[0].user_id};
			`);
			const userData = Object.assign(
				{},
				owner.rows[0],
				isBlog.rows[0]
			);
			delete userData.user_id;
			delete userData.id;
			res.json(userData);
		} catch (err) {
			res.status(400).json(err)
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
				.catch(err => res.status(400).json(err));
		} else if (roleDescription === 'user') {
			db.query(`
				SELECT * FROM blog
				WHERE user_id = ${user_id};
			`)
				.then(resp => {
					const out = resp.rows.map(item => item.caption);
					res.json(out);
				})
				.catch(err => res.status(400).json(err));
		}

	}

	async getPreviewBlogs(req, res) {
		const blogs = await db.query(`
			SELECT name, dateadd, photopreview, caption, description
			FROM blog, persondata;
		`);

		const blogsData = blogs.rows.map(blog => {
			const time = new Date(blog.dateadd);

			const day = datePrepare(time.getDate());
			const month = datePrepare(time.getMonth() + 1);
			const year = datePrepare(time.getFullYear());
			const photopreview = config().parsed.LOCAL_ADDRESS + blog.photopreview

			blog = {
				...blog,
				dateadd: `${day}.${month}.${year}`,
				photopreview: photopreview
			}
			return (blog);
		});

		
		res.json(blogsData);
	}

	getBlogById(req, res) {
		const { id } = req.params;
		db.query(`SELECT * FROM phrase WHERE id=${id};`)
			.then(resp => res.json(resp.rows))
			.catch(err => res.json(err));
	}

}

export default new BlogController;
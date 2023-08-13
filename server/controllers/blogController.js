import db from '../db.js';
import ApiError from '../exeptions/apiError.js';
import TokenService from '../services/tokenService.js';
import { primaryCheckUser } from '../services/primaryCheckUser.js';
import { datePrepare } from '../services/datePrepare.js';
import { config } from 'dotenv';
import ResetSeq from '../services/resetSequence.js';


class BlogController {
	async addBlog(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

		// после всех проверок достаём фразу для занесения её в БД
		const { dateadd, owner, caption, description } = req.body;
		const getUserId = await db.query(`SELECT id FROM users WHERE email='${isAccessValid.email}';`)
		const userId = getUserId.rows[0].id;

		const photoorig = null;
		const photopreview = null;
		console.log(dateadd, owner, caption, description, userId);

		try {
			// сбрасываем счётчик последовательности в таблице blog
			ResetSeq.resetSequence('blog');
			const newBlog = await db.query(`
				INSERT INTO blog(user_id, dateadd, caption, photoorig, photopreview, description)
				VALUES (${userId}, '${dateadd}', '${caption}', ${photoorig}, ${photopreview}, '${description}')
				RETURNING *;
			`);
			console.log(newBlog.rows);
			res.json("ok");
		} catch (err) {
			console.log(err);
			res.status(400).json(err)
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

			res.json(deletedBlog.rows[0].caption);
		} catch (err) {
			res.status(400).json(err);
		}

	}

	async changeBlog(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();


		// после всех проверок достаём блоги для изменения в БД
		let { dateadd, owner, caption, description, oldBlogCaption } = req.body;

		// если какие-либо данные отсутствуют, то запрашиваем их из текущей записи
		if (!dateadd) {
			const currentDateAdd = await db.query(`SELECT dateadd FROM blog WHERE caption='${oldBlogCaption}';`);
			dateadd = datePrepare(currentDateAdd.rows[0].dateadd);
		};
		if (!caption) {
			const currentCaption = await db.query(`SELECT caption FROM blog WHERE caption='${oldBlogCaption}';`);
			caption = currentCaption.rows[0].caption;
		};
		if (!description) {
			const currentDescription = await db.query(`SELECT description FROM blog WHERE caption='${oldBlogCaption}';`);
			description = currentDescription.rows[0].description;
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

		try {
			const updatedBlog = await db.query(`
				UPDATE blog
				SET dateadd='${dateadd}', user_id=${owner}, caption='${caption}', description='${description}'
				WHERE caption='${oldBlogCaption}'
				RETURNING *;
			`);
			if (!updatedBlog.rowCount) throw ApiError.BadRequest("Can't to UPDATE blog");
			res.json(updatedBlog.rows);
		} catch (err) {
			res.status(400).json(err);
		}

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
			isBlog.rows[0].dateadd = datePrepare(isBlog.rows[0].dateadd);
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
			res.status(400).json(err);
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
			SELECT A.id, name, dateadd, photopreview, caption, description
			FROM blog A, persondata B
			WHERE A.user_id = B.user_id
			ORDER BY A.id;
		`);

		const blogsData = blogs.rows.map(blog => {
			const photopreview = config().parsed.LOCAL_ADDRESS + blog.photopreview

			blog = {
				...blog,
				dateadd: datePrepare(blog.dateadd),
				photopreview: photopreview
			}
			return blog;
		});

		res.json(blogsData);
	}

	async getBlogById(req, res) {
		const { id } = req.params;
		try {
			const blog = await db.query(`
				SELECT A.id, A.user_id, name, dateadd, photopreview, caption, description
				FROM blog A, persondata B
				WHERE A.id = ${id};
			`);
			if (!blog.rowCount) ApiError.BadRequest("Error in getBlogById");

			const owner = await db.query(`
				SELECT name FROM persondata
				WHERE user_id=${blog.rows[0].user_id};
			`);
			const blogData = {
				id: blog.rows[0].id,
				name: owner.rows[0].name,
				dateadd: datePrepare(blog.rows[0].dateadd),
				photopreview: config().parsed.LOCAL_ADDRESS + blog.rows[0].photopreview,
				caption: blog.rows[0].caption,
				description: blog.rows[0].description
			}
			res.json(blogData);
		} catch (err) {
			res.json(err);
		}
	}

}

export default new BlogController;
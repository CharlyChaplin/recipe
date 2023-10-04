import db from '../db.js';
import ApiError from '../exeptions/apiError.js';

class FileController {
	async addFile(req, res) {
		const { userPath } = req.body;

		try {
			const myFiles = req.files ? Object.values(req.files) : null;
			console.log('req.body=', req.body, 'req.files=', myFiles);
			var out = [];
			let filePath = '';

			myFiles.forEach(file => {
				filePath = `static/users/${userPath}/${file.name}`;
				file.mv(filePath, err => {
					if (err) throw ApiError.BadRequest("Error while move file");
				});

				out = [...out, { name: file.name, path: `/${file.name}` }];
			});
			const userId = await db.query(`
				SELECT id FROM users
				WHERE email='${userPath}';
			`);
			const addPathToAvatar = await db.query(`
				UPDATE persondata SET avatar='${filePath}'
				WHERE user_id = ${userId.rows[0].id}
				RETURNING *;
			`);

			res.json(out);
		} catch (err) {
			console.log(err.message);
		}
	}
}

export default new FileController;
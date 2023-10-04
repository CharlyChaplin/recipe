import sharp from 'sharp';
import db from '../db.js';
import ApiError from '../exeptions/apiError.js';

class FileController {
	async addFile(req, res) {
		const { userPath } = req.body;

		try {
			console.log("hello");
			const myFiles = req.files ? Object.values(req.files) : null;
			console.log('req.body=', req.body, 'req.files=', myFiles);
			var out = [];
			let filePath = '';

			myFiles.forEach(file => {
				filePath = `static/users/${userPath}/${file.name}`;
				// перемещаем файл в папку, изменяя его размер
				sharp(file.data)
					.resize({ width: 120, height: 120 })
					.toFormat('jpeg')
					.jpeg({ quality: 95 })
					.toFile(filePath, (err, info) => {
						if (err) {
							console.log(err);
						}
					});
				// file.mv(filePath, err => {
				// 	if (err) throw ApiError.BadRequest("Error while move file");
				// });

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
			res.status(400).json(err.message);
		}
	}
}

export default new FileController;
import sharp from 'sharp';
import db from '../db.js';
import fs from 'fs';

class FileController {
	async addFile(req, res) {
		const { userPath } = req.body;

		try {
			const myFiles = req.files ? Object.values(req.files) : null;
			var out = [];
			let filePath = '';

			myFiles.forEach(file => {
				filePath = `users/${userPath}/avatar.jpg`;

				// если папка не существует - создать её
				if (!fs.existsSync(`static/users/${userPath}`)) fs.mkdirSync(`static/users/${userPath}`, err => console.log(err));

				// перемещаем файл в папку, изменяя его размер
				sharp(file.data)
					.resize({ width: 120, height: 120 })
					.toFormat('jpeg')
					.jpeg({ quality: 95 })
					.toFile(`static/${filePath}`, (err, info) => {
						if (err) {
							console.log("Error in sharp: ", err);
						}
					});

				out = [...out, { name: file.name, path: `/avatar.jpg` }];
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
			res.status(err.status || 400).json(err.message);
		}
	}

	async ping(req, res) {
		res.json("Hello from server!");
	}
}

export default new FileController;
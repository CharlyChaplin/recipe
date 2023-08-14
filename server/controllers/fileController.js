import db from '../db.js';

class FileController {
	async addFile(req, res) {
		const { userPath, blogPath } = req.body;
		const myFiles = Object.values(req.files);
		console.log(blogPath, myFiles);
		var out = [];
		let filePath = '';

		if (userPath) {
			myFiles.forEach(file => {
				filePath = `users/${userPath}/${file.name}`;
				file.mv(`static/${filePath}`, err => {
					if (err) {
						return res.status(500).send({ err: err, msg: "Error occurred" });
					}
				});

				out = [...out, { name: file.name, path: `/${file.name}` }];
			});
			const userId = await db.query(`SELECT id from users WHERE email='${userPath}'`);
			const addPathToAvatar = await db.query(`
			UPDATE persondata SET avatar='${filePath}'
			WHERE user_id = ${userId.rows[0].id}
			RETURNING *;
		`);
			res.json(out);

		} else if (blogPath) {

		}

	}
}

export default new FileController;
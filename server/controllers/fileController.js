import db from '../db.js';

class FileController {
	async addFile(req, res) {
		const { userPath } = req.body;
		const myFiles = req.files ? Object.values(req.files) : null;
		console.log('req.body=', req.body, 'req.files=', myFiles);
		var out = [];
		let filePath = '';

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
	}
}

export default new FileController;
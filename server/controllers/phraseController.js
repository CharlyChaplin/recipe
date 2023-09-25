import db from '../db.js';
import ApiError from '../exeptions/apiError.js';
import TokenService from '../services/tokenService.js';
import { primaryCheckUser } from '../services/primaryCheckUser.js';



class PhraseController {
	async addPhrase(req, res) {
		try {
			const { isAccessValid } = await primaryCheckUser(req.cookies);
			if (!isAccessValid.email) throw ApiError.UnathorizedError();

			// получаем id юзера, по email из токена
			const checkGetUser = await db.query(`
				SELECT * FROM users
				WHERE email = '${isAccessValid.email}';
			`);

			if (!checkGetUser.rowCount) throw ApiError.UnathorizedError();
			const role = checkGetUser.rows[0].role;
			const roleDescription = role === 1 ? 'admin' : role === 2 ? 'user' : 'unknown';

			if (roleDescription === 'admin') {
				// после всех проверок достаём фразу для занесения её в БД
				const { phraseText } = req.body;
				// сбрасываем счётчик последовательности в таблице phrase
				await ResetSeq.resetSequence('phrase');
				// добавляем фразу
				db.query(`
					INSERT INTO phrase(user_id, caption)
					VALUES ('${user_id}','${phraseText}')
					RETURNING *;
				`)
					.then(resp => res.json(resp.rows[0]))
					.catch(err => {
						if (Number(err.code) === 23505) {
							res.status(400).json({ message: "Такая фраза уже существует!" });
						} else {
							res.status(400).json({ message: "Ошибка при добавлении" });
						}
					});
			}

		} catch (err) {
			res.status(400).json({ message: err });
		}
	}

	async deletePhrase(req, res) {
		try {
			const { isAccessValid } = await primaryCheckUser(req.cookies);
			if (!isAccessValid.email) throw ApiError.UnathorizedError();

			// получаем id юзера, по email из токена
			const checkGetUser = await db.query(`
				SELECT * FROM users
				WHERE email = '${isAccessValid.email}';
			`);

			if (!checkGetUser.rowCount) throw ApiError.UnathorizedError();
			const role = checkGetUser.rows[0].role;
			const roleDescription = role === 1 ? 'admin' : role === 2 ? 'user' : 'unknown';

			if (roleDescription === 'admin') {
				// после всех проверок достаём фразу для удаления её из БД
				const { phrase } = req.body;
				db.query(`DELETE FROM phrase WHERE caption='${phrase}' RETURNING caption;`)
					.then(resp => res.json([resp.rows[0].caption]))
					.catch(err => res.status(400).json({ message: err }));
			}
		} catch (err) {
			res.status(400).json({ message: err });
		}
	}

	async changePhrase(req, res) {
		try {
			const { isAccessValid } = await primaryCheckUser(req.cookies);
			if (!isAccessValid.email) throw ApiError.UnathorizedError();

			// получаем id юзера, по email из токена
			const checkGetUser = await db.query(`
				SELECT * FROM users
				WHERE email = '${isAccessValid.email}';
			`);

			if (!checkGetUser.rowCount) throw ApiError.UnathorizedError();
			const role = checkGetUser.rows[0].role;
			const roleDescription = role === 1 ? 'admin' : role === 2 ? 'user' : 'unknown';

			if (roleDescription === 'admin') {
				// после всех проверок достаём фразы для изменения в БД
				const { oldPhrase, newPhrase } = req.body;

				// проверяем есть ли такая фраза
				const isExistsPhrase = await db.query(`
					SELECT id FROM phrase
					WHERE caption = '${oldPhrase}';
				`);
				if (!isExistsPhrase.rowCount) throw ApiError.BadRequest("Такая фраза отсутствует");

				// изменяем фразу
				db.query(`
					UPDATE phrase SET caption='${newPhrase}'
					WHERE caption='${oldPhrase}' RETURNING *;
				`)
					.then(resp => res.json(resp.rows[0]))
					.catch(err => {
						if (Number(err.code) === 23505) {
							res.status(400).json({ message: "Такая фраза уже существует!" });
						} else {
							res.status(400).json({ message: "Ошибка при изменении." });
						}
					});
			}
		} catch (err) {
			res.status(400).json({ message: err });
		}
	}

	async getPhraseById(req, res) {
		try {
			const { isAccessValid } = await primaryCheckUser(req.cookies);
			if (!isAccessValid.email) throw ApiError.UnathorizedError();

			// получаем id юзера, по email из токена
			const checkGetUser = await db.query(`
				SELECT * FROM users
				WHERE email = '${isAccessValid.email}';
			`);

			if (!checkGetUser.rowCount) throw ApiError.UnathorizedError();
			const role = checkGetUser.rows[0].role;
			const roleDescription = role === 1 ? 'admin' : role === 2 ? 'user' : 'unknown';

			if (roleDescription === 'admin') {
				const { id } = req.params;
				db.query(`SELECT * FROM phrase WHERE id=${id};`)
					.then(resp => res.json(resp.rows))
					.catch(err => res.json({ message: err }));
			}
		} catch (err) {
			res.status(400).json({ message: err });
		}
	}

	getRandomPhrase(req, res) {
		db.query(`
			SELECT * FROM phrase
			WHERE id > 0 AND
			id <= (SELECT MAX(id) FROM phrase)
			ORDER BY random() LIMIT 1;
		`)
			.then(resp => res.json(resp.rows))
			.catch(err => res.json({ message: err }));
	}

	async getAllPhrases(req, res) {
		try {
			const { isAccessValid } = await primaryCheckUser(req.cookies);
			if (!isAccessValid.email) throw ApiError.UnathorizedError();

			// получаем id юзера, по email из токена
			const checkGetUser = await db.query(`
				SELECT * FROM users
				WHERE email = '${isAccessValid.email}';
			`);

			if (!checkGetUser.rowCount) throw ApiError.UnathorizedError();
			const role = checkGetUser.rows[0].role;
			const roleDescription = role === 1 ? 'admin' : role === 2 ? 'user' : 'unknown';

			let phrasesData = [];
			if (roleDescription === 'admin') {
				// после всех проверок достаём фразы в зависимости от прав пользователя
				const isPhrases = await db.query(`SELECT * FROM phrase ORDER BY caption;`);
				phrasesData = isPhrases.rows.map(item => item.caption);
			}

			res.json(out);
		} catch (err) {
			res.status(400).json({ message: err });
		}

	}
}

export default new PhraseController;
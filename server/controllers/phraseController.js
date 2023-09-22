import db from '../db.js';
import ApiError from '../exeptions/apiError.js';
import TokenService from '../services/tokenService.js';
import { primaryCheckUser } from '../services/primaryCheckUser.js';



class PhraseController {
	async addPhrase(req, res) {
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
				if (Number(err.code) === 23505) {
					res.status(400).json({ message: "Такая фраза уже существует!" });
				} else {
					res.status(400).json({ message: "Ошибка при добавлении" });
				}
			});
	}

	async deletePhrase(req, res) {
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
		// после всех проверок достаём фразу для удаления её из БД
		const { phrase } = req.body;
		db.query(`DELETE FROM phrase WHERE caption='${phrase}' RETURNING caption;`)
			.then(resp => res.json([resp.rows[0].caption]))
			.catch(err => res.json({ message: err }));
	}

	async changePhrase(req, res) {
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

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

		// после всех проверок достаём фразы для изменения в БД
		const { oldPhrase, newPhrase } = req.body;

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

	getPhraseById(req, res) {
		const { id } = req.params;
		db.query(`SELECT * FROM phrase WHERE id=${id};`)
			.then(resp => res.json(resp.rows))
			.catch(err => res.json({ message: err }));
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
		const { isAccessValid } = await primaryCheckUser(req.cookies);
		if (!isAccessValid.email) throw ApiError.UnathorizedError();

		// после всех проверок достаём фразы в зависимости от прав пользователя
		try {
			const isPhrases = await db.query(`SELECT * FROM phrase ORDER BY caption;`);
			const out = isPhrases.rows.map(item => item.caption);
			res.json(out);
		} catch (err) {
			res.status(400).json({ message: err });
		}
	}
}

export default new PhraseController;
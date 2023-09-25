import db from '../db.js';
import { validationResult } from 'express-validator';
import ApiError from '../exeptions/apiError.js';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import TokenService from '../services/tokenService.js';
import { nanoid } from 'nanoid';
import MailService from '../services/mailSender.js';
import fs from 'fs';
import { primaryCheckUser } from '../services/primaryCheckUser.js';
import ResetSeq from '../services/resetSequence.js';


class UserController {
	async signup(req, res, next) {
		try {
			const { email, password } = req.body;
			const resultValidation = validationResult(req);
			// если массив с ошибками не пустой
			if (!resultValidation.isEmpty()) {
				// останавливаем функцию registration, выведя массив ошибок
				// встроенным методом array() объекта resultValidation
				// либо можно было просто прочесть массив errors в результате работы resultValidation
				return next(ApiError.ValidationError(resultValidation.array()));
			};
			// есть ли пользователь в БД
			const isUserExists = await db.query(`SELECT * FROM users WHERE email = '${email}';`);
			if (isUserExists.rowCount) throw ApiError.BadRequest("The user is already registered.");
			// шифруем пароль
			const cipher = await bcrypt.hash(password, 3);

			// создаём ссылку активации
			const activationLink = nanoid();

			// сбрасываем счётчик последовательности в таблице users
			await ResetSeq.resetSequence('users');
			// записываем в БД пользователя
			const newUser = await db.query(`
				INSERT INTO users (email, password, role, isactivated, activationlink)
				VALUES ('${email}', '${cipher}', 2, false, '${activationLink}')
				RETURNING *;
			`);

			// сбрасываем счётчик последовательности в таблице persondata
			await ResetSeq.resetSequence('persondata');
			// создаём запись в таблице persondata
			const newPersonData = await db.query(`
				INSERT INTO persondata (user_id)
				VALUES (${newUser.rows[0].id})
				RETURNING *;
			`);

			// сбрасываем счётчик последовательности в таблице token
			await ResetSeq.resetSequence('token');
			// записываем в БД поле refreshToken. Это поле пустое, т.к. юзер не логинился
			const newRefreshToken = await db.query(`
				INSERT INTO token (user_id, refreshtoken)
				VALUES (${newUser.rows[0].id}, '')
				RETURNING *;
			`);

			// создаём папки в static для юзера
			// общая папка юзера
			const mainPath = `static/users/${email}`;
			fs.mkdirSync(mainPath, err => console.log(err));

			// отправляем письмо
			const mailService = new MailService(config().parsed.EMAIL_SENDER, email, activationLink);
			mailService.sendMail();

			res.json({ message: "User registered. Check your e-mail." });
		} catch (err) {
			next(err);
		}
	}

	async signin(req, res, next) {
		try {
			let refreshToken;
			const { email, password } = req.body;
			// проверяем есть ли юзер в БД
			const isUserExists = await db.query(`SELECT * FROM users WHERE email='${email}';`);
			if (!isUserExists.rowCount) throw ApiError.BadRequest("User not registered.");
			// проверяем правильность пароля
			const match = bcrypt.compareSync(password, isUserExists.rows[0].password);
			if (!match) throw ApiError.BadRequest("Login or password are wrong.");

			// получаем строковое значение роли юзера
			const strRole = await db.query(`
				SELECT role FROM roles
				WHERE id=${isUserExists.rows[0].role}
			`);

			// создаём данные для токенов
			const payload = {
				email: isUserExists.rows[0].email,
				role: isUserExists.rows[0].role,
				isactivated: isUserExists.rows[0].isactivated
			};
			const tokensInstance = new TokenService(payload);
			// добавляем остальные данные о пользователе
			const additionalUserData = await db.query(`
				SELECT name, avatar FROM persondata
				WHERE user_id = ${isUserExists.rows[0].id};
			`);
			const userNickname = additionalUserData?.rows[0]?.name || "";
			const userAvatar = additionalUserData?.rows[0]?.avatar;
			// формируем данные для отдачи на клиент
			let userData = {
				user: {
					email: isUserExists.rows[0].email,
					role: isUserExists.rows[0].role,
					isactivated: isUserExists.rows[0].isactivated,
					nickname: userNickname,
					avatar: userAvatar
				}
			}
			// refreshToken генерируется раз в 30 дн. исключением является
			// неактивированный аккаунт либо отсутствие refreshToken(в случае logout).
			// В этом случае генерируются два токена.

			// берём данные из таблицы token
			// достаём refreshToken из БД...
			const getRefreshToken = await db.query(`
				SELECT refreshtoken from token
				WHERE user_id = ${isUserExists.rows[0].id};
			`);
			refreshToken = getRefreshToken.rows[0].refreshtoken;
			// генерируем accessToken и refreshToken
			tokensInstance.createToken();
			const tokens = tokensInstance.getTokens();
			// помещаем в БД refreshToken
			const newRefreshToken = db.query(`
					UPDATE token SET refreshtoken = '${tokens.refreshToken}'
					WHERE user_id = ${isUserExists.rows[0].id}
					RETURNING *;
				`);
			// В Cookies сохраняем accessToken и refreshToken
			res.cookie('accesstoken', tokens.accessToken, { maxAge: 86400 * 1000, sameSite: "Strict", secure: true });
			res.cookie('refreshtoken', tokens.refreshToken, { maxAge: 30 * 86400 * 1000, httpOnly: true, sameSite: "Strict", secure: true });
			// userData = { ...userData };
			res.json(userData);
		} catch (err) {
			next(err)
		}
	}

	async logout(req, res, next) {
		try {
			// вызов ошибки, если юзер пытался выйти незалогинившись
			if (!req.cookies.accesstoken) throw ApiError.BadRequest("User tries to logout but it hasn't been logged in.");
			// получаем юзера по e-mail используя расшифрованный accessToken
			const decoded = jwt.verify(req.cookies.accesstoken, config().parsed.JWT_ACCESS_TOKEN_SECRET);
			if (!decoded) throw ApiError.BadRequest("Internal Error. User tries to logout but it's not exists.");

			const userData = await db.query(`
				SELECT * FROM users
				WHERE email='${decoded.email}';
			`);
			if (!userData.rowCount) throw ApiError.BadRequest("Internal Error. User tries to logout but it's not exists.");
			// удаляем refreshToken из БД
			const clearRefreshToken = await db.query(`
				UPDATE token SET refreshtoken = ''
				WHERE user_id = ${userData.rows[0].id}
				RETURNING *;
			`);
			// удаляем токены из Cookies
			res.cookie('accesstoken', "", { maxAge: 86400 * 1000, sameSite: "Strict", secure: true });
			res.cookie('refreshtoken', "", { maxAge: 86400 * 1000, httpOnly: true, sameSite: "Strict", secure: true });
			res.status(200).json({ message: "ok" });
		} catch (err) {
			next(err)
		}
	}

	async activate(req, res, next) {
		try {
			const { link } = req.params;
			// ищем в БД данную ссылку
			const userData = await db.query(`
				SELECT * FROM users
				WHERE activationlink = '${link}';
			`);
			if (!userData.rowCount) throw ApiError.BadRequest("Activation link no valid.");
			// меняем isactivated в БД на true
			const userActivating = await db.query(`
				UPDATE users SET isactivated = true
				WHERE activationlink = '${link}'
				RETURNING *;
			`);
			// удаляем ссылку активации из БД
			const activationLinkClear = await db.query(`
				UPDATE users SET activationlink = ''
				WHERE id = ${userData.rows[0].id}
				RETURNING *;
			`);
			// обновляем refreshToken, т.к. после активации он не будет генерироваться
			// создаём данные для токенов
			const payload = {
				email: userData.rows[0].email,
				role: userData.rows[0].role,
				isactivated: userActivating.rows[0].isactivated
			};
			const tokensInstance = new TokenService(payload);
			tokensInstance.createToken(['refresh']);
			const tokens = tokensInstance.getTokens();
			const newRefreshToken = await db.query(`
				UPDATE token SET refreshtoken = '${tokens.refreshToken}'
				WHERE user_id = ${userData.rows[0].id}
				RETURNING *;
			`);
			if (!newRefreshToken) throw ApiError.BadRequest("Can't to update refreshToken.");
			// обновляем cookie для refreshToken
			res.cookie('refreshtoken', tokens.refreshToken, { maxAge: 30 * 86400 * 1000, httpOnly: true, sameSite: "Strict", secure: true });
			res.json({ message: "Congratulations! You're activated!" });
		} catch (err) {
			next(err);
		}

	}

	async refresh(req, res, next) {
		try {
			// достаём из cookies refreshToken
			const refreshToken = req.cookies.refreshtoken;
			if (!refreshToken) throw ApiError.UnathorizedError("Absent refreshToken in cookies");
			// проверяем есть ли refreshToken в БД
			const isTokenExists = await db.query(`
				SELECT * FROM token
				WHERE refreshtoken = '${refreshToken}';
			`);
			if (!isTokenExists.rowCount) throw ApiError.UnathorizedError("Absent refreshToken in DB");
			// проверяем не просрочен ли refreshToken
			jwt.verify(refreshToken, config().parsed.JWT_REFRESH_TOKEN_SECRET, (err, decoded) => {
				if (err) throw ApiError.UnathorizedError();
			})
			// достаём данные о юзере, которому принадлежит refreshToken
			const user = await db.query(`
				SELECT * FROM users
				WHERE id = ${isTokenExists.rows[0].user_id};
			`);
			if (!user.rowCount) throw ApiError.UnathorizedError("Can't to find user in 'users' table by user_id in 'token' table.");
			// генерируем новые accessToken и refreshToken
			const payload = {
				email: user.rows[0].email,
				role: user.rows[0].role,
				isactivated: user.rows[0].isactivated
			};
			const tokensInstance = new TokenService(payload);
			tokensInstance.createToken();
			const tokens = tokensInstance.getTokens();
			// обновляем в БД refreshToken
			const newRefreshToken = await db.query(`
				UPDATE token SET refreshtoken = '${tokens.refreshToken}'
				WHERE user_id = ${user.rows[0].id}
				RETURNING *;
			`);
			if (!newRefreshToken.rowCount) throw ApiError.UnathorizedError("Can't to update refreshToken in DB");
			// В Cookies сохраняем accessToken и refreshToken
			res.cookie('accesstoken', tokens.accessToken, { maxAge: 86400 * 1000, sameSite: "Strict", secure: true });
			res.cookie('refreshtoken', tokens.refreshToken, { maxAge: 30 * 86400 * 1000, httpOnly: true, sameSite: "Strict", secure: true });
			// добавляем остальные данные о пользователе
			const additionalUserData = await db.query(`
				SELECT name FROM persondata
				WHERE user_id = ${user.rows[0].id};
			`);
			const userNickname = additionalUserData?.rows[0]?.name || "";
			const userData = {
				user: {
					email: user.rows[0].email,
					role: user.rows[0].role,
					isactivated: user.rows[0].isactivated,
					nickname: userNickname
				}
			};
			res.json(userData);
		} catch (err) {
			next(err)
		}

	}

	async getUsers(req, res, next) {
		try {
			const { isAccessValid } = await primaryCheckUser(req.cookies);
			if (!isAccessValid.email) throw ApiError.UnathorizedError();

			// получаем id юзера, по email из токена
			const getUser = await db.query(`
				SELECT * FROM users
				WHERE email = '${isAccessValid.email}';
			`);

			if (!getUser.rowCount) throw ApiError.UnathorizedError();
			const role = getUser.rows[0].role;
			const roleDescription = role === 1 ? 'admin' : role === 2 ? 'user' : 'unknown';

			let userData = [];
			if (roleDescription === 'admin') {
				const users = await db.query(`SELECT email FROM users;`);

				if (users.rowCount) {
					userData = users.rows.map(el => el.email);
				} else {
					userData = [];
				}
			}
			res.json(userData);
		} catch (err) {
			res.status(400).json({ message: err });
		}
	}

	async getUsersNickname(req, res, next) {
		const usersName = await db.query(`
			SELECT B.name FROM users A, persondata B
			WHERE A.id = B.user_id;
		`);

		const sendData = usersName.rows.map(item => item.name);
		res.json(sendData);
	}

	async getUser(req, res, next) {
		try {
			const { isAccessValid } = await primaryCheckUser(req.cookies);
			if (!isAccessValid) return res.status(401).json({ message: "User not authorized" });

			// если токены валидны, получаем id юзера, имеющего email
			const getUser = await db.query(`
					SELECT * FROM users
					WHERE email = '${isAccessValid.email}';
				`);
			let userId = 0;
			if (!getUser.rowCount) throw ApiError.UnathorizedError();
			userId = getUser.rows[0].id;
			// получаем nickname юзера из дополнительной таблицы юзеров
			const getUserData = await db.query(`
				SELECT name, avatar FROM persondata
				WHERE user_id = ${userId};
			`);
			// получаем роль юзера в виде строки
			const strRole = await db.query(`
				SELECT role, roledescription FROM roles
				WHERE id=${getUser.rows[0].role};
			`);

			const userData = {
				user: {
					email: getUser.rows[0].email,
					role: getUser.rows[0].role,
					rolelat: strRole.rows[0].role,
					rolecyr: strRole.rows[0].roledescription,
					isactivated: getUser.rows[0].isactivated,
					nickname: getUserData.rows[0]?.name || null,
					avatar: getUserData.rows[0]?.avatar
						? config().parsed.LOCAL_ADDRESS + '/' + getUserData.rows[0].avatar
						: null
				}
			};
			res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async getRoles(req, res, next) {
		try {
			const { isAccessValid } = await primaryCheckUser(req.cookies);
			if (!isAccessValid.email) throw ApiError.UnathorizedError();

			// получаем id юзера, по email из токена
			const getUser = await db.query(`
				SELECT * FROM users
				WHERE email = '${isAccessValid.email}';
			`);

			if (!getUser.rowCount) throw ApiError.UnathorizedError();
			const role = getUser.rows[0].role;
			const roleDescription = role === 1 ? 'admin' : role === 2 ? 'user' : 'unknown';

			let rolesData = [];
			if (roleDescription === 'admin') {
				// получаем строковые значения ролей юзеров
				const roles = await db.query(`SELECT * FROM roles`);

				rolesData = roles.rows.map(role => {
					return (
						{
							rolelat: role.role,
							rolecyr: role.roledescription
						}
					)
				});
			}

			res.json(rolesData);
		} catch (err) {
			next(err);
		}
	}

	async updateUser(req, res, next) {
		try {
			const { isAccessValid } = await primaryCheckUser(req.cookies);
			let userData;
			// получаем id юзера, имеющего email
			const getUser = await db.query(`
					SELECT * FROM users
					WHERE email = '${isAccessValid.email}';
				`);
			let userId = 0;
			if (!getUser.rowCount) throw ApiError.UnathorizedError();
			userId = getUser.rows[0].id;

			// после проверки токена выполняем основные действия
			const { nickname, oldPassword, newPassword } = req.body;

			if (oldPassword && newPassword) {
				// проверяем правильность пароля
				const match = bcrypt.compareSync(oldPassword, getUser.rows[0].password);
				if (match) {
					// шифруем новый пароль
					const cipher = await bcrypt.hash(newPassword, 3);
					// обновляем в БД пользователя
					const newUser = await db.query(`
					UPDATE users SET password = '${cipher}'
					WHERE id = ${userId}
					RETURNING *;
				`);
				} else {
					return res.status(400).json({ message: "Прежний пароль не верен" });
				}
			}

			// если меняется пароль, и это неуспешно, то замена никнейма отменяется.
			// если же меняется только никнейм(поля пароля незаполнены), то меняем никнейм
			// меняем nickname
			if (nickname) {
				// помещаем nickname в БД, предварительно проверив есть ли он там
				// проверяем есть ли такой user_id
				const isUserIdExists = await db.query(`
					SELECT *
					FROM persondata
					WHERE user_id = ${userId};
				`);
				if (!isUserIdExists.rowCount) throw ApiError.BadRequest("Can't to update the nickname");

				// обновляем запись никнейма
				const newNickName = await db.query(`
					UPDATE persondata SET name='${nickname}'
					WHERE user_id = ${userId}
					RETURNING *;
				`);
				if (!newNickName.rowCount) throw ApiError.BadRequest("Can't to update the nickname");

				// получаем роль юзера в виде строки
				const strRole = await db.query(`
					SELECT role, roledescription FROM roles
					WHERE id=${getUser.rows[0].role};
				`);

				// формируем данные для отправки
				userData = {
					user: {
						email: getUser.rows[0].email,
						role: getUser.rows[0].role,
						rolelat: strRole.rows[0].role,
						rolecyr: strRole.rows[0].roledescription,
						isactivated: getUser.rows[0].isactivated,
						nickname: newNickName.rows[0].name,
						avatar: config().parsed.LOCAL_ADDRESS + '/' + newNickName.rows[0].avatar
					}
				}
			}
			res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async getUserByEmail(req, res, next) {
		try {
			const { isAccessValid } = await primaryCheckUser(req.cookies);
			// получаем id юзера, имеющего email
			const getUserId = await db.query(`
					SELECT * FROM users
					WHERE email = '${isAccessValid.email}';
				`);
			let userId = 0;
			if (!getUserId.rowCount) throw ApiError.UnathorizedError();
			userId = getUserId.rows[0].id;

			// после проверки токена выполняем основные действия
			const { email } = req.body;
			// получаем основные данные юзера
			const getUser = await db.query(`SELECT * FROM users WHERE email = '${email}';`);
			if (!getUser.rowCount) throw ApiError.BadRequest("Error while fetching user data.");
			// получаем дополнительные данные юзера
			const getAdditionalUser = await db.query(`SELECT * FROM persondata WHERE user_id = ${getUser.rows[0].id}`);
			if (!getAdditionalUser.rowCount) throw ApiError.BadRequest("Error while fetching user data.");

			// получаем строковое значение роли юзера
			const strRole = await db.query(`
				SELECT role FROM roles
				WHERE id=${getUser.rows[0].role}
			`);

			const userData = {
				email: getUser.rows[0].email,
				role: strRole.rows[0].role,
				isactivated: getUser.rows[0].isactivated,
				nickname: getAdditionalUser.rows[0].name,
				avatar: config().parsed.LOCAL_ADDRESS + '/' + getAdditionalUser.rows[0].avatar
			};
			res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async changeUserByEmail(req, res, next) {
		try {
			const { isAccessValid } = await primaryCheckUser(req.cookies);
			if (!isAccessValid.email) throw ApiError.UnathorizedError();

			let userData = {};

			const { email, nickname, role } = req.body;
			// получаем основные данные юзера для замены
			const getUser = await db.query(`SELECT * FROM users WHERE email = '${email}';`);
			if (!getUser.rowCount) throw ApiError.BadRequest("Error while fetching user data.");

			// изменяем дополнительные данные юзера
			let getAdditionalUser = '';
			if (nickname.length) {
				getAdditionalUser = await db.query(`
					UPDATE persondata SET name='${nickname}'
					WHERE user_id = ${getUser.rows[0].id}
					RETURNING *;
				`);
				userData = { ...userData, nickname: getAdditionalUser.rows[0].name };
				if (!getAdditionalUser.rowCount) throw ApiError.BadRequest("Error while changing user nickname.");
			}

			// изменяем основные данные юзера
			let isRoles = '';
			let getChangedUser = '';
			if (role) {
				// получаем все роли
				isRoles = await db.query(`SELECT id from roles WHERE role='${role}'`);
				getChangedUser = await db.query(`
					UPDATE users SET role = '${isRoles.rows[0].id}'
					WHERE id = ${getUser.rows[0].id}
					RETURNING *;
				`);
				userData = { ...userData, role: getChangedUser.rows[0].id }
				if (!getChangedUser.rowCount) throw ApiError.BadRequest("Error while changing user role.");
			}

			// формируем данные для отправки
			userData = {
				...userData,
				email: getUser.rows[0].email,
				isactivated: getUser.rows[0].isactivated,
				avatar: getUser.rows[0].avatar
			};
			res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async deleteUser(req, res, next) {
		try {
			const { isAccessValid } = await primaryCheckUser(req.cookies);
			if (!isAccessValid.email) throw ApiError.UnathorizedError();

			let userData = {};

			// после всех проверок достаём пользователя для удаления его из БД
			const { email } = req.body;
			// получаем данные о пользователе во всех таблицах
			// получаем данные из основной таблицы
			const getUserFromMainTable = await db.query(`SELECT id FROM users WHERE email='${email}';`);
			// получаем данные из таблицы токенов
			const getUserFromTokensTable = await db.query(`SELECT id FROM token WHERE user_id='${getUserFromMainTable.rows[0].id}';`);
			// получаем данные из таблицы персональных данных
			const getUserFromPersondataTable = await db.query(`SELECT id FROM persondata WHERE user_id=${getUserFromMainTable.rows[0].id};`);


			// если это текущий юзер, который удалил сам себя, то чистим токены
			const getCurrentUser = await db.query(`
				SELECT email FROM users
				WHERE id=${getUserFromMainTable.rows[0].id}
			`);
			if (getCurrentUser.rows[0].email === isAccessValid.email) {
				// удаляем токены из Cookies
				res.cookie('accesstoken', "", { maxAge: 86400 * 1000, sameSite: "Strict", secure: true });
				res.cookie('refreshtoken', "", { maxAge: 86400 * 1000, httpOnly: true, sameSite: "Strict", secure: true });
				// делаем отметку в возвращаемом объекте
				userData = { ...userData, itself: true };
			} else {
				userData = { ...userData, itself: false };
			}

			// удаляем записи из таблиц
			// persondata
			const deleteFromPersondata = await db.query(`DELETE FROM persondata WHERE id=${getUserFromPersondataTable.rows[0].id} RETURNING *;`);
			if (!deleteFromPersondata) throw ApiError.BadRequest("Error while deleting from 'persondata' table.");
			// token
			const deleteFromToken = await db.query(`DELETE FROM token WHERE id=${getUserFromTokensTable.rows[0].id} RETURNING *;`);
			if (!deleteFromToken) throw ApiError.BadRequest("Error while deleting from 'token' table.");
			// users
			const deleteFromUsers = await db.query(`DELETE FROM users WHERE id=${getUserFromMainTable.rows[0].id} RETURNING *;`);
			if (!deleteFromUsers) throw ApiError.BadRequest("Error while deleting from 'users' table.");


			// удаляем папки юзера в static
			fs.rmSync(`static/users/${email}`, { force: true, recursive: true, maxRetries: 3 }, err => console.log(err));

			// формируем воздвращающийся объект
			userData = { ...userData, deletedUser: deleteFromUsers.rows[0].email }

			res.json(userData);
		} catch (err) {
			next(err);
		}
	}

}

export default new UserController;
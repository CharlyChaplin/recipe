import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

function roleCheck(role) {
	return function (req, res, next) {
		console.log("req=", req);
		// достаём accessToken из заголовка Authorization
		const accessToken = req.headers?.Authorization?.split(' ')[1];
		if (!accessToken) return res.status(401).json("User not authorized");
		// расшифровываем токен и убеждаемся что он не истёк
		jwt.verify(accessToken, config().parsed.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err) return res.status(401).json("User not authorized");
			if (decoded.role !== role) return res.status(401).json({ message: "User not authorized" });
			req.user = decoded;
			next();
		});
	}

};


export default roleCheck;
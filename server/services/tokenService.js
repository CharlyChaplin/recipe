import { config } from "dotenv";
import jwt from 'jsonwebtoken';

const { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } = config().parsed;

class TokenService {
	constructor(payload) {
		this.accessTokenFactor = false;
		this.refreshTokenFactor = false;
		this.accessToken = '';
		this.refreshToken = '';
		this.payload = payload;
	}
	
	// по умолчанию создаётся пара токенов, либо в массиве указывается отдельно нужный токен
	// например: new TokenService(payload, ['access', 'refresh'])
	createToken(tokens) {
		if (tokens) {
			tokens.forEach(tokenType => {
				switch (tokenType.toLowerCase()) {
					case 'access': {
						this.accessTokenFactor = true;
						break;
					}
					case 'refresh': {
						this.refreshTokenFactor = true;
						break;
					}
				}
			});
		} else {
			this.accessTokenFactor = true; this.refreshTokenFactor = true
		}
		this.accessToken = this.accessTokenFactor ? jwt.sign(this.payload, JWT_ACCESS_TOKEN_SECRET, { expiresIn: '24h' }) : null;
		this.refreshToken = this.refreshTokenFactor ? jwt.sign(this.payload, JWT_REFRESH_TOKEN_SECRET, { expiresIn: '30d' }) : null;
	}

	getTokens() {
		if (this.accessToken && this.refreshToken) {
			return { accessToken: this.accessToken, refreshToken: this.refreshToken }
		} else if (this.accessToken) {
			return { accessToken: this.accessToken }
		} else {
			return { refreshToken: this.refreshToken }
		}
	}
	
	static validAccessToken(accesstoken) {
		try {
			return jwt.verify(accesstoken, JWT_ACCESS_TOKEN_SECRET);
		} catch (err) {
			return null;
		}
	}
	
	static validRefreshToken(refreshtoken) {
		try {
			return jwt.verify(refreshtoken, JWT_REFRESH_TOKEN_SECRET);
		} catch (err) {
			return null;
		}
	}
}


export default TokenService;
import ApiError from '../exeptions/apiError.js';
import TokenService from './tokenService.js';

export async function primaryCheckUser({ accesstoken, refreshtoken }) {
	if (!accesstoken && !refreshtoken) throw ApiError.UnathorizedError();
	// проверяем accessToken на валидность
	const isAccessValid = TokenService.validAccessToken(accesstoken);
	console.log(isAccessValid);
	// проверяем refreshToken на валидность
	const isRefreshValid = TokenService.validRefreshToken(refreshtoken);
	// если токены валидны
	if (!isAccessValid || !isRefreshValid) throw ApiError.UnathorizedError();
	return { isAccessValid, isRefreshValid };
}
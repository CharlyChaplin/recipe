import axios from "axios";
import vars from "init/vars";
import Cookies from "js-cookie";


const ax = axios.create({
	baseURL: vars.remoteHost,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true
});

ax.interceptors.request.use(config => {
	if (Cookies.get('accesstoken')) {
		config.headers.authorization = `Bearer ${Cookies.get('accesstoken')}`;
	}
	return config;
});

ax.interceptors.response.use(response => {
	return response;
},
	async error => {
		const originalRequest = error.config;
		console.log(error);
		if (error.response.status === 401 && error.config && !error.config._isRetry) {
			error.config._isRetry = true;
			try {
				await axios.get(`${vars.remoteHost}/user/refresh`, { withCredentials: true });
				return ax.request(originalRequest);
			} catch (err) {
				console.log(err.message);
			}
		} else {
			throw error;
		}
	}
);


export default ax;
import axios from "axios";
import vars from "init/vars";
import Cookies from "js-cookie";


const ax = axios.create({
	baseURL: vars.remoteHost,
	headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache, no-store, must-revalidate' },
	withCredentials: true
});

ax.interceptors.request.use(config => {
	console.log("interceptor-request: Cookies.get('accesstoken')", Cookies.get('accesstoken'));
	if (Cookies.get('accesstoken')) {
		config.headers.Authorization = `Bearer ${Cookies.get('accesstoken')}`;
	}
	return config;
});

ax.interceptors.response.use(response => {
	return response;
},
	async error => {
		const originalRequest = error.config;
		if (error.response.status === 401 && error.config && !error.config._isRetry) {
			error.config._isRetry = true;
			try {
				await axios.get(`${vars.remoteHost}/user/refresh`, { withCredentials: true, headers: { 'Content-Type': 'application/json' } });
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
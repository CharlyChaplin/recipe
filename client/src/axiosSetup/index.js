import axios from "axios";
import Cookies from "js-cookie";

const remoteServer = 'http://localhost:7000';

const ax = axios.create({
	baseURL: remoteServer,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true
});

ax.interceptors.request.use(config => {
	config.headers.authorization = `Bearer ${Cookies.get('accesstoken')}`;
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
				await axios.get(`${remoteServer}/user/refresh`, { withCredentials: true });
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
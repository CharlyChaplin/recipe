import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { showInfo } from 'redux/slices/infoSlice';
import { paths } from 'routes/helper';


let currentPath = null;

const Activation = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		currentPath = location.pathname.slice(location.pathname.lastIndexOf('/') + 1).toLowerCase();
		switch (currentPath) {
			case 'err':
				dispatch(showInfo({ text: 'Неверная ссылка активации', warning: true }));
				navigate(paths.home);
				break;
			case 'ok':
				dispatch(showInfo({ text: 'Ваш аккаунт активирован! Укажите ваш ник', ok: true }));
				navigate(paths.profile);
				break;
			default:
				break;
		}
	}, [location]);

	return;

}

export default Activation;
import React, { useEffect } from 'react';
import { memo } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showInfo } from 'redux/slices/infoSlice';
import { userLogout } from 'redux/slices/userSlice';
import { paths } from 'routes/helper';


const Logout = () => {
	const { isAuth, userData } = useSelector(state => state.userReducer);
	const { showInformation } = useSelector(state => state.infoReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		console.log(showInformation.isConfirmResult);
		if (showInformation.isConfirmResult) {
			setTimeout(() => {
				handleLogout();
			}, 200);
		}
	}, []);

	const handleLogout = () => {
		if (Boolean(userData?.user?.nickname)) {
			dispatch(showInfo({ text: `Увидимся,  ${userData?.user?.nickname}!` }));
		} else {
			dispatch(showInfo({ text: `Увидимся!` }));
		}

		dispatch(userLogout());

		navigate(paths.home);

	};



	return (
		<>

		</>
	);
}

export default Logout;
import React, { useEffect } from 'react';
import { memo } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showInfo } from 'redux/slices/infoSlice';
import { userLogout } from 'redux/slices/userSlice';
import { paths } from 'routes/helper';


const Logout = memo(() => {
	const { isAuth, userData } = useSelector(state => state.userReducer);
	const { isConfirmResult } = useSelector(state => state.infoReducer.showInformation);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		// if (isConfirmResult) {
			setTimeout(() => {
				handleLogout();
			}, 200);
		// }
	}, []);

	const handleLogout = useCallback(async () => {
		if (Boolean(userData?.user?.nickname)) {
			dispatch(showInfo({ text: `Увидимся,  ${userData?.user?.nickname}!` }));
		} else {
			dispatch(showInfo({ text: `Увидимся!` }));
		}

		await dispatch(userLogout());

		navigate(paths.home);

	}, [dispatch, navigate, isAuth]);



	return (
		<>

		</>
	);
})

export default Logout;
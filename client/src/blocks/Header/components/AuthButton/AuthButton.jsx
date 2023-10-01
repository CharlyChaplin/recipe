import React, { useState } from 'react';
import { AuthElementWrapper, AuthImage, AuthText, DropDownMenuListItem, DropDownMenuWrapper } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'components/Spinner';
import { paths } from 'routes/helper';
import { showInfo } from 'redux/slices/infoSlice';
import { useEffect } from 'react';

let image = '';

const AuthButton = () => {
	const { isAuth, userData, loading } = useSelector(state => state.userReducer);
	const dispatch = useDispatch();
	const [isShowMenu, setIsShowMenu] = useState(false);
	const [image, setImage] = useState(null);
	
	useEffect(() => {
		if (userData.user?.avatar) {
			setImage(`${userData.user?.avatar}`);
		}
	}, [userData, image]);


	function showMenu() { setIsShowMenu(!isShowMenu); }

	function handleExit() {
		const logoutAction = true;
		dispatch(showInfo({ text: "Выходим?", isConfirm: { ok: "Да", cancel: "Нет" }, logoutAction }));
	}

	

	return (
		<>
			<AuthElementWrapper isAuth={isAuth} showMenu={showMenu}>

				{
					loading
						? <Spinner />
						: <>
							<AuthImage isAuth={isAuth} image={image} />

							<AuthText>
								{
									isAuth
										? userData?.user?.nickname?.length
											? userData?.user?.nickname
											: "Anonim?"
										: "Войти"
								}
							</AuthText>
						</>
				}

				{
					isAuth &&
					<DropDownMenuWrapper isShow={isShowMenu}>
						<DropDownMenuListItem path={paths.profile} text="Профиль" />
						<DropDownMenuListItem text="Выход" onClick={handleExit} />
					</DropDownMenuWrapper>
				}


			</AuthElementWrapper>
		</>
	);
}

export default AuthButton;
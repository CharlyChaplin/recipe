import React, { useState, useCallback } from 'react';
import { AuthPageCaption, AuthPageContent, AuthPageForm, AuthPageFormButtons, AuthPageFormHaveAccount, AuthPageFormWrapper, AuthPageInputWrapper, AuthPageLayer, AuthPageMain, AuthPageWrapper } from './styled';
import Input from 'components/Input';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { paths } from 'routes/helper';
import { useDispatch, useSelector } from 'react-redux';
import { userGetUser, userLogin } from 'redux/slices/userSlice';
import Spinner from 'components/Spinner';
import { showInfo } from 'redux/slices/infoSlice';
import axios from 'axiosSetup';
import Cookies from 'js-cookie';
import { useEffect } from 'react';


const SignIn = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { userData, completed, loading, errors } = useSelector(state => state.userReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!loading) {
			if (!errors && completed) {
				dispatch(showInfo({ text: getGreeting(userData?.user?.nickname) }));
				getAuth();
				navigate(paths.home);
			} else if (errors) {
				if (errors === 'User not registered.') {
					dispatch(showInfo({ text: `Пользователь не зарегистрирован`, cancel: true }));
				} else if (errors === 'Login or password are wrong.') {
					dispatch(showInfo({ text: `Связка логин/пароль неверна`, cancel: true }));
				} else {
					dispatch(showInfo({ text: `${errors}`, cancel: true }));
				}
			}
		}
	}, [completed]);


	function handleLoginInput(e) { setLogin(e.target.value); }

	function handlePasswordInput(e) { setPassword(e.target.value); }

	function handleKeyPress(val) { if (val === "Enter") handleSignIn(); }

	function handleButtonCancel() { navigate(paths.home); }

	function getGreeting(nickname) {
		const time = Number(new Date().getHours());
		let outString = '';

		if (time >= 11 && time <= 17) outString = "Добрый день";
		if (time >= 18 && time <= 22) outString = "Добрый вечер";
		if (time === 23 || time === 24 || time <= 3) outString = "Доброй ночи";
		if (time >= 4 && time <= 10) outString = "Доброе утро";

		return Boolean(nickname) ? `${outString}, ${nickname}!` : `${outString}!`;
	}

	function getAuth() {
		const accessCookie = Cookies.get('accesstoken');
		if (accessCookie) {
			dispatch(userGetUser({ accesstoken: accessCookie }));
		}
	}

	const handleSignIn = useCallback(async () => {
		if (!login.length || !password.length) return;
		const fd = new FormData();
		fd.append('email', login);
		fd.append('password', password);
		dispatch(userLogin(fd));
	}, [dispatch, userData, login, password, loading]);





	return (
		<>
			<AuthPageMain>
				<AuthPageContent>
					<AuthPageCaption>Авторизация</AuthPageCaption>
					<AuthPageWrapper>
						<AuthPageLayer>
							<AuthPageFormWrapper>
								<AuthPageForm>

									<AuthPageInputWrapper>
										<Input
											labelPos='column'
											labelText='Логин:'
											type='text'
											value={login}
											placeholder='Ваш e-mail'
											autoFocus
											handleChange={handleLoginInput}
											handleKeyPress={e => handleKeyPress(e.key)}
										/>
										<Input
											labelPos='column'
											labelText='Пароль:'
											type='password'
											value={password}
											placeholder='Ваш пароль'
											handleChange={handlePasswordInput}
											handleKeyPress={e => handleKeyPress(e.key)}
										/>
									</AuthPageInputWrapper>

									<AuthPageFormHaveAccount action="signin" />

									<AuthPageFormButtons>
										<Button action={handleSignIn}>{loading ? <Spinner /> : "Войти"}</Button>
										<Button action={handleButtonCancel} disabled={loading ? true : false}>Отмена</Button>
									</AuthPageFormButtons>
								</AuthPageForm>
							</AuthPageFormWrapper>
						</AuthPageLayer>
					</AuthPageWrapper>
				</AuthPageContent>
			</AuthPageMain >

		</>
	);
}

export default SignIn;
import React, { useState, useCallback } from 'react';
import { AuthPageCaption, AuthPageContent, AuthPageForm, AuthPageFormButtons, AuthPageFormHaveAccount, AuthPageFormWrapper, AuthPageInputWrapper, AuthPageLayer, AuthPageMain, AuthPageWrapper } from './styled';
import Input from 'components/Input';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { paths } from 'routes/helper';
import { useDispatch, useSelector } from 'react-redux';
import { userGetUser } from 'redux/slices/userSlice';
import Spinner from 'components/Spinner';
import { showInfo } from 'redux/slices/infoSlice';
import axios from 'axiosSetup';
import Cookies from 'js-cookie';


const SignIn = () => {
	const [login, setLogin] = useState('admin@lexun.ru');
	const [password, setPassword] = useState('0611920');
	const navigate = useNavigate();
	const { userData, loading } = useSelector(state => state.userReducer);
	const dispatch = useDispatch();


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
		const fd = new FormData();
		fd.append('email', login);
		fd.append('password', password);
		try {
			const resp = await axios.post('/user/signin', fd);
			if (resp.status && resp.status === 200) {
				dispatch(showInfo({ text: getGreeting(resp.data.user?.nickname) }));
			}
			getAuth();
			navigate(paths.home);
		} catch (error) {
			if (error.response.data.message === 'User not registered.') {
				dispatch(showInfo({ text: `Пользователь не зарегистрирован`, cancel: true }));
			} else {
				dispatch(showInfo({ text: `${error.response.data.message}`, cancel: true }));
			}
		}

	}, [dispatch, userData, login, password]);





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
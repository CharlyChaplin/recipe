import React, { useEffect, useState } from 'react';
import { AuthPageCaption, AuthPageContent, AuthPageForm, AuthPageFormButtons, AuthPageFormHaveAccount, AuthPageFormWrapper, AuthPageInputWrapper, AuthPageLayer, AuthPageMain, AuthPageWrapper } from './styled';
import Input from 'components/Input';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { paths } from 'routes/helper';
import { clearUserDataInStore, userRegister } from 'redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'components/Spinner/Spinner';
import { useCallback } from 'react';
import axios from 'axiosSetup';
import { showInfo } from 'redux/slices/infoSlice';



const SignUp = () => {
	const { userData } = useSelector(state => state.userReducer);
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { loading } = useSelector(state => state.userReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		
		return () => dispatch(clearUserDataInStore());
	}, []);
	
	function handleLoginInput(e) {
		setLogin(e.target.value);
	}

	function handlePasswordInput(e) {
		setPassword(e.target.value);
	}

	function handleKeyPress(val) {
		if (val === "Enter") handleSignUp();
	}

	function handleButtonCancel() {
		navigate(paths.home);
	}

	const handleSignUp = useCallback(async () => {
		if (!login.length || !password.length) return;
		const fd = new FormData();
		fd.append('email', login);
		fd.append('password', password);

		try {
			const resp = await axios.post('/user/signup', fd);
			if (resp.status && resp.status === 200) {
				dispatch(showInfo({ text: "Пользователь успешно зарегистрирован! Проверьте почту.", ok: true }))
			}
			navigate(paths.signin);
		} catch (error) {
			if (error.response.data.message === 'The user is already registered.') {
				dispatch(showInfo({ text: `Пользователь уже зарегистрирован`, cancel: true }));
			} else {
				dispatch(showInfo({ text: `${error.response.data.message}`, cancel: true }));
			}
		}
	}, [dispatch, userData, login, password]);


	return (
		<>
			<AuthPageMain>
				<AuthPageContent>
					<AuthPageCaption>Регистрация</AuthPageCaption>
					<AuthPageWrapper>
						<AuthPageLayer>
							<AuthPageFormWrapper>
								<AuthPageForm>

									<AuthPageInputWrapper>
										<Input
											labelPos='column'
											labelText='Логин:'
											type='email'
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

									<AuthPageFormHaveAccount action="signup" />

									<AuthPageFormButtons>
										<Button action={handleSignUp}>{loading ? <Spinner /> : "Создать"}</Button>
										<Button action={handleButtonCancel}>Отмена</Button>
									</AuthPageFormButtons>
								</AuthPageForm>
							</AuthPageFormWrapper>
						</AuthPageLayer>
					</AuthPageWrapper>
				</AuthPageContent>
			</AuthPageMain>
		</>
	);
}

export default SignUp;
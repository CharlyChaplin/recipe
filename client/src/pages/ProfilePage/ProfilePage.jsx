import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MainWrapper } from 'pages/pages.styled';
import { ProfileActionItem, ProfileActionItemOperation, ProfileActionTasks, ProfileActions, ProfileActivateStatus, ProfileAvatar, ProfileButtons, ProfileCaption, ProfileCurrentUser, ProfileForm, ProfileFormWrapper, ProfileMainWrapper, ProfileNickname, ProfilePassword, ProfilePasswordLabel, ProfilePasswordWrapper, ProfileWrapper } from './styled';
import AvatarSelect from 'components/AvatarSelect';
import Input from 'components/Input';
import Button from 'components/Button';

import { ReactComponent as AddICO } from 'assets/img/icons/plus.svg';
import { ReactComponent as EditICO } from 'assets/img/icons/edit.svg';
import { ReactComponent as DeleteICO } from 'assets/img/icons/trash.svg';
import { ReactComponent as GearICO } from 'assets/img/icons/gear.svg';
import SectionHeader from 'components/SectionHeader';
import RecipeDelete from './components/RecipeDeleteChange';
import PhraseAddChangeDelete from './components/PhraseAddDeleteChange';
import Modal from 'components/Modal';
import { useNavigate } from 'react-router-dom';
import { paths } from 'routes/helper';
import { DataContext, modalContextStore } from './context';
import { useDispatch, useSelector } from 'react-redux';
import { userGetRoles, userGetUser, userGetUsers, userGetUsersNickname, userUpdate, userUpdateSuccessReset } from 'redux/slices/userSlice';
import axios from 'axiosSetup';
import { showInfo } from 'redux/slices/infoSlice';
import Spinner from 'components/Spinner/Spinner';
import Cookies from 'js-cookie';
import UserAddChangeDelete from './components/UserAddChangeDelete/UserAddChangeDelete';
import { phraseGetPhrases } from 'redux/slices/phraseSlice';
import { categoryGetCategories } from 'redux/slices/categorySlice';
import CategoryAddDeleteChange from './components/CategoryAddDeleteChange/CategoryAddDeleteChange';
import { blogGetBlogs } from 'redux/slices/blogSlice';
import BlogDeleteChange from './components/blogDeleteChange/BlogDeleteChange';
import { recipeGetRecipies } from 'redux/slices/recipeSlice';
import RecipeDeleteChange from './components/RecipeDeleteChange/RecipeDeleteChange';
import { Helmet } from 'react-helmet';



const ProfilePage = () => {
	const navigate = useNavigate();
	const { userData, loading, errors, userUpdateSuccess } = useSelector(state => state.userReducer);
	const dispatch = useDispatch();
	const [modalVisible, setModalVisible] = useState(false);
	let modalParams = useRef({});

	const [isNarrowScreen, setIsNarrowScreen] = useState(matchMedia('max-width: 519.99px').matches);
	const mediaWatcher = window.matchMedia("(max-width: 440px)");
	const updateIsNarrowScreen = e => setIsNarrowScreen(e.matches);

	const [fields, setFields] = useState({
		nickname: '',
		oldPassword: '',
		newPassword: '',
		retypeNewPassword: ''
	});

	function getAuth() {
		const accessCookie = Cookies.get('accesstoken');
		if (accessCookie) {
			dispatch(userGetUser({ accesstoken: accessCookie }));
		}
	}

	useEffect(() => {
		mediaWatcher.addEventListener('change', updateIsNarrowScreen);

		// определяем изменение ширины вьюпорта для нужных действий
		setIsNarrowScreen(mediaWatcher.matches);

		getAuth();

		if (userData?.user?.nickname) setFields({ nickname: userData.user.nickname });

		return () => {
			// выгружаем после выхода из компонента
			mediaWatcher.removeEventListener('change', updateIsNarrowScreen)
		}
	}, []);

	useEffect(() => {
		if (errors.length > 0 && !loading) {
			dispatch(showInfo({ text: errors, cancel: true }));
		}
	}, [errors]);

	useEffect(() => {
		if (userUpdateSuccess) {
			dispatch(showInfo({ text: "Данные успешно изменены", ok: true }));
			setFields({
				...fields,
				['oldPassword']: '',
				['newPassword']: '',
				['retypeNewPassword']: ''
			});
			dispatch(userUpdateSuccessReset());
		}
	}, [userData, userUpdateSuccess]);


	const changeInput = useCallback((e) => {
		setFields({
			...fields,
			[e.target.name]: e.target.value
		});
	}, [fields]);

	const handleKey = e => { if (e.key === 'Enter') handleApplyProfile(); }

	function showModal(e, mode) {
		e.preventDefault();
		switch (mode) {

			case 'recipeDeleteChange':
				dispatch(recipeGetRecipies());
				dispatch(categoryGetCategories());
				if (userData?.user?.role === 1) dispatch(userGetUsersNickname());
				// удаляем старые параметры для модального окна
				Object.keys(modalParams).forEach(key => delete modalParams[key]);
				Object.assign(modalParams, {
					title: <SectionHeader>Удалить/изменить рецепт</SectionHeader>,
					content: <RecipeDeleteChange />,
					cancelBtnCaption: "Закрыть",
					onClose: () => { getAuth(); setModalVisible(false) }
				});
				break;

			case 'blogDeleteChange':
				dispatch(blogGetBlogs());
				Object.keys(modalParams).forEach(key => delete modalParams[key]);
				Object.assign(modalParams, {
					title: <SectionHeader>Удалить/изменить блог</SectionHeader>,
					content: <BlogDeleteChange />,
					cancelBtnCaption: "Закрыть",
					onClose: () => { getAuth(); setModalVisible(false) }
				});
				break;

			case 'categoryAddChangeDelete':
				dispatch(categoryGetCategories());
				Object.keys(modalParams).forEach(key => delete modalParams[key]);
				Object.assign(modalParams, {
					title: <SectionHeader>Категории</SectionHeader>,
					content: <CategoryAddDeleteChange />,
					actionType: "categoryAddChangeDelete",
					cancelBtnCaption: "Закрыть",
					onClose: () => { getAuth(); setModalVisible(false) }
				});
				break;

			case 'phraseAddChangeDelete':
				dispatch(phraseGetPhrases());
				Object.keys(modalParams).forEach(key => delete modalParams[key]);
				Object.assign(modalParams, {
					title: <SectionHeader>Фразы на главной странице</SectionHeader>,
					content: <PhraseAddChangeDelete />,
					actionType: "phraseAddChangeDelete",
					cancelBtnCaption: "Закрыть",
					onClose: () => { getAuth(); setModalVisible(false) }
				});
				break;

			case 'userAddChangeDelete':
				dispatch(userGetUsers());
				dispatch(userGetRoles());
				Object.keys(modalParams).forEach(key => delete modalParams[key]);
				Object.assign(modalParams, {
					title: <SectionHeader>Редактирование пользователя</SectionHeader>,
					content: <UserAddChangeDelete />,
					okBtnCaption: "Применить",
					actionType: "userAddChangeDelete",
					cancelBtnCaption: "Закрыть",
					onClose: () => { getAuth(); setModalVisible(false) }
				});
				break;
		}
		setModalVisible(true);
	}

	async function handleApplyProfile() {
		const fd = new FormData();
		const filledData = Object.entries(fields).filter(item => item[1].length > 0);
		const { nickname, oldPassword, newPassword, retypeNewPassword } = Object.fromEntries(filledData);
		if (nickname?.length > 0) fd.append('nickname', nickname);

		// проверяем правильность паролей
		if ((oldPassword && newPassword && retypeNewPassword) && (newPassword === retypeNewPassword)) {
			fd.append('oldPassword', oldPassword);
			fd.append('newPassword', newPassword);
		} else if (newPassword !== retypeNewPassword) {
			dispatch(showInfo({ text: "Новые пароли не совпадают", cancel: true }));
			return;
		}

		try {
			dispatch(userUpdate(fd));
		} catch (error) {
			console.log("Error: ", error);
		}
	};

	function handleExit() {
		const accessCookie = Cookies.get('accesstoken');
		if (accessCookie) {
			dispatch(userGetUser({ accesstoken: accessCookie }));
		}
		navigate(paths.home);
	}


	return (
		<>
			<Helmet>
				<title>Личный кабинет</title>
				<meta name="description" content="Recipes, Account profile page"></meta>
			</Helmet>

			<ProfileMainWrapper activated={userData?.user?.isactivated}>

				<ProfileWrapper>
					<ProfileCaption message="Личный кабинет" username={loading ? <Spinner height={26} /> : userData?.user?.nickname ? userData.user.nickname : userData?.user?.email} />

					<ProfileFormWrapper>

						<ProfileCurrentUser>
							{
								userData?.user?.rolelat === 'admin'
									? userData?.user?.rolecyr
									: ''
							}
						</ProfileCurrentUser>
						<ProfileForm>

							<ProfileAvatar>
								<AvatarSelect
									labelPos='column'
									labelText="Перетащите сюда файл с аватаркой"
									placeholderText="Выберите файл..."
									singleFileOnly
									image={userData?.user?.avatar ? userData.user.avatar : null}
									size={122}
								/>
							</ProfileAvatar>

							<ProfileNickname>
								<Input
									labelText='Имя на сайте:'
									name='nickname'
									value={fields.nickname}
									placeholder='Как вас называть?'
									handleChange={changeInput}
									handleKeyPress={handleKey}
									// меняем расположение в зависимости от ширины viewport
									labelPos={!isNarrowScreen ? 'row' : 'column'}
								/>
							</ProfileNickname>

							<ProfilePassword>
								<ProfilePasswordLabel>Старый пароль:</ProfilePasswordLabel>
								<Input
									name='oldPassword'
									type='password'
									placeholder='Старый пароль...'
									value={fields.oldPassword}
									handleChange={changeInput}
									handleKeyPress={handleKey}
								/>
								<ProfilePasswordLabel>Новый пароль:</ProfilePasswordLabel>
								<Input
									name='newPassword'
									type='password'
									placeholder='Новый пароль...'
									value={fields.newPassword}
									handleChange={changeInput}
									handleKeyPress={handleKey}
								/>
								<Input
									name='retypeNewPassword'
									type='password'
									placeholder='Ещё раз новый пароль...'
									value={fields.retypeNewPassword}
									handleChange={changeInput}
									handleKeyPress={handleKey}
								/>
							</ProfilePassword>

							<ProfileActions>

								<ProfileActionItem>
									<ProfileActionItemOperation>Рецепт:</ProfileActionItemOperation>
									<ProfileActionTasks>
										<Button disabled={!userData?.user?.isactivated} equalPadding action={() => navigate(paths.recipeadd)}>{<AddICO />}</Button>
										<Button disabled={!userData?.user?.isactivated} equalPadding action={e => showModal(e, 'recipeDeleteChange')}>{<GearICO />}</Button>
									</ProfileActionTasks>
								</ProfileActionItem>
								{/* ======================================================================================================================================================== */}
								<ProfileActionItem>
									<ProfileActionItemOperation>Блог:</ProfileActionItemOperation>
									<ProfileActionTasks>
										<Button disabled={!userData?.user?.isactivated} equalPadding action={() => navigate(paths.blogadd)}>{<AddICO />}</Button>
										<Button disabled={!userData?.user?.isactivated} equalPadding action={e => showModal(e, 'blogDeleteChange')}>{<GearICO />}</Button>
									</ProfileActionTasks>
								</ProfileActionItem>
								{/* ======================================================================================================================================================== */}
								{
									userData?.user?.rolelat === 'admin'
										? <>
											<ProfileActionItem>
												<ProfileActionItemOperation>Категория:</ProfileActionItemOperation>
												<ProfileActionTasks>
													<Button disabled={!userData?.user?.isactivated} equalPadding action={e => showModal(e, 'categoryAddChangeDelete')}>{<GearICO />}</Button>
												</ProfileActionTasks>
											</ProfileActionItem>
											{/* ======================================================================================================================================================== */}
											<ProfileActionItem>
												<ProfileActionItemOperation>Фраза:</ProfileActionItemOperation>
												<ProfileActionTasks>
													<Button disabled={!userData?.user?.isactivated} equalPadding action={e => showModal(e, 'phraseAddChangeDelete')}><GearICO /></Button>
												</ProfileActionTasks>
											</ProfileActionItem>
											{/* ======================================================================================================================================================== */}
											<ProfileActionItem>
												<ProfileActionItemOperation>Пользователь:</ProfileActionItemOperation>
												<ProfileActionTasks>
													<Button disabled={!userData?.user?.isactivated} equalPadding action={e => showModal(e, 'userAddChangeDelete')}>{<GearICO />}</Button>
												</ProfileActionTasks>
											</ProfileActionItem>
										</>
										: null
								}

							</ProfileActions>

							<ProfileButtons>
								<Button action={handleApplyProfile}>Применить</Button>
								<Button onClick={handleExit}>Закрыть</Button>
							</ProfileButtons>

						</ProfileForm>



					</ProfileFormWrapper>

				</ProfileWrapper>

			</ProfileMainWrapper>


			<DataContext.Provider value={modalContextStore}>
				{modalVisible && <Modal params={modalParams} />}
			</DataContext.Provider>
		</>
	);
}

export default ProfilePage;
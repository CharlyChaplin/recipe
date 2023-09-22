import React, { useState, useEffect, useContext } from 'react';
import { ModalContentWrapper } from 'pages/ProfilePage/components/styled';
import DropdownList from 'components/DropdownList';
import { ReactComponent as DeleteICO } from 'assets/img/icons/trash.svg';
import { HorizontalLine } from 'pages/ProfilePage/components/styled';
import AvatarSelect from 'components/AvatarSelect';
import Input from 'components/Input';
import { Block } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { authStatus, clearUserDataInStore, userGetUserByEmail, userGetUsers } from 'redux/slices/userSlice';
import { useCallback } from 'react';
import { DataContext } from 'pages/ProfilePage/context';
import axios from 'axiosSetup';
import { showInfo } from 'redux/slices/infoSlice';
import Spinner from 'components/Spinner/Spinner';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { paths } from 'routes/helper';


const UserAddChangeDelete = () => {
	let modalStore = useContext(DataContext);
	const [selectedVal, setSelectedVal] = useState('');
	const [nickName, setNickname] = useState('');
	const [userRole, setUserRole] = useState('');
	const [placeholderInput, setPlaceholderInput] = useState('');
	const { users, userData, userById, roles } = useSelector(state => state.userReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isNarrowScreen, setIsNarrowScreen] = useState(matchMedia('(max-width: 800px)').matches);
	const mediaWatcher = window.matchMedia("(max-width: 800px)");
	const updateIsNarrowScreen = e => setIsNarrowScreen(e.matches);


	useEffect(() => {
		mediaWatcher.addEventListener('change', updateIsNarrowScreen);

		setSelectedVal('');
		// очищаем локальное хранилище
		modalStore.changeUserEditNewNickname('');
		modalStore.changeUserEditNewRole('');
		modalStore.changeUserEditEmailForChange('');

		return () => dispatch(clearUserDataInStore());
	}, []);


	function handleUserDelete() { handleDeleteAction() }

	// обработка действия при удалении блога
	const handleDeleteAction = useCallback(async () => {
		if (confirm("Удаляем пользователя из базы данных?")) {
			try {
				const resp = await axios.post('/user/delete', { email: selectedVal });
				if (resp.status === 200) {
					dispatch(showInfo({ text: `Пользователь "${resp.data.deletedUser}" был удалён.`, ok: true }));
					// если пользователь удалил сам себя, то удаляем cookies
					// и автоматически будем неавторизованы
					if (resp.data.itself) {
						Cookies.remove('accesstoken');
						Cookies.remove('refreshtoken');
						navigate(paths.home);
						dispatch(authStatus(false));
						return;
					}
				}
				dispatch(clearUserDataInStore());
				setSelectedVal('');
				// очищаем локальное хранилище
				modalStore.changeUserEditNewNickname('');
				modalStore.changeUserEditNewRole('');
				modalStore.changeUserEditEmailForChange('');
				dispatch(userGetUsers());
			} catch (error) {
				dispatch(showInfo({ text: `Ошибка при удалении пользователя`, cancel: true }));
			}
		}
	}, [dispatch, selectedVal]);

	function handleChangeNickname(e) {
		setNickname(e.target.value);
		modalStore.changeUserEditNewNickname(e.target.value);
	}

	function handleSelectRole(val) {
		setUserRole(val);
		const rusVal = val === "Администратор"
			? 'admin'
			: val === "Пользователь"
				? 'user'
				: 'unknown'
		modalStore.changeUserEditNewRole(rusVal);
	}

	function getRoleInRus() {
		if (userById?.role) {
			return userById.role === 'admin'
				? 'Администратор'
				: userById.role === 'user'
					? 'Пользователь'
					: 'Выберите e-mail из выпадающего списка...';
		} else {
			return 'Выберите e-mail из выпадающего списка...';
		}
	}

	const handleSelect = useCallback(val => {
		setSelectedVal(val);
		// сбрасываем поле никнейма и очищаем локальное хранилище
		setNickname('');
		modalStore.changeUserEditNewNickname('');
		// сбрасываем поле роли и очищаем локальное хранилище
		setUserRole('');
		modalStore.changeUserEditNewRole('');

		// в локальное хранилище записываем выбранный элемент
		modalStore.changeUserEditEmailForChange(val);

		dispatch(userGetUserByEmail(val));
	}, [selectedVal, userRole, userById]);



	return (
		<>
			<ModalContentWrapper>
				<DropdownList
					elements={users}
					labelText="e-mail пользователя:"
					placeholder='Выберите...'
					minWidth={300}
					labelPos="column"
					inputText={selectedVal}
					selectedValue={handleSelect}
					buttonDeleteIcon={<DeleteICO />}
					buttonDeleteAction={handleUserDelete}
					buttonDeleteDisabled={!selectedVal.length}
					buttonActionPosition={isNarrowScreen ? 'column' : 'row'}
				/>

				<HorizontalLine />

				<Block>
					<AvatarSelect
						labelText="Выберите аватарку:"
						placeholderText="файл..."
						singleFileOnly
						image={userById?.avatar ? userById.avatar : null}
						source='userById'
						size={55}
						locked={!selectedVal.length}
					/>
					<Input
						labelPos='row'
						labelText='Имя на сайте:'
						value={nickName}
						placeholder={userById?.nickname ? `Было ${userById.nickname}, стало...` : selectedVal.length ? 'Как вас называть?' : 'Выберите e-mail из выпадающего списка...'}
						handleChange={handleChangeNickname}
					/>
					<DropdownList
						elements={selectedVal ? roles.map(role => role.rolecyr) : []}
						labelText="Права доступа:"
						placeholder={getRoleInRus()}
						labelPos={isNarrowScreen ? 'column' : 'row'}
						inputText={userRole}
						selectedValue={handleSelectRole}
						buttonActionPosition={isNarrowScreen ? 'column' : 'row'}
					/>
				</Block>


			</ModalContentWrapper>
		</>
	);
}

export default UserAddChangeDelete;
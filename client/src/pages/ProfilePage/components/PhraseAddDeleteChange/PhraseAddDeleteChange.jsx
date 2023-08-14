import React, { useEffect } from 'react';
import Input from 'components/Input';
import { useState } from 'react';
import Button from 'components/Button';
import { ReactComponent as AddICO } from 'assets/img/icons/plus.svg';
import { ReactComponent as DeleteICO } from 'assets/img/icons/trash.svg';
import { ReactComponent as EditICO } from 'assets/img/icons/edit.svg';
import { ReactComponent as OkICO } from 'assets/img/icons/ok.svg';
import { AddWrapper, HorizontalLine, ModalContentWrapper } from '../styled.js';
import DropdownList from 'components/DropdownList';
import { useContext } from 'react';
import { DataContext } from 'pages/ProfilePage/context/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { phraseGetPhrases } from 'redux/slices/phraseSlice.js';
import { showInfo } from 'redux/slices/infoSlice.js';
import { useCallback } from 'react';
import axios from 'axiosSetup';


const phraseAddChangeDelete = () => {
	let modalStore = useContext(DataContext);

	const { userData } = useSelector(state => state.userReducer);
	const { phraseData, loading } = useSelector(state => state.phraseReducer);
	const dispatch = useDispatch();

	const [newPhrase, setNewPhrase] = useState('');
	const [isEdit, setIsEdit] = useState(false);
	const [changedPhrase, setChangedPhrase] = useState('');
	const [selected, setSelected] = useState('');
	const [inputText, setInputText] = useState(selected);




	// получаем новую фразу в состояние
	function handleAddPhrase(e) { setNewPhrase(e.target.value); }

	// обработка Enter после ввода в поле Input
	function handleKeyPress(e, type = '') {
		if (e.key === "Enter") {
			switch (type) {
				case 'add':
					handleAdd();
					break;
				case 'change':
					handleCorrectPhrase();
					break;
				default:
					return;
			}
		}
	}

	// действие на кнопке при добавлении фразы
	const handleAdd = useCallback(async () => {
		if (!newPhrase.length) return;
		modalStore.addNewPhrase(newPhrase);
		try {
			const resp = await axios.post('/phrase/add', { phraseText: newPhrase });
			if (resp.status && resp.status === 200) {
				dispatch(showInfo({ text: `Фраза "${resp.data.caption}" была добавлена.`, ok: true }));
				setNewPhrase('');	// очищаем поле ввода новой фразы
				dispatch(phraseGetPhrases());	// получаем заного оставшиеся фразы
			}
		} catch (error) {
			dispatch(showInfo({ text: `Ошибка при добавлении (${error.response.data.detail})`, cancel: true }));
		}
	}, [dispatch, newPhrase]);

	// получаем изменённую категорию в состояние
	function handleChangePhrase(e) { setChangedPhrase(e.target.value); }

	// получаем данные выбранного элемента в ComboBox
	function handleSelected(val) {
		setSelected(val);
		modalStore.selectPhraseForDelete(val);
		if (isEdit) setChangedPhrase(val);
	}

	// обработка действия при удалении фразы
	const handleDeleteAction = useCallback(async () => {
		if (confirm("Удаляем фразу из базы данных?")) {
			try {
				const resp = await axios.post('/phrase/delete', { phrase: modalStore.phraseForDelete });
				if (resp.data) {
					dispatch(showInfo({ text: `Фраза "${resp.data}" была удалена.`, ok: true }));
				}
				setInputText('');		// сбрасываем состояние выбранности DropListBox
				setSelected('');		// блокируем кнопки удаления/изменения
				dispatch(phraseGetPhrases());	// получаем заного оставшиеся фразы
			} catch (error) {
				dispatch(showInfo({ text: `Ошибка при удалении (${error.response.data.detail})`, cancel: true }));
			}

		}
	}, [dispatch]);

	// обрабатываем исправленное значение фразы
	const handleCorrectPhrase = useCallback(async () => {
		try {
			const dataPhrase = { oldPhrase: selected, newPhrase: changedPhrase };
			const resp = await axios.put('/phrase/change', dataPhrase);
			if (resp.status && resp.status === 200) {
				dispatch(showInfo({ text: `Фраза "${selected}" была успешно изменена.`, ok: true }));
				setIsEdit(false);
				setChangedPhrase('');
				setInputText('');		// сбрасываем состояние выбранности DropListBox
				setSelected('');		// блокируем кнопки удаления/изменения
				dispatch(phraseGetPhrases());	// получаем заного оставшиеся фразы
			}
		} catch (error) {
			dispatch(showInfo({ text: `Ошибка при изменении (${error.response.data.detail})`, cancel: true }));
		}

	}, [dispatch, changedPhrase]);

	// устанавливаем зависимость показа поля для изменения фразы
	// в зависимости от наличия выбранного элемента в ComboBox
	function handleEditAction() {
		setIsEdit(!!selected.length);
		setChangedPhrase(selected);
	}


	return (
		<>
			<ModalContentWrapper>
				<AddWrapper>
					<Input
						labelPos='column'
						labelText='Добавить фразу:'
						value={newPhrase}
						placeholder='Новая фраза...'
						type='textarea'
						autoFocus
						handleChange={handleAddPhrase}
						handleKeyPress={e => handleKeyPress(e, 'add')}
					/>
					<Button equalPadding action={handleAdd}>{<AddICO />}</Button>
				</AddWrapper>

				<HorizontalLine />

				<DropdownList
					elements={phraseData ? phraseData : []}
					placeholder={userData?.user?.rolelat === 'admin' ? 'Выберите из существующего...' : 'Выберите из созданного вами...'}
					inputText={inputText}
					setInputText={setInputText}
					selectedValue={handleSelected}
					buttonDeleteIcon={<DeleteICO />}
					buttonDeleteAction={handleDeleteAction}
					buttonDeleteDisabled={!selected.length > 0}
					buttonEditIcon={<EditICO />}
					buttonEditAction={handleEditAction}
					buttonEditDisabled={!selected.length > 0}
				/>

				{
					isEdit &&
					<AddWrapper $verticalcenter>
						<Input
							value={changedPhrase}
							handleChange={handleChangePhrase}
							handleKeyPress={e => handleKeyPress(e, 'change')}
							autoFocus
						/>
						<Button equalPadding action={handleCorrectPhrase} >{<OkICO />}</Button>
					</AddWrapper>
				}


			</ModalContentWrapper>


		</>
	);
}

export default phraseAddChangeDelete;
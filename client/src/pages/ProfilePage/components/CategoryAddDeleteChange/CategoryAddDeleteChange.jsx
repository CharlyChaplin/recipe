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
import { showInfo } from 'redux/slices/infoSlice.js';
import { useCallback } from 'react';
import axios from 'axiosSetup';
import { categoryGetCategories } from 'redux/slices/categorySlice.js';
import { AddCategoryPhoto, AddWrapperCategory, AddWrapperCategoryLeft, AddWrapperCategorySidePart } from './styled.js';
import { AddPhotoBlock } from 'pages/pages.styled.js';
import ImageInsert from 'components/ImageInsert/ImageInsert.jsx';
import vars from 'init/vars.js';


const categoryAddChangeDelete = () => {
	let modalStore = useContext(DataContext);

	const { userData } = useSelector(state => state.userReducer);
	const { categoryData, errors } = useSelector(state => state.categoryReducer);
	const dispatch = useDispatch();

	const [newCategory, setNewCategory] = useState('');
	const [isEdit, setIsEdit] = useState(false);
	const [changedCategory, setChangedCategory] = useState('');
	const [selected, setSelected] = useState('');
	const [inputText, setInputText] = useState(selected);
	const [categories, setCategories] = useState([]);
	const [clear, setClear] = useState(false);
	const [picture, setPicture] = useState("");

	const [isNarrowScreen, setIsNarrowScreen] = useState(matchMedia('(max-width: 800px)').matches);
	const mediaWatcher = window.matchMedia("(max-width: 800px)");
	const updateIsNarrowScreen = e => setIsNarrowScreen(e.matches);

	let categoryName = '', currentCategoryImage;

	useEffect(() => {
		mediaWatcher.addEventListener('change', updateIsNarrowScreen);

		if (categoryData.length > 0) {
			setCategories(categoryData.map(el => el.caption));
		} else {
			setCategories([]);
		}

		return () => setClear(false);
	}, [categoryData]);

	// получаем новую фразу в состояние
	function handleAddCategory(e) { setNewCategory(e.target.value); }

	// обработка Enter после ввода в поле Input
	function handleKeyPress(e, type = '') {
		if (e.key === "Enter") {
			switch (type) {
				case 'add':
					if (newCategory.length) handleAdd();
					break;
				case 'change':
					handleCorrectCategory();
					break;
				default:
					return;
			}
		}
	}

	// действие на кнопке при добавлении категории
	const handleAdd = useCallback(async () => {
		if (!newCategory.length) return;
		modalStore.addNewCategory(newCategory);
		modalStore.addNewCategoryPhoto(picture);
		const fd = new FormData();
		fd.append('categoryText', newCategory);
		if (picture) fd.append('bg', picture);

		try {
			const resp = await axios.post('/category/add', fd, { headers: { "Content-Type": 'multipart/formdata' } });
			if (resp.status && resp.status === 200) {
				dispatch(showInfo({ text: `Категория "${resp.data.caption}" была добавлена.`, ok: true }));
			}
			setInputText('');		// сбрасываем состояние выбранности DropListBox
			setIsEdit(false);		// сбрасываем состояние редактирования
			setClear(true);		// очищаем картинку
			setSelected('');		// блокируем кнопки удаления/изменения
			setNewCategory('');	// очищаем поле ввода новой категории
			dispatch(categoryGetCategories());	// получаем заного оставшиеся категории
		} catch (error) {
			dispatch(showInfo({ text: `Ошибка при добавлении (${error.response.data.detail})`, cancel: true }));
		}
	}, [dispatch, newCategory, picture]);

	// получаем изменённую категорию в состояние
	function handleChangeCategory(e) {
		setChangedCategory(e.target.value);
	}

	// получаем данные выбранного элемента в ComboBox
	function handleSelected(val) {
		setSelected(val);
		modalStore.selectCategoryForDelete(val);

		if (isEdit) {
			// показываем поле ввода для редактирования
			setChangedCategory(val);
		}
	}

	// обработка действия при удалении категории
	const handleDeleteAction = useCallback(async () => {
		if (confirm("Удаляем категорию из базы данных?")) {
			try {
				const resp = await axios.post('/category/delete', { categoryCaption: modalStore.categoryForDelete });
				if (resp.data) {
					dispatch(showInfo({ text: `Категория "${resp.data}" была удалена.`, ok: true }));
				}
				setInputText('');		// сбрасываем состояние выбранности DropListBox
				setIsEdit(false);		// сбрасываем состояние редактирования
				setSelected('');		// блокируем кнопки удаления/изменения
				dispatch(categoryGetCategories());	// получаем заного оставшиеся категории
			} catch (error) {
				dispatch(showInfo({ text: `Ошибка при удалении (${error.response.data.message})`, isConfirm: { ok: "Ok" }, cancel: true }));
			}
		}
	}, [dispatch]);

	// обрабатываем исправленное значение категории
	const handleCorrectCategory = useCallback(async () => {
		try {
			const dataCategory = { oldCategory: selected, newCategory: changedCategory };
			const fd = new FormData();
			fd.append('oldCategory', selected);
			fd.append('newCategory', changedCategory);
			fd.append('file', picture);

			const resp = await axios.post('/category/edit', fd, { headers: { "Content-Type": "application/formdata" } });
			if (resp.status && resp.status === 200) {
				dispatch(showInfo({ text: `Категория "${selected}" была успешно изменена.`, ok: true }));
			}
			setIsEdit(false);
			setChangedCategory('');
			setInputText('');		// сбрасываем состояние выбранности DropListBox
			setClear(true);		// очищаем картинку
			setSelected('');		// блокируем кнопки удаления/изменения
			dispatch(categoryGetCategories());	// получаем заного оставшиеся категории
		} catch (error) {
			dispatch(showInfo({ text: `Ошибка при изменении (${error.response.data.detail})`, cancel: true }));
		}

	}, [dispatch, changedCategory, picture]);

	// устанавливаем зависимость показа поля для изменения фразы
	// в зависимости от наличия выбранного элемента в ComboBox
	function handleEditAction() {
		setIsEdit(!!selected.length);
		setChangedCategory(selected);
	}


	function getSelectedFile(pictureFile) {
		setPicture(pictureFile);
	}

	const findedImage = categoryData.find(i => i.caption == selected);
	if (findedImage && findedImage?.photopreview) {
		currentCategoryImage = vars.remoteHost + '/' + findedImage.photopreview.split('')?.slice(1)?.join('');
	}

	
	
	


	return (
		<>
			<ModalContentWrapper>
				<AddWrapperCategory>
					<AddWrapperCategorySidePart>
						<Input
							labelPos='column'
							labelText='Добавить категорию:'
							value={newCategory}
							placeholder='Новая категория...'
							autoFocus
							handleChange={handleAddCategory}
							handleKeyPress={e => handleKeyPress(e, 'add')}
						/>
						<Button equalPadding action={handleAdd} disabled={!newCategory?.length > 0}>{<AddICO />}Добавить</Button>
					</AddWrapperCategorySidePart>
					<AddCategoryPhoto>
						<span>Фон для категории:</span>
						<AddPhotoBlock><ImageInsert clear={clear} currentFile={currentCategoryImage} selectedFile={getSelectedFile} placeholder="Выберите или перетащите файл..." /></AddPhotoBlock>
					</AddCategoryPhoto>
				</AddWrapperCategory>

				<HorizontalLine />

				<DropdownList
					elements={categories || []}
					placeholder={userData?.user?.rolelat === 'admin' ? 'Выберите из существующего...' : 'Выберите из созданного вами...'}
					minWidth={300}
					inputText={inputText}
					setInputText={setInputText}
					selectedValue={handleSelected}
					buttonDeleteIcon={<DeleteICO />}
					buttonDeleteAction={handleDeleteAction}
					buttonDeleteDisabled={!selected.length > 0}
					buttonEditIcon={<EditICO />}
					buttonEditAction={handleEditAction}
					buttonEditDisabled={!selected.length > 0}
					buttonActionPosition={isNarrowScreen ? 'column' : 'row'}
				/>

				{
					isEdit &&
					<AddWrapper verticalcenter>
						<Input
							value={changedCategory}
							handleChange={handleChangeCategory}
							handleKeyPress={e => handleKeyPress(e, 'change')}
							autoFocus
						/>
						<Button equalPadding action={handleCorrectCategory} >{<OkICO />}</Button>
					</AddWrapper>
				}
			</ModalContentWrapper>
		</>
	);
}

export default categoryAddChangeDelete;
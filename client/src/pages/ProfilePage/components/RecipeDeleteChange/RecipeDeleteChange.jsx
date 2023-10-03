import React from 'react';
import DropdownList from 'components/DropdownList';
import { ModalContentWrapper } from 'pages/ProfilePage/components/styled';
import { ReactComponent as EditICO } from 'assets/img/icons/edit.svg';
import { ReactComponent as DeleteICO } from 'assets/img/icons/trash.svg';
import { useContext } from 'react';
import { DataContext } from 'pages/ProfilePage/context';
import { useCallback } from 'react';
import axios from 'axiosSetup';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { showInfo } from 'redux/slices/infoSlice';
import { useNavigate } from 'react-router-dom';
import { paths } from 'routes/helper';
import { recipeGetRecipe, recipeGetRecipies } from 'redux/slices/recipeSlice';
import { useEffect } from 'react';


const RecipeDeleteChange = () => {
	let modalStore = useContext(DataContext);
	const [selected, setSelected] = useState('');
	const [inputText, setInputText] = useState(selected);
	
	const [isNarrowScreen, setIsNarrowScreen] = useState(matchMedia('(max-width: 800px)').matches);
	const mediaWatcher = window.matchMedia("(max-width: 800px)");
	const updateIsNarrowScreen = e => setIsNarrowScreen(e.matches);

	const { userData } = useSelector(state => state.userReducer);
	const { recipeData, recipies } = useSelector(state => state.recipeReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	useEffect(() => {
		mediaWatcher.addEventListener('change', updateIsNarrowScreen)
	}, []);


	function handleSelected(val) {
		setSelected(val);
		modalStore.selectRecipeForDelete(val);
	}

	const handleEditAction = useCallback(() => {
		if (confirm("Перейти на страницу изменения рецепта?")) {
			dispatch(recipeGetRecipe({ recipeCaption: selected }));
			navigate(paths.recipeedit);
		}
	}, [selected]);

	// обработка действия при удалении блога
	const handleDeleteAction = useCallback(async () => {
		if (confirm("Удаляем рецепт из базы данных?")) {
			try {
				const resp = await axios.post('/recipe/delete', { recipeCaption: modalStore.selectedRecipeForDelete });

				if (resp.data) {
					dispatch(showInfo({ text: `Рецепт "${resp.data}" был удалён.`, ok: true }));
				}
				setInputText('');		// сбрасываем состояние выбранности DropListBox
				setSelected('');		// блокируем кнопки удаления/изменения
				dispatch(recipeGetRecipies());	// получаем заного оставшиеся рецепты
			} catch (error) {
				dispatch(showInfo({ text: `Ошибка при удалении (${error.response.data.detail})`, cancel: true }));
			}

		}
	}, [dispatch]);



	return (
		<>
			<ModalContentWrapper>
				<DropdownList
					elements={recipies ? recipies : []}
					labelText="Название рецепта:"
					placeholder={userData?.user?.rolelat === 'admin' ? 'Выберите из существующего...' : 'Выберите из созданного вами...'}
					labelPos={isNarrowScreen ? 'column' : 'row'}
					minWidth={300}
					editable
					inputText={inputText}
					setInputText={setInputText}
					selectedValue={handleSelected}
					buttonEditIcon={<EditICO />}
					buttonEditAction={handleEditAction}
					buttonEditDisabled={!selected.length > 0}
					buttonDeleteIcon={<DeleteICO />}
					buttonDeleteAction={handleDeleteAction}
					buttonDeleteDisabled={!selected.length > 0}
					buttonActionPosition={isNarrowScreen ? 'column' : 'row'}
				/>
			</ModalContentWrapper>
		</>
	);
}

export default RecipeDeleteChange;
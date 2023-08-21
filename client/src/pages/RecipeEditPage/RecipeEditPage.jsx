import React, { useEffect, useState } from 'react';
import { ContentPaddingTop, InnerWrapper, MainWrapper } from 'pages/pages.styled';
import { useDispatch, useSelector } from 'react-redux';
import bg from 'assets/img/category/soups/bg.jpg';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import vars from 'init/vars';
import { ContentWrapperChangedForRecipeEdit, RecipeEditTop, RecipeLeft, RecipeLeftTopTextWrapper, RecipeLeftTopWrapper, RecipeRight, RecipeWrapper } from './styled';
import Spinner from 'components/Spinner/Spinner';
import Input from 'components/Input/Input';
import { userGetUsersNickname } from 'redux/slices/userSlice';
import { useCallback } from 'react';
import { BlogEditNotEdit } from 'pages/BlogEditPage/styled';
import DropdownList from 'components/DropdownList/DropdownList';
import { useNavigate } from 'react-router-dom';
import { BlogAddPhoto } from 'pages/BlogAddPage/styled';
import ImageInsert from 'components/ImageInsert/ImageInsert';


let dataSource;

const RecipeEditPage = () => {
	const [fields, setFields] = useState({
		dateadd: '',
		owner: '',
		picture: '',
		caption: '',
		shortDescription: '',
		ingredients: [],
		category: '',
		cookingText: '',
		oldRecipeCaption: ''
	});

	const { userData, users, usersName } = useSelector(state => state.userReducer);
	const { recipeData, loading, error } = useSelector(state => state.recipeReducer);
	const [data, setData] = useState();	// для обновления компонента
	const dispatch = useDispatch();
	const [selected, setSelected] = useState('');
	const [inputText, setInputText] = useState(selected);
	const navigate = useNavigate();


	useEffect(() => {
		getRecipe();
		if (userData?.user?.role === 1) dispatch(userGetUsersNickname());
		
		dataSource = Object.keys(recipeData).length ? recipeData : JSON.parse(localStorage.getItem('recipeEdit') || null);
		setInputText(recipeData.name);
		setFields({ ...fields, oldRecipeCaption: dataSource?.caption });
		
		// if (Object.values(recipeData).length) console.log(recipeData);
		return () => localStorage.removeItem('recipeEdit');
	}, [recipeData]);

	function getRecipe() {
		if (Object.keys(recipeData).length) {
			setData(recipeData);
			localStorage.setItem('recipeEdit', JSON.stringify(recipeData));
		} else if (Array.from(recipeData).length === 0) {
			setData(JSON.parse(localStorage.getItem('recipeEdit') || null));
		}
	};

	const changeInput = useCallback((e) => {
		setFields({
			...fields,
			[e.target.name]: e.target.value
		});
	}, [fields]);

	function handleSelected(val) {
		setSelected(val);
		setFields({ ...fields, owner: val });
	}

	function getSelectedFile(pictureFile) {
		setFields({ ...fields, picture: pictureFile });
	}
	


	return (
		<>
			<MainWrapper image={bg}>

				<InnerWrapper>
					<SectionHeader color={vars.whiteColor}><ContentPaddingTop />Изменяем рецепт</SectionHeader>
					<ContentWrapperChangedForRecipeEdit>

						<RecipeEditTop>
							{
								userData?.user?.role === 1
									? <Input name='dateadd' value={fields.dateadd} handleChange={changeInput} autoFocus center placeholder={dataSource?.dateadd} labelPos='row' labelText='Дата добавления:' />
									: <BlogEditNotEdit data={dataSource?.dateadd} />
							}
							{
								userData?.user?.role === 1
									? <DropdownList elements={usersName} placeholder='Выберите пользователя...' selectedValue={handleSelected} inputText={inputText} setInputText={setInputText} labelPos='row' labelText='Владелец:' />
									: <BlogEditNotEdit data={dataSource?.name} />
							}
						</RecipeEditTop>

						<RecipeWrapper>

							<RecipeLeft>
								<RecipeLeftTopWrapper>

									<BlogAddPhoto><ImageInsert currentFile={recipeData.photoorig} selectedFile={getSelectedFile} /></BlogAddPhoto>
									<RecipeLeftTopTextWrapper>
										<Input name='caption' value={fields.caption} handleChange={changeInput} autoFocus center placeholder={dataSource?.caption} />
										<Input type='textarea' name='shortDescription' value={fields.shortDescription} handleChange={changeInput} center placeholder={dataSource?.shortdescription} />
									</RecipeLeftTopTextWrapper>

								</RecipeLeftTopWrapper>
							</RecipeLeft>

							<RecipeRight>Right</RecipeRight>

						</RecipeWrapper>

					</ContentWrapperChangedForRecipeEdit>
				</InnerWrapper>

			</MainWrapper>
		</>
	);
}

export default RecipeEditPage;
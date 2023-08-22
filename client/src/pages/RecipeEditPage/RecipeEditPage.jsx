import React, { useEffect, useState } from 'react';
import { AddPhotoBlock, ContentPaddingTop, EditNotEdit, InnerWrapper, MainWrapper, RecipeBlockContentWrapper } from 'pages/pages.styled';
import { useDispatch, useSelector } from 'react-redux';
import bg from 'assets/img/category/soups/bg.jpg';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import vars from 'init/vars';
import { AddPhotoBlockForRecipe, ContentWrapperChangedForRecipeEdit, RecipeEditTop, RecipeIngredientsWrapper, RecipeLeft, RecipeLeftTopTextWrapper, RecipeLeftTopWrapper, RecipeMiniCaption, RecipeRight, RecipeWrapper } from './styled';
import Spinner from 'components/Spinner/Spinner';
import Input from 'components/Input/Input';
import { userGetUsersNickname } from 'redux/slices/userSlice';
import { useCallback } from 'react';
import { BlogEditNotEdit } from 'pages/BlogEditPage/styled';
import DropdownList from 'components/DropdownList/DropdownList';
import { useNavigate } from 'react-router-dom';
import { BlogAddPhoto } from 'pages/BlogAddPage/styled';
import ImageInsert from 'components/ImageInsert/ImageInsert';
import IngredientItem from 'components/IngredientItem/IngredientItem';
import { nanoid } from 'nanoid';
import { categoryGetCategories } from 'redux/slices/categorySlice';


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
	const { categoryData } = useSelector(state => state.categoryReducer);
	const [data, setData] = useState();	// для обновления компонента
	const dispatch = useDispatch();
	const [userSelected, setUserSelected] = useState('');
	const [userInputText, setUserInputText] = useState(userSelected);
	const [categorySelected, setCategorySelected] = useState('');
	const [categoryInputText, setCategoryInputText] = useState(categorySelected);
	const navigate = useNavigate();

	useEffect(() => {
		getRecipe();
		dispatch(categoryGetCategories());
		if (userData?.user?.role === 1) dispatch(userGetUsersNickname());

		dataSource = Object.keys(recipeData).length ? recipeData : JSON.parse(localStorage.getItem('recipeEdit') || null);
		setUserInputText(recipeData.name);
		setCategoryInputText(recipeData.category);
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

	function handleUserSelected(val) {
		setUserSelected(val);
		setFields({ ...fields, owner: val });
	}

	function handleCategorySelected(val) {
		setCategorySelected(val);
		setFields({ ...fields, category: val });
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
									: <EditNotEdit data={dataSource?.dateadd} />
							}
							{
								userData?.user?.role === 1
									? <DropdownList elements={usersName} placeholder='Выберите пользователя...' selectedValue={handleUserSelected} inputText={userInputText} setInputText={setUserInputText} labelPos='row' labelText='Владелец:' />
									: <EditNotEdit data={dataSource?.name} />
							}
						</RecipeEditTop>

						<RecipeWrapper>

							<RecipeLeft>
								<RecipeLeftTopWrapper>

									<AddPhotoBlockForRecipe><ImageInsert currentFile={recipeData.photoorig} selectedFile={getSelectedFile} /></AddPhotoBlockForRecipe>
									<RecipeLeftTopTextWrapper>
										<Input name='caption' value={fields.caption} handleChange={changeInput} autoFocus center placeholder={dataSource?.caption} />
										<Input type='textarea' name='shortDescription' value={fields.shortDescription} handleChange={changeInput} center placeholder={dataSource?.shortdescription} fz={12} />
									</RecipeLeftTopTextWrapper>

								</RecipeLeftTopWrapper>

								<RecipeIngredientsWrapper>
									<RecipeMiniCaption text="Ингредиенты:" />
									<RecipeBlockContentWrapper>
										{
											dataSource?.ingredients?.map((ingredient, index) => {
												return (
													<IngredientItem
														key={nanoid()}
														data={ingredient}
														mode='change'
														name={index}
													/>
												)
											})
										}
									</RecipeBlockContentWrapper>
								</RecipeIngredientsWrapper>

								<RecipeIngredientsWrapper>
									<RecipeMiniCaption text="Категория:" />
									<RecipeBlockContentWrapper>
										{
											userData?.user?.role === 1
												? <DropdownList elements={categoryData.map(el => el.caption)} placeholder='Категория...' selectedValue={handleCategorySelected} inputText={categoryInputText} setInputText={setCategoryInputText} minWidth={300} />
												: <EditNotEdit data={dataSource?.name} />
										}
									</RecipeBlockContentWrapper>

								</RecipeIngredientsWrapper>
							</RecipeLeft>

							<RecipeRight>

							</RecipeRight>

						</RecipeWrapper>

					</ContentWrapperChangedForRecipeEdit>
				</InnerWrapper>

			</MainWrapper>
		</>
	);
}

export default RecipeEditPage;
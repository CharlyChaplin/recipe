import React, { useEffect, useState } from 'react';
import bg from 'assets/img/category/soups/bg.jpg';
import { ContentPaddingTop, EditNotEdit, InnerWrapper, MainWrapper, RecipeBlockContentWrapper } from 'pages/pages.styled';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import vars from 'init/vars';
import { AddPhotoBlockForRecipe, ContentWrapperChangedForRecipeEdit, RecipeCookingText, RecipeCookingTextWrapper, RecipeEditButtonWrapper, RecipeEditTop, RecipeIngredientsWrapper, RecipeLeft, RecipeLeftTopTextWrapper, RecipeLeftTopWrapper, RecipeMiniCaption, RecipeRight, RecipeWrapper } from 'pages/RecipeEditPage/styled';
import { useDispatch, useSelector } from 'react-redux';
import { datePrepare } from 'utils/datePrepare';
import { RecipeAddTop } from './styled';
import ImageInsert from 'components/ImageInsert/ImageInsert';
import Input from 'components/Input/Input';
import { useCallback } from 'react';
import IngredientItem from 'components/IngredientItem/IngredientItem';
import { categoryGetCategories } from 'redux/slices/categorySlice';
import DropdownList from 'components/DropdownList/DropdownList';
import Button from 'components/Button/Button';
import { paths } from 'routes/helper';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';




const RecipeAddPage = () => {
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
	const { userData, errors } = useSelector(state => state.userReducer);
	const { recipeData } = useSelector(state => state.recipeReducer);
	const { categoryData } = useSelector(state => state.categoryReducer);

	const [categorySelected, setCategorySelected] = useState('');
	const [categoryInputText, setCategoryInputText] = useState(categorySelected);
	const [ingredients, setIngredients] = useState([{
		data: "ингредиент...",
		mode: "add",
		cloneAction: addIngredient
	}]);
	const dispatch = useDispatch();
	const navigate = useNavigate();


	useEffect(() => {
		setFields({ ...fields, dateadd: datePrepare(Date.now()), owner: userData?.user?.nickname });
		dispatch(categoryGetCategories());

	}, [userData]);

	const changeInput = useCallback((e) => {
		setFields({
			...fields,
			[e.target.name]: e.target.value
		});
	}, [fields]);

	function handleCategorySelected(val) {
		setCategorySelected(val);
		setFields({ ...fields, category: val });
	}

	function getSelectedFile(pictureFile) {
		setFields({ ...fields, picture: pictureFile });
	}

	function addIngredient() {
		console.log("Hello Add Ingredient");
		setIngredients(prev => [...prev, { data: "ингредиент...", mode: "add", cloneAction: addIngredient }]);
	}

	


	return (
		<>
			<MainWrapper image={bg}>

				<InnerWrapper>

					<SectionHeader color={vars.whiteColor}><ContentPaddingTop />Добавляем рецепт</SectionHeader>
					<ContentWrapperChangedForRecipeEdit>

						<RecipeAddTop>
							<div>
								<span>Дата добавления:</span><EditNotEdit data={fields.dateadd} />
							</div>
							<div>
								<span>Пользователь:</span><EditNotEdit data={fields.owner} />
							</div>
						</RecipeAddTop>

						<RecipeWrapper>

							<RecipeLeft>
								<RecipeLeftTopWrapper>

									<AddPhotoBlockForRecipe><ImageInsert currentFile={recipeData.photoorig} selectedFile={getSelectedFile} /></AddPhotoBlockForRecipe>
									<RecipeLeftTopTextWrapper>
										<Input name='caption' value={fields.caption} handleChange={changeInput} autoFocus center placeholder="Название блюда..." />
										<Input type='textarea' name='shortDescription' value={fields.shortDescription} handleChange={changeInput} placeholder="Краткое описание..." fz={12} />
									</RecipeLeftTopTextWrapper>

								</RecipeLeftTopWrapper>

								<RecipeIngredientsWrapper>
									<RecipeMiniCaption text="Ингредиенты:" />
									<RecipeBlockContentWrapper>
										{
											ingredients.map(ingredient => {
												return (
													<IngredientItem
														key={nanoid()}
														data={ingredient.data}
														mode={ingredient.mode}
														cloneAction={ingredient.cloneAction}
													/>
												)
											})
										}
									</RecipeBlockContentWrapper>

								</RecipeIngredientsWrapper>

								<RecipeIngredientsWrapper>
									<RecipeMiniCaption text="Категория:" />
									<RecipeBlockContentWrapper>
										<DropdownList elements={categoryData.map(el => el.caption)} placeholder='Категория...' selectedValue={handleCategorySelected} inputText={categoryInputText} setInputText={setCategoryInputText} />
									</RecipeBlockContentWrapper>
								</RecipeIngredientsWrapper>


							</RecipeLeft>


							<RecipeRight>

								<RecipeCookingTextWrapper>
									<RecipeMiniCaption text="Способ приготовления:" />
									<RecipeCookingText>
										<Input rowsNumber={0} type='textarea' name='cookingText' placeholder="Описание процесса готовки..." value={fields.cookingText} handleChange={changeInput} />
									</RecipeCookingText>
								</RecipeCookingTextWrapper>

							</RecipeRight>

						</RecipeWrapper>

						<RecipeEditButtonWrapper>
							<Button>Добавить</Button>
							<Button onClick={() => navigate(paths.categories)}>Отмена</Button>
						</RecipeEditButtonWrapper>

					</ContentWrapperChangedForRecipeEdit>

				</InnerWrapper>

			</MainWrapper>
		</>
	);
}

export default RecipeAddPage;
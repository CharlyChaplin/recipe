import React, { useEffect, useState } from 'react';
import bg from 'assets/img/category/soups/bg.jpg';
import { ContentPaddingTop, EditNotEdit, InnerWrapper, MainWrapper, RecipeBlockContentWrapper } from 'pages/pages.styled';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import vars from 'init/vars';
import { AddPhotoBlockForRecipe, ContentWrapperChangedForRecipeEdit, RecipeCookingText, RecipeCookingTextWrapper, RecipeEditButtonWrapper, RecipeIngredientsWrapper, RecipeLeft, RecipeLeftTopTextWrapper, RecipeLeftTopWrapper, RecipeMiniCaption, RecipeRight, RecipeWrapper } from 'pages/RecipeEditPage/styled';
import { useDispatch, useSelector } from 'react-redux';
import { datePrepare } from 'utils/datePrepare';
import { RecipeAddTop, RecipeBlockContentWrapperForIngredients, RecipeIngredientsItemsWrapper } from './styled';
import ImageInsert from 'components/ImageInsert/ImageInsert';
import Input from 'components/Input/Input';
import { useCallback } from 'react';
import IngredientItem from 'components/IngredientItem/IngredientItem';
import { categoryGetCategories } from 'redux/slices/categorySlice';
import DropdownList from 'components/DropdownList/DropdownList';
import Button from 'components/Button/Button';
import { paths } from 'routes/helper';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as AddICO } from 'assets/img/icons/plus.svg';
import { clearRecipeData, recipeAddRecipe } from 'redux/slices/recipeSlice';
import { showInfo } from 'redux/slices/infoSlice';




const RecipeAddPage = () => {
	const [fields, setFields] = useState({
		dateadd: '',
		owner: '',
		picture: '',
		caption: 'CRASH',
		shortDescription: 'short Description',
		ingredients: [],
		category: '',
		cookingText: 'How to cooking...'
	});
	const { userData, errors } = useSelector(state => state.userReducer);
	const { recipeData, loading, completed } = useSelector(state => state.recipeReducer);
	const { categoryData } = useSelector(state => state.categoryReducer);

	const [ingredients, setIngredients] = useState([{
		data: "ингредиент...",
		mode: "add",
		value: ''
	}]);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (completed) {
			dispatch(clearRecipeData());
			navigate(`/recipe/${recipeData.recipe.caption_lat}`);
		};
	}, [completed]);

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


	function addIngredient() {
		if (ingredients.length && !ingredients[ingredients.length - 1]?.value.length) return;
		const newField = {
			data: "ингредиент...",
			mode: "add",
			value: ''
		}
		setIngredients([...ingredients, newField]);
	}
	function deleteIngredient(index) {
		const initArr = [...ingredients];
		const data = initArr.filter((_, i) => i !== index);
		setIngredients(data);
	}
	function changeIngredients(index, e) {
		const data = [...ingredients];
		data[index].value = e.target.value;
		setIngredients(data);
		setFields({ ...fields, ingredients: ingredients })
	}
	function changeKeyPressIngredients(e) {
		if (e.key === "Enter") addIngredient();
	}


	function handleCategorySelected(val) {
		setFields({ ...fields, category: val });
	}

	function getSelectedFile(pictureFile) {
		setFields({ ...fields, picture: pictureFile });
	}

	function handleAddRecipe() {
		const fd = new FormData();
		for (let [key, value] of Object.entries(fields)) {
			if (key === 'ingredients') {
				fd.append(key, JSON.stringify(value));
			} else {
				fd.append(key, value);
			}
		}
		
		try {
			dispatch(recipeAddRecipe(fd));
			setTimeout(() => {
				if (errors.length > 0 && !loading) {
					dispatch(showInfo({ text: errors, cancel: true }));
				} else {
					dispatch(showInfo({ text: "Рецепт успешно добавлен", ok: true }));
				}
			}, 300);
		} catch (error) {
			console.log("Error: ", error);
		}
		
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

									<AddPhotoBlockForRecipe><ImageInsert selectedFile={getSelectedFile} /></AddPhotoBlockForRecipe>
									<RecipeLeftTopTextWrapper>
										<Input name='caption' value={fields.caption} handleChange={changeInput} center placeholder="Название блюда..." />
										<Input type='textarea' name='shortDescription' value={fields.shortDescription} handleChange={changeInput} placeholder="Краткое описание..." fz={12} />
									</RecipeLeftTopTextWrapper>

								</RecipeLeftTopWrapper>

								<RecipeIngredientsWrapper>
									<RecipeMiniCaption text="Ингредиенты:" />
									<RecipeBlockContentWrapperForIngredients>
										<Button equalPadding action={addIngredient} ><AddICO /></Button>
										<RecipeIngredientsItemsWrapper>
											{
												ingredients.map((ingredient, index) => {
													return (
														<IngredientItem
															key={index}
															name={index}
															data={ingredient.data}
															mode={ingredient.mode}
															value={ingredient.value}
															handleChange={changeIngredients}
															getKey={changeKeyPressIngredients}
															cloneAction={addIngredient}
															deleteAction={deleteIngredient}
														/>
													)
												})
											}
										</RecipeIngredientsItemsWrapper>
									</RecipeBlockContentWrapperForIngredients>

								</RecipeIngredientsWrapper>

								<RecipeIngredientsWrapper>
									<RecipeMiniCaption text="Категория:" />
									<RecipeBlockContentWrapper>
										<DropdownList elements={categoryData.map(el => el.caption)} placeholder='Категория...' selectedValue={handleCategorySelected} inputText={fields.category} />
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
							<Button action={handleAddRecipe}>Добавить</Button>
							<Button onClick={() => navigate(paths.categories)}>Отмена</Button>
						</RecipeEditButtonWrapper>

					</ContentWrapperChangedForRecipeEdit>

				</InnerWrapper>

			</MainWrapper>
		</>
	);
}

export default RecipeAddPage;
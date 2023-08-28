import React, { useEffect, useState } from 'react';
import { ContentPaddingTop, EditNotEdit, InnerWrapper, MainWrapper, RecipeBlockContentWrapper } from 'pages/pages.styled';
import { useDispatch, useSelector } from 'react-redux';
import bg from 'assets/img/category/soups/bg.jpg';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import vars from 'init/vars';
import { AddPhotoBlockForRecipe, ContentWrapperChangedForRecipeEdit, RecipeAddIngredientWrapper, RecipeCookingText, RecipeCookingTextWrapper, RecipeEditButtonWrapper, RecipeEditTop, RecipeIngredientsWrapper, RecipeLeft, RecipeLeftTopTextWrapper, RecipeLeftTopWrapper, RecipeMiniCaption, RecipeRight, RecipeWrapper } from './styled';
import Input from 'components/Input/Input';
import { userGetUsersNickname } from 'redux/slices/userSlice';
import { useCallback } from 'react';
import DropdownList from 'components/DropdownList/DropdownList';
import { useNavigate } from 'react-router-dom';
import ImageInsert from 'components/ImageInsert/ImageInsert';
import IngredientItem from 'components/IngredientItem/IngredientItem';
import { categoryGetCategories } from 'redux/slices/categorySlice';
import Button from 'components/Button/Button';
import { ReactComponent as AddICO } from 'assets/img/icons/plus.svg';
import { paths } from 'routes/helper';
import { RecipeBlockContentWrapperForIngredients, RecipeIngredientsItemsWrapper } from 'pages/RecipeAddPage/styled';
import { recipeEditRecipe } from 'redux/slices/recipeSlice';
import { showInfo } from 'redux/slices/infoSlice';



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
	const { recipeData, loading, errors } = useSelector(state => state.recipeReducer);
	const { categoryData } = useSelector(state => state.categoryReducer);
	const dispatch = useDispatch();
	const [userSelected, setUserSelected] = useState('');
	const [userInputText, setUserInputText] = useState(userSelected);
	const [categorySelected, setCategorySelected] = useState('');
	const [categoryInputText, setCategoryInputText] = useState(categorySelected);
	const [ingredients, setIngredients] = useState([]);
	const navigate = useNavigate();




	useEffect(() => {
		getRecipe();

		// показываем в DropBox для юзера текущее значение
		setUserInputText(recipeData.name);
		// показываем в DropBox для категории текущее значение
		setCategoryInputText(recipeData.category);
	}, [recipeData]);

	useEffect(() => {
		setFields({ ...fields, ingredients: ingredients });
	}, [ingredients]);


	function getRecipe() {
		if (Object.keys(recipeData).length) {

			// создаём массив из ингредиентов с сервера
			const arr = recipeData.ingredients?.reduce((acc, curr) => {
				return [
					...acc,
					{
						mode: 'change',
						data: curr,
						data1: 'ингредиент...',
						value: '',
						value1: ''
					}
				]
			}, []);
			// заносим его во временный стейт, который нужен для
			// контролируемого ввода ингредиентов
			setIngredients(arr);
			// заполняем стейт текущими ингредиентами, копирую из временного
			setFields({
				...fields,
				ingredients: arr,
				// запоминаем старое значение заголовка для отправки на сервер
				oldRecipeCaption: recipeData.caption
			});
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


	function addIngredient() {
		const newField = {
			mode: 'change',
			data: false,
			data1: 'ингредиент...',
			value: '',
			value1: ''
		};
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
		// здесь нет необходимости обновлять field, т.к. поле fields.ingredients
		// ссылается на массив ingredients, являющийся стейтом
		// setFields({ ...fields, ingredients: ingredients });
	}
	function changeIngredients1(index, e) {
		const data = [...ingredients];
		data[index].value1 = e.target.value;
		setIngredients(data);
		// здесь нет необходимости обновлять field, т.к. поле fields.ingredients
		// ссылается на массив ingredients, являющийся стейтом
		// setFields({ ...fields, ingredients: ingredients });
	}

	function handleEditRecipe() {
		console.log("Edit action occured");
		console.log(fields);
		const fd = new FormData();
		for (let [key, value] of Object.entries(fields)) {
			if (key === 'ingredients') {
				fd.append(key, JSON.stringify(value));
			} else {
				fd.append(key, value);
			}
		}

		try {
			dispatch(recipeEditRecipe(fd));
			setTimeout(() => {
				if (errors.length > 0 && !loading) {
					dispatch(showInfo({ text: errors, cancel: true }));
				} else {
					dispatch(showInfo({ text: "Рецепт успешно изменён", ok: true }));
				}
			}, 300);
		} catch (error) {
			console.log("Error: ", error);
		}
	}


	console.log(fields, ingredients);




	return (
		<>
			<MainWrapper image={bg}>

				<InnerWrapper>
					<SectionHeader color={vars.whiteColor}><ContentPaddingTop />Изменяем рецепт</SectionHeader>
					<ContentWrapperChangedForRecipeEdit>

						<RecipeEditTop>
							{
								userData?.user?.role === 1
									? <Input name='dateadd' value={fields.dateadd} handleChange={changeInput} center placeholder={recipeData?.dateadd} labelPos='row' labelText='Дата добавления:' />
									: <EditNotEdit data={recipeData?.dateadd} />
							}
							{
								userData?.user?.role === 1
									? <DropdownList elements={usersName} placeholder='Выберите пользователя...' selectedValue={handleUserSelected} inputText={userInputText} setInputText={setUserInputText} labelPos='row' labelText='Владелец:' minWidth={300} />
									: <EditNotEdit data={recipeData?.name} />
							}
						</RecipeEditTop>

						<RecipeWrapper>

							<RecipeLeft>
								<RecipeLeftTopWrapper>

									<AddPhotoBlockForRecipe><ImageInsert currentFile={recipeData.photoorig} selectedFile={getSelectedFile} /></AddPhotoBlockForRecipe>
									<RecipeLeftTopTextWrapper>
										<Input name='caption' value={fields.caption} handleChange={changeInput} center placeholder={recipeData?.caption} />
										<Input type='textarea' name='shortDescription' value={fields.shortDescription} handleChange={changeInput} autoFocus placeholder={recipeData?.shortdescription} fz={12} />
									</RecipeLeftTopTextWrapper>

								</RecipeLeftTopWrapper>

								<RecipeIngredientsWrapper>
									<RecipeMiniCaption text="Ингредиенты:" />
									<RecipeBlockContentWrapperForIngredients>
										<Button equalPadding action={addIngredient} ><AddICO /></Button>
										<RecipeIngredientsItemsWrapper>
											{
												fields?.ingredients?.map((ingredient, index) => {
													return (
														<IngredientItem
															key={index}
															name={index}
															data={fields?.ingredients[index]?.data}
															data1={fields?.ingredients[index]?.data1}
															mode={fields?.ingredients[index]?.mode}
															value={fields?.ingredients[index]?.value}
															value1={fields?.ingredients[index]?.value1}
															handleChange={changeIngredients}
															handleChange1={changeIngredients1}
															deleteAction={() => deleteIngredient(index)}
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
										{
											userData?.user?.role === 1
												? <DropdownList elements={categoryData.map(el => el.caption)} placeholder='Категория...' selectedValue={handleCategorySelected} inputText={categoryInputText} setInputText={setCategoryInputText} />
												: <EditNotEdit data={recipeData?.name} />
										}
									</RecipeBlockContentWrapper>

								</RecipeIngredientsWrapper>
							</RecipeLeft>

							<RecipeRight>
								<RecipeCookingTextWrapper>
									<RecipeMiniCaption text="Способ приготовления:" />
									<RecipeCookingText>
										<Input rowsNumber={0} type='textarea' name='cookingText' placeholder={recipeData.cookingtext} value={fields.cookingText} handleChange={changeInput} />
									</RecipeCookingText>
								</RecipeCookingTextWrapper>
							</RecipeRight>

						</RecipeWrapper>

						<RecipeEditButtonWrapper>
							<Button action={handleEditRecipe}>Изменить</Button>
							<Button onClick={() => navigate(paths.categories)}>Отмена</Button>
						</RecipeEditButtonWrapper>

					</ContentWrapperChangedForRecipeEdit>
				</InnerWrapper>

			</MainWrapper>
		</>
	);
}

export default RecipeEditPage;
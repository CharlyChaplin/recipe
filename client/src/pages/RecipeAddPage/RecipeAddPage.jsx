import React, { useEffect, useState } from 'react';
import bg from 'assets/img/category/soups/bg.jpg';
import { ContentPaddingTop, EditNotEdit, InnerWrapper, MainWrapper } from 'pages/pages.styled';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import vars from 'init/vars';
import { AddPhotoBlockForRecipe, ContentWrapperChangedForRecipeEdit, RecipeEditTop, RecipeIngredientsWrapper, RecipeLeft, RecipeLeftTopTextWrapper, RecipeLeftTopWrapper, RecipeMiniCaption, RecipeRight, RecipeWrapper } from 'pages/RecipeEditPage/styled';
import { useSelector } from 'react-redux';
import { datePrepare } from 'utils/datePrepare';
import { RecipeAddTop } from './styled';
import ImageInsert from 'components/ImageInsert/ImageInsert';
import Input from 'components/Input/Input';
import { useCallback } from 'react';
import IngredientItem from 'components/IngredientItem/IngredientItem';




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

	useEffect(() => {
		setFields({ ...fields, dateadd: datePrepare(Date.now()), owner: userData?.user?.nickname });


	}, [userData]);

	const changeInput = useCallback((e) => {
		setFields({
			...fields,
			[e.target.name]: e.target.value
		});
	}, [fields]);


	function getSelectedFile(pictureFile) {
		setFields({ ...fields, picture: pictureFile });
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
									<IngredientItem
										data="ингредиент..."
										mode='add'
									/>
								</RecipeIngredientsWrapper>
								
							
								
								
							</RecipeLeft>
							

							<RecipeRight>Right</RecipeRight>

						</RecipeWrapper>

					</ContentWrapperChangedForRecipeEdit>

				</InnerWrapper>

			</MainWrapper>
		</>
	);
}

export default RecipeAddPage;
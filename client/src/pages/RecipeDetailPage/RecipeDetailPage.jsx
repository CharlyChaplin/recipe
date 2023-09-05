import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoData from 'components/NoData/NoData';
import Spinner from 'components/Spinner/Spinner';
import { ButtonBtn, ContentWrapper, InnerWrapper, MainWrapper } from 'pages/pages.styled';
import bg from 'assets/img/category/soups/bg.jpg';
import listMarker from 'assets/img/recipe/list-item.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { recipeGetRecipe } from 'redux/slices/recipeSlice';
import { ContentWrapperChangedForRecipeDetail, InnerWrapperChangedForRecipeDetail, RecipeCookingTextCaption, RecipeDetailTop, RecipeShowCaption, RecipeShowCookingText, RecipeShowCookingTextWrapper, RecipeShowIngredientsWrapper, RecipeShowLeft, RecipeShowMiniCaption, RecipeShowPhotoBlock, RecipeShowShortDescription } from './styled';
import { RecipeIngredientsWrapper, RecipeLeftTopTextWrapper, RecipeLeftTopWrapper, RecipeRight, RecipeWrapper } from 'pages/RecipeEditPage/styled';
import ImageInsert from 'components/ImageInsert/ImageInsert';
import IngredientItem from './components/IngredientItem';
import { nanoid } from 'nanoid';


const RecipeDetailPage = () => {
	const { name } = useParams();
	const { recipeData, loading, errors } = useSelector(state => state.recipeReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		getData();

	}, [name]);

	const getData = useCallback(() => {
		dispatch(recipeGetRecipe({ recipeCaption: name }));
	}, [recipeData, dispatch]);




	return (
		<>
			<MainWrapper image={bg}>
				<InnerWrapperChangedForRecipeDetail>
					<ButtonBtn handleaction={() => navigate(-1)} />
					{
						loading
							? <ContentWrapper spiner><Spinner height={100} /></ContentWrapper>
							: errors?.length
								? <ContentWrapper spiner><NoData text="Рецепт не найден" /></ContentWrapper>
								:
								<ContentWrapperChangedForRecipeDetail>

									<RecipeDetailTop>
										<div>
											<span>Добавлен:</span>
											<em><strong>{`${recipeData?.dateadd}`}</strong></em>
										</div>
										<div>
											<span>пользователем:</span>
											<em><strong>{`${recipeData?.name}`}</strong></em>
										</div>
									</RecipeDetailTop>

									<RecipeWrapper>

										<RecipeShowLeft>
											<RecipeLeftTopWrapper>

												<RecipeShowPhotoBlock><ImageInsert currentFile={recipeData.photoorig} /></RecipeShowPhotoBlock>
												<RecipeLeftTopTextWrapper>
													<RecipeShowCaption text={recipeData.caption} />
													<RecipeShowShortDescription>Борщ — горячий заправочный суп на основе свёклы, которая придаёт ему характерный красный цвет.</RecipeShowShortDescription>
												</RecipeLeftTopTextWrapper>

											</RecipeLeftTopWrapper>

											<RecipeIngredientsWrapper>
												<RecipeShowMiniCaption text="Ингредиенты:" />
												<RecipeShowIngredientsWrapper>
													{
														loading
															? <Spinner height={40} />
															: <ul>
																{
																	recipeData?.ingredients?.map(item => {
																		return (
																			<IngredientItem
																				key={nanoid()}
																				item={item}
																				listIcon={listMarker}
																			/>
																		)
																	})
																}
															</ul>

													}
												</RecipeShowIngredientsWrapper>
											</RecipeIngredientsWrapper>

										</RecipeShowLeft>

										<RecipeRight>
											<RecipeShowCookingTextWrapper>
												<RecipeCookingTextCaption text="Способ приготовления:" />
												<RecipeShowCookingText>{recipeData.cookingtext}</RecipeShowCookingText>
											</RecipeShowCookingTextWrapper>
										</RecipeRight>

									</RecipeWrapper>

								</ContentWrapperChangedForRecipeDetail>
					}
				</InnerWrapperChangedForRecipeDetail>
			</MainWrapper>

		</>
	);
}

export default RecipeDetailPage;
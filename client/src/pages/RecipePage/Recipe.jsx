import React, { useEffect, useCallback } from 'react';
import { MainWrapper } from 'pages/pages.styled';
import bg from 'assets/img/blog/bg.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { clearRecipeData, recipeGetPreviewRecipies } from 'redux/slices/recipeSlice';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';


const Categories = lazy(() => import('pages/RecipePage/components/Categories'));



const RecipePage = () => {
	const { recipePreview } = useSelector(state => state.recipeReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		getPreview();

		dispatch(clearRecipeData());
	}, []);

	const getPreview = useCallback(() => {
		dispatch(recipeGetPreviewRecipies());
	}, [recipePreview, dispatch]);


	return (
		<>
			<MainWrapper image={bg}>
				<Routes>
					
					<Route index element={<Categories items={recipePreview} />}
						
					
					/>
					
					
				</Routes>



			</MainWrapper>
		</>
	);
}

export default RecipePage;
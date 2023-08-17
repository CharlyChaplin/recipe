import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { recipeGetRecipe } from 'redux/slices/recipeSlice';


const RecipeDetailPage = () => {
	const { name } = useParams();
	const { recipeData, loading } = useSelector(state => state.recipeReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		getData();

	}, [name]);

	const getData = useCallback(() => {
		dispatch(recipeGetRecipe({ recipeCaption: name }));
	}, [recipeData, dispatch]);




	return (
		<>
			<h1>{name}</h1>
		</>
	);
}

export default RecipeDetailPage;
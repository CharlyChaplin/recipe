import React from 'react';
import { MainWrapper } from 'pages/pages.styled';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';


const RecipeEditPage = () => {
	const { recipeData } = useSelector(state => state.recipeReducer);
	const [data, setData] = useState();	// для обновления компонента

	useEffect(() => {
		getRecipe();

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



	return (
		<>
			<MainWrapper>
				Recipe EDIT
			</MainWrapper>
		</>
	);
}

export default RecipeEditPage;
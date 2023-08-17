import React from 'react';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import vars from 'init/vars';
import { ContentPaddingTop, ContentWrapper, InnerWrapper } from 'pages/pages.styled';
import Spinner from 'components/Spinner/Spinner';
import NoData from 'components/NoData/NoData';
import { useDispatch, useSelector } from 'react-redux';
import PreviewItem from '../PreviewItem/PreviewItem';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { recipeGetByCategory, recipeGetPreviewRecipies } from 'redux/slices/recipeSlice';
import InnerItems from '../InnerItems/InnerItems';
import { useLocation, useParams } from 'react-router-dom';


let outData;

const Categories = () => {
	const { recipePreview, recipeInCategory, loading } = useSelector(state => state.recipeReducer);
	const dispatch = useDispatch();
	const location = useLocation();
	const { name } = useParams();


	useEffect(() => {
		if (name) {
			getCategoryItems();
		} else {
			getPreview();
		}
	}, [location]);


		const getPreview = useCallback(() => {
			dispatch(recipeGetPreviewRecipies());
		}, [recipePreview, dispatch]);

	const getCategoryItems = useCallback(() => {
		if (name) dispatch(recipeGetByCategory({ categoryName: name }));
	}, [location, dispatch]);


	if (name) {
		outData = recipeInCategory.map(categoryItem => ({
			...categoryItem,
			url: `/recipe/${categoryItem.caption_lat}`
		}));
	} else {
		outData = recipePreview.map(category => ({
			...category,
			url: `category/${category.categoryname}`
		}));
	}


	return (
		<>

			<InnerItems headerCaption="Рецепты по категориям" items={outData} loadStatus={loading} />

		</>
	);
}

export default Categories;
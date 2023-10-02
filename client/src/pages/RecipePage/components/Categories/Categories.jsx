import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { recipeGetByCategory, recipeGetPreviewRecipies } from 'redux/slices/recipeSlice';
import InnerItems from '../InnerItems/InnerItems';
import { useLocation, useParams } from 'react-router-dom';
import { categoryGetCategoryName, clearCategoryData } from 'redux/slices/categorySlice';
import { MainWrapper } from 'pages/pages.styled';
import bg from 'assets/img/blog/bg.jpg';
import { Helmet } from 'react-helmet';



let outData;

const Categories = () => {
	const { recipePreview, recipeInCategory, loading } = useSelector(state => state.recipeReducer);
	const { categoryData, categoryLoading } = useSelector(state => state.categoryReducer);
	const dispatch = useDispatch();
	const location = useLocation();
	const { name } = useParams();


	useEffect(() => {
		if (name) {
			// запрашиваем элементы в конкретной категории
			getCategoryItems();
		} else {
			// запрашиваем существующие категории в виде превью
			getPreview();
		}

		return () => dispatch(clearCategoryData());
	}, [location]);


	const getPreview = useCallback(() => {
		dispatch(recipeGetPreviewRecipies());
	}, [recipePreview, dispatch]);

	const getCategoryItems = useCallback(async () => {
		if (name) {
			dispatch(categoryGetCategoryName({ lat_name: name }));
			dispatch(recipeGetByCategory({ categoryName: name }));
		}
	}, [location, dispatch]);


	if (name) {
		outData = recipeInCategory?.map(categoryItem => ({
			...categoryItem,
			url: `/recipe/${categoryItem.caption_lat}`
		}));
	} else {
		outData = recipePreview?.map(category => ({
			...category,
			url: `category/${category.categoryname}`
		}));
	}


	console.log('categoryData.caption=', categoryData?.caption);

	return (
		<>
			<Helmet>
				<title>
					{
						!categoryLoading && name?.length > 0
							? categoryData?.caption
							: "Рецепты по категориям"
					}
				</title>
				<meta name="description" content="Recipes, Category of recipe one page"></meta>
			</Helmet>
			<MainWrapper image={name ? categoryData?.bg : bg}>

				<InnerItems backBtn={!!name} headerCaption={name ? categoryData.caption : 'Рецепты по категориям'} items={outData} loadStatus={loading} />

			</MainWrapper>
		</>
	);
}

export default Categories;
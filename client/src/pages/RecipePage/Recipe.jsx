import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { paths } from 'routes/helper';
import { Helmet } from 'react-helmet';


const Categories = lazy(() => import('pages/RecipePage/components/Categories'));


const RecipePage = () => {

	return (
		<>
			<Helmet>
				<meta name="description" content="Recipes, Category of recipes page"></meta>
			</Helmet>
			<Routes>

				<Route index element={<Categories />} />
				<Route path={paths.categorydetail} element={<Categories />} />

			</Routes>
		</>
	);
}

export default RecipePage;
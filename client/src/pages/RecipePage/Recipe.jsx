import React from 'react';
import { MainWrapper } from 'pages/pages.styled';
import bg from 'assets/img/blog/bg.jpg';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { paths } from 'routes/helper';


const Categories = lazy(() => import('pages/RecipePage/components/Categories'));


const RecipePage = () => {

	return (
		<>
			<MainWrapper image={bg}>

				<Routes>

					<Route index element={<Categories />} />
					<Route path={paths.categorydetail} element={<Categories />} />

				</Routes>


			</MainWrapper>
		</>
	);
}

export default RecipePage;
import { Page } from 'app.styled';
import Footer from 'blocks/Footer/Footer';
import Header from 'blocks/Header/Header';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import React from 'react';
import { lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { paths } from 'routes/helper';


const HomePage = lazy(() => import('pages/HomePage'));
const RecipePage = lazy(() => import('pages/RecipePage'));
const RecipeDetailPage = lazy(() => import('pages/RecipeDetailPage'));
const RecipeEditPage = lazy(() => import('pages/RecipeEditPage'));
const RecipeAddPage = lazy(() => import('pages/RecipeAddPage'));
const BlogPage = lazy(() => import('pages/BlogPage'));
const BlogEditPage = lazy(() => import('pages/BlogEditPage'));
const BlogDetailPage = lazy(() => import('pages/BlogDetailPage'));
const BlogAddPage = lazy(() => import('pages/BlogAddPage'));
const AboutPage = lazy(() => import('pages/AboutPage'));


const AppContent = () => {
	const location = useLocation();

	const isAuthPage = [paths.signin, paths.signup, paths.profile].includes(location.pathname);

	return (
		<>
			{(!isAuthPage) && <Header />}
			<Page>
				<Routes>
					<Route path={paths.home} element={<HomePage />} />
					<Route path={paths.recipe} element={<RecipePage />} />
					<Route path={paths.recipeedit} element={<RecipeEditPage />} />
					<Route path={paths.recipedetail} element={<RecipeDetailPage />} />
					<Route path={paths.recipeadd} element={<RecipeAddPage />} />
					<Route path={paths.blog} element={<BlogPage />} />
					<Route path={paths.blogedit} element={<BlogEditPage />} />
					<Route path={paths.blogdetail} element={<BlogDetailPage />} />
					<Route path={paths.blogadd} element={<BlogAddPage />} />

					<Route path={paths.about} element={<AboutPage />} />

					<Route path='*' element={<ErrorPage errCode={404} errDescription="Ресурс не найден" backBtn />} />
				</Routes>
			</Page>
			{(!isAuthPage) && <Footer />}

		</>
	);
}

export default AppContent;
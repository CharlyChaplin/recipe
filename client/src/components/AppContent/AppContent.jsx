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
const RecipeEditPage = lazy(() => import('pages/RecipeEditPage'));
const BlogPage = lazy(() => import('pages/BlogPage'));
const BlogEditPage = lazy(() => import('pages/BlogEditPage'));
const AboutPage = lazy(() => import('pages/AboutPage'));


const AppContent = () => {
	const location = useLocation();

	const isAuthPage = [paths.signin, paths.signup, paths.profile].includes(location.pathname);
	const errPage = ![paths.home, paths.recipe, paths.recipeedit, paths.blog, paths.blogedit, paths.about].includes(location.pathname);

	return (
		<>
			{(!isAuthPage && !errPage) && <Header />}
			<Page>
				<Routes>
					<Route path={paths.home} element={<HomePage />} />
					<Route path={paths.recipe} element={<RecipePage />} />
					<Route path={paths.recipeedit} element={<RecipeEditPage />} />
					<Route path={paths.blog} element={<BlogPage />} />
					<Route path={paths.blogedit} element={<BlogEditPage />} />
					<Route path={paths.about} element={<AboutPage />} />

					<Route path='*' element={<ErrorPage errCode={404} errDescription="Ресурс не найден" backBtn />} />
				</Routes>
			</Page>
			{(!isAuthPage && !errPage) && <Footer />}

		</>
	);
}

export default AppContent;
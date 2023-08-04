import React, { lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { checkPathMatch, paths } from './helper';

const HomePage = lazy(() => import('pages/HomePage'));
const SignIn = lazy(() => import('pages/AuthPage/SignIn'));
const SignUp = lazy(() => import('pages/AuthPage/SignUp'));
const Logout = lazy(() => import('pages/AuthPage/Logout'));
const RecipePage = lazy(() => import('pages/RecipePage'));
const RecipeEditPage = lazy(() => import('pages/RecipeEditPage'));
const BlogPage = lazy(() => import('pages/BlogPage'));
const BlogEditPage = lazy(() => import('pages/BlogEditPage'));
const AboutPage = lazy(() => import('pages/AboutPage'));


const PublicRoutes = () => {
	const location = useLocation();

	const isMatch = checkPathMatch(location.pathname, paths);

	return (
		<>
			<Routes>
				<Route path={paths.home} element={<HomePage />} />
				<Route path={paths.signin} element={<SignIn />} />
				<Route path={paths.signup} element={<SignUp />} />
				<Route path={paths.logout} element={<Logout />} />
				<Route path={paths.recipe} element={<RecipePage />} />
				<Route path={paths.recipeedit} element={<RecipeEditPage />} />
				<Route path={paths.blog} element={<BlogPage />} />
				<Route path={paths.blogedit} element={<BlogEditPage />} />
				<Route path={paths.about} element={<AboutPage />} />

				<Route path='*' element={!isMatch ? <Navigate to={paths.home} /> : null} />
			</Routes>
		</>
	);
}

export default PublicRoutes;
import React, { lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { checkPathMatch, paths } from './helper';

const ProfilePage = lazy(() => import('pages/ProfilePage'));


const PrivateRoutes = () => {
	const location = useLocation();

	const isMatch = checkPathMatch(location.pathname, paths);

	return (
		<>
			<Routes>
				<Route path={paths.profile} element={<ProfilePage />} />

				<Route path='*' element={!isMatch ? <Navigate to={paths.home} /> : null} />
			</Routes>
		</>
	);
}

export default PrivateRoutes;
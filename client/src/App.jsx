import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { paths } from 'routes/helper';
import Informer from 'components/Informer/Informer';
import da from 'init/utils/dynamicAdapt';
import FallbackSpinner from 'components/FallbackSpinner/FallbackSpinner';
import ProtectedRoute from 'components/ProtectedRoute';
import { userGetUser } from 'redux/slices/userSlice';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import AppContent from 'components/AppContent/AppContent';



const SignIn = lazy(() => import('pages/AuthPage/SignIn'));
const SignUp = lazy(() => import('pages/AuthPage/SignUp'));
const Logout = lazy(() => import('pages/AuthPage/Logout'));

const ProfilePage = lazy(() => import('pages/ProfilePage'));



const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userGetUser());

		// da.init();
	}, []);


	return (
		<>

			<Suspense fallback={<FallbackSpinner />}>
				<Routes>
					<Route path={paths.signin} element={<SignIn />} />
					<Route path={paths.signup} element={<SignUp />} />
					<Route path={paths.logout} element={<Logout />} />

					<Route element={<ProtectedRoute />}>
						<Route path={paths.profile} element={<ProfilePage />} />
					</Route>

					<Route path='*' element={
						<>
							<AppContent />
						</>
					} />
				</Routes>
			</Suspense>


			<Informer />
		</>
	);
}

export default App;
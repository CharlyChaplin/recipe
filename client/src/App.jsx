import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { paths } from 'routes/helper';
import Informer from 'components/Informer/Informer';
import da from 'init/utils/dynamicAdapt';
import FallbackSpinner from 'components/FallbackSpinner/FallbackSpinner';
import ProtectedRoute from 'components/ProtectedRoute';
import { userGetUser } from 'redux/slices/userSlice';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import AppContent from 'components/AppContent/AppContent';
import { getOfflineStatus } from 'redux/slices/infoSlice';
import axios from 'axiosSetup';
import { ServerDown } from 'app.styled';



const SignIn = lazy(() => import('pages/AuthPage/SignIn'));
const SignUp = lazy(() => import('pages/AuthPage/SignUp'));
const Logout = lazy(() => import('pages/AuthPage/Logout'));
const Activation = lazy(() => import('pages/AuthPage/Activation'));

const ProfilePage = lazy(() => import('pages/ProfilePage'));



const App = () => {
	const { showInformation } = useSelector(state => state.infoReducer);
	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(userGetUser());

		const pingTimer = setInterval(async () => {
			try {
				const resp = await axios.get('https://lexun.space/file/test');
				if (resp.data) dispatch(getOfflineStatus(false));
			} catch (error) {
				dispatch(getOfflineStatus(true));
			}

		}, 3000);

		() => clearInterval(pingTimer);
	}, []);


	return (
		<>
			{showInformation.isOffline && <ServerDown />}

			<Suspense fallback={<FallbackSpinner />}>
				<Routes>
					<Route path={paths.signin} element={<SignIn />} />
					<Route path={paths.signup} element={<SignUp />} />
					<Route path={paths.logout} element={<Logout />} />
					<Route path={paths.activation} element={<Activation />} />

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
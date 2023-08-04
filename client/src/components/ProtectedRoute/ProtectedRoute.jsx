import Spinner from 'components/Spinner/Spinner';
import React from 'react';
import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const ErrorPage = lazy(() => import('pages/ErrorPage'));

const ProtectedRoute = () => {
	const { isAuth, loading } = useSelector(state => state.userReducer);

	return (
		<>
			{
				isAuth
					? <Outlet />
					: loading
						? <Spinner />
						: <ErrorPage errCode={403} errDescription="User not Authorized" backBtn />
			}
		</>
	);
}

export default ProtectedRoute;
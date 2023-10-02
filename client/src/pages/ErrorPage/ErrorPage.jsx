import React, { useState } from 'react';
import { ErrorPageErrorButton, ErrorPageErrorCode, ErrorPageErrorDescription, ErrorPageMain, ErrorPageWrapper } from './styled';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';


const ErrorPage = ({ errCode, errDescription, backBtn }) => {
	const [isShow, setIsShow] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			setIsShow(true);
		}, 0);
	}, []);

	function goHome() {
		navigate('/');
	}

	return (
		<>
			<Helmet>
				<title>Упс...</title>
				<meta name="description" content="Recipes, Error page"></meta>
			</Helmet>
			<ErrorPageMain>
				<ErrorPageWrapper>
					<ErrorPageErrorCode>{isShow && errCode}</ErrorPageErrorCode>
					<ErrorPageErrorDescription>{isShow && errDescription}</ErrorPageErrorDescription>
					{
						isShow && backBtn && <ErrorPageErrorButton handleAction={goHome} />
					}
				</ErrorPageWrapper>
			</ErrorPageMain>
		</>
	);
}

export default ErrorPage;
import React, { useState } from 'react';
import { ErrorPageErrorButton, ErrorPageErrorCode, ErrorPageErrorDescription, ErrorPageMain, ErrorPageWrapper } from './styled';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


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
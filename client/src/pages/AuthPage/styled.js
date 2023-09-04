import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins";
import { rgba } from "polished";
import vars from "init/vars";
import { Link } from "react-router-dom";
import { Page } from "app.styled";



export const AuthPageMain = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	justify-content: center;
	position: fixed;
	overflow: auto;
	padding: ${rem(55)} 0;
`;

export const AuthPageContent = styled.div`
	max-width: ${rem(792)};
	height: 100%;
`;

export const AuthPageCaption = styled.div`
	font-family: "Giger", sans-serif;
	${adaptiveValue("font-size", 45, 45)};
	color: ${vars.whiteColor};
	letter-spacing: ${rem(1)};
	${adaptiveValue("margin-bottom", 43, 43)};
	text-align: center;
`;

export const AuthPageWrapper = styled.div`
	background-color: ${vars.dark};
	border: 1px solid ${rgba(vars.logoLight, .5)};
	border-radius: ${rem(20)};
	${adaptiveValue("padding-bottom", 113, 113)};
	${adaptiveValue("padding-top", 113, 113)};
	${adaptiveValue("padding-left", 178, 178)};
	${adaptiveValue("padding-right", 178, 178)};
`;

export const AuthPageLayer = styled.div`
	background: ${vars.adminLayer};
	border: 1px solid ${vars.dark};
	border-radius: ${rem(20)};
	width: 100%;
	${adaptiveValue("padding-bottom", 41, 41)};
	${adaptiveValue("padding-top", 41, 41)};
	${adaptiveValue("padding-left", 52, 52)};
	${adaptiveValue("padding-right", 52, 52)};
`;

export const AuthPageFormWrapper = styled.div`
	font-family: "RobotoRegular", sans-serif;
	${adaptiveValue("width", 332, 332)};
	span, a {
		${adaptiveValue("font-size", 16, 16)};
		color: ${vars.blackColor};
		letter-spacing: ${rem(1)};
	}
`;

export const AuthPageForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const AuthPageInputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${rem(36)};
	margin-bottom: ${rem(19)};
`;

export const AuthPageFormHaveAccount = styled(({ children, action, ...props }) => (
	<div {...props}>
		<span>{action === 'signin' ? "Нет аккаунта?" : "Уже зарегистрированы?"}</span>
		{
			action === 'signin'
				? <Link to="/user/signup">Создать</Link>
				: <Link to="/user/signin">Войти</Link>
		}
	</div>
))`
	text-align: center;
	margin-bottom: ${rem(30)};
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: ${rem(15)};
	
	a {
		color: ${vars.formHaveAccountColor};
	}
`;

export const AuthPageFormButtons = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: ${rem(20)};
`;
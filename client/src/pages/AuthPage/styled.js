import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins";
import { rgba } from "polished";
import vars from "init/vars";
import { Link } from "react-router-dom";



export const AuthPageMain = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: 1fr;
	justify-content: center;
	align-items: center;
	overflow: auto;
	padding: ${rem(10)};
	${adaptiveValue('padding-top', 80, 0)};
`;

export const AuthPageContent = styled.div`
	${adaptiveValue('max-width', 792, 792)};
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	${adaptiveValue("gap", 43, 18)};
	margin: 0 auto;
`;

export const AuthPageCaption = styled.div`
	font-family: "Giger", sans-serif;
	${adaptiveValue("font-size", 45, 27)};
	color: ${vars.whiteColor};
	letter-spacing: ${rem(1)};
	text-align: center;
`;

export const AuthPageWrapper = styled.div`
	background-color: ${vars.dark};
	border: ${rem(1)} solid ${rgba(vars.logoLight, .5)};
	width: 100%;
	${adaptiveValue("border-radius", 20, 10)};
	
	${adaptiveValue("padding-bottom", 113, 10, 0, 800, 320)};
	${adaptiveValue("padding-top", 113, 10, 0, 800, 320)};
	${adaptiveValue("padding-left", 178, 10, 0, 800, 320)};
	${adaptiveValue("padding-right", 178, 10, 0, 800, 320)};
`;

export const AuthPageLayer = styled.div`
	background: ${vars.adminLayer};
	border: ${rem(1)} solid ${vars.dark};
	${adaptiveValue("border-radius", 20, 10)};
	width: 100%;
	${adaptiveValue("padding-bottom", 41, 12, 0, 800, 320)};
	${adaptiveValue("padding-top", 41, 12, 0, 800, 320)};
	${adaptiveValue("padding-left", 52, 12, 0, 800, 320)};
	${adaptiveValue("padding-right", 52, 12, 0, 800, 320)};
`;

export const AuthPageFormWrapper = styled.div`
	font-family: "RobotoRegular", sans-serif;
	${adaptiveValue("min-width", 332, 240)};
	width: 100%;
	
	span, a {
		${adaptiveValue("font-size", 16, 13)};
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
	${adaptiveValue("gap", 36, 16)};
	${adaptiveValue("margin-bottom", 19, 10)};
`;

export const AuthPageFormHaveAccount = styled(({ children, action, ...props }) => (
	<div {...props}>
		<span>
			{
				action === 'signin' ? "Нет аккаунта?" : "Уже зарегистрированы?"
			}
		</span>
		{
			action === 'signin'
				? <Link to="/user/signup">Создать</Link>
				: <Link to="/user/signin">Войти</Link>
		}
	</div>
))`
	text-align: center;
	${adaptiveValue("margin-bottom", 30, 20)};
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	${adaptiveValue("gap", 15, 10)};
	
	a {
		color: ${vars.formHaveAccountColor};
	}
`;

export const AuthPageFormButtons = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	
	${adaptiveValue("gap", 20, 20)};
`;
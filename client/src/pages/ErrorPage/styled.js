import { styled } from "styled-components";
import Button from "components/Button";
import vars from "init/vars";
import { rgba } from "polished";
import { rem } from "init/mixins";


export const ErrorPageMain = styled.div`
	pointer-events: none;
	user-select: none;
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background: radial-gradient(circle, ${rgba(vars.errorPageRadialStart,1)} 0%, ${rgba(vars.errorPageRadialEnd,.7)} 100%);
`;

export const ErrorPageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: ${vars.text};
	row-gap: ${rem(20)};
`;

export const ErrorPageErrorCode = styled.div`
	font-family: "RobotoBold", sans-serif;
	font-size: ${rem(76)};
	letter-spacing: ${rem(5)};
	color: ${vars.errorPageErrorCode};
`;

export const ErrorPageErrorDescription = styled.div`
	font-family: "RobotoRegular", sans-serif;
	font-size: ${rem(20)};
	margin-bottom: ${rem(10)};
`;

export const ErrorPageErrorButton = styled(({ handleAction, ...props }) => (
	<div {...props}>
		<Button type="back" equalPadding action={handleAction}>На главную</Button>
	</div>
))`
	pointer-events: all;
`;
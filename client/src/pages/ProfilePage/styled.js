import { styled } from "styled-components";
import { adaptiveValue, em, rem } from "init/mixins";
import vars from "init/vars";
import { lighten, rgba } from "polished";


const ProfileLineWrapper = styled(({ children, ...props }) => {
	if (children) {
		return (
			<div {...props}>{children}</div>
		)
	}
})`
	width: 100%;
	border: ${rem(1)} solid ${vars.lightGreen};
	${adaptiveValue('border-radius', 10, 5)};
	${adaptiveValue('padding-top', 25, 10)};
	${adaptiveValue('padding-bottom', 25, 10)};
	${adaptiveValue('padding-left', 23, 8)};
	${adaptiveValue('padding-right', 23, 8)};
`;

export const ProfileMainWrapper = styled(({ children, activated, ...props }) => (
	<div {...props}>
		{
			!activated &&
			<span>
				Аккаунт не активирован.
				<br />
				Некоторый функционал недоступен
			</span>
		}
		{children}
	</div>
))`
	overflow: auto;
	display: flex;
	flex-direction: row;
	justify-content: center;
	
	>span {
		display: flex;
		position: fixed;
		left: 50%;
		transform: translate(-50%, 0%);
		top: 0;
		width: fit-content;
		margin: 0 auto;
		padding: ${rem(5)} ${rem(10)};
		box-shadow: ${rem(0)} ${rem(0)} ${rem(5)} ${rem(0)} ${rgba(vars.redColor, .5)};
		background-color: ${lighten(.2, vars.redColor)};
		font-family: "RobotoLight", sans-serif;
		color: ${vars.whiteColor};
		letter-spacing: ${rem(1)};
		line-height: 1.5;
		text-align: center;
		z-index: 10;
	}
`;

export const ProfileWrapper = styled.div`
	max-width: ${rem(950)};
	width: 100%;
	height: fit-content;
	display: flex;
	flex-direction: column;
	align-items: center;
	${adaptiveValue('gap', 55, 35)};
	${adaptiveValue('padding-top', 55, 25)};
	${adaptiveValue('padding-bottom', 55, 25)};
	${adaptiveValue('padding-left', 55, 5)};
	${adaptiveValue('padding-right', 55, 5)};
`;

export const ProfileCaption = styled(({ children, message, username, ...props }) => (
	<div {...props}>
		{message}
		<span>{username}</span>
		{children}
	</div>
))`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	font-family: "Giger", sans-serif;
	${adaptiveValue("gap", 26, 10)};
	${adaptiveValue("font-size", 45, 26)};
	text-align: center;
	color: ${vars.whiteColor};
	span {
		color: ${vars.accent};
	}
`;

export const ProfileActivateStatus = styled.div`
	${adaptiveValue('font-size', 16, 14)};
	color: ${lighten(.3, vars.redColor)};
	
`;

export const ProfileFormWrapper = styled.div`
	background: ${vars.adminLayer};
	border: ${rem(1)} solid ${vars.text};
	${adaptiveValue('border-radius', 20, 10)};
	display: flex;
	flex-direction: column;
	align-items: center;
	${adaptiveValue('padding-top', 25, 15)};
	${adaptiveValue('padding-bottom', 25, 15)};
	${adaptiveValue('padding-left', 25, 10)};
	${adaptiveValue('padding-right', 25, 10)};
	font-family: "RobotoRegular", sans-serif;
	width: 100%;
	position: relative;
`;

export const ProfileCurrentUser = styled.div`
	position: absolute;
	align-self: flex-end;
	color: ${vars.redColor};
	text-transform: uppercase;
	font-family: "RobotoLight", sans-serif;
	${adaptiveValue("font-size", 16, 14)};
	${adaptiveValue("letter-spacing", 2, 1)};
`;

export const ProfileForm = styled(({ children, ...props }) => (
	<form autoComplete="false" {...props}>{children}</form>
))`
	display: flex;
	flex-direction: column;
	align-items: center;
	${adaptiveValue("gap", 30, 20)};
	width: 100%;
	max-width: ${rem(534)};
	color: ${vars.text};
	${adaptiveValue("margin-top", 30, 40)};
	
	>div {
		&:last-child {
			${adaptiveValue("margin-top", 10, 20)};
		}
	}
`;

export const ProfileAvatar = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	${adaptiveValue("margin-bottom", 20, 10)};
`;

export const ProfileNickname = styled(ProfileLineWrapper)``;

export const ProfilePassword = styled(ProfileLineWrapper)`
	display: grid;
	grid-template-columns: auto 1fr;
	${adaptiveValue('gap', 10, 5)};
	width: 100%;
	align-items: center;
	border: ${rem(1)} solid ${vars.lightGreen};
	${adaptiveValue('border-radius', 10, 5)};
	${adaptiveValue('padding-top', 25, 10)};
	${adaptiveValue('padding-bottom', 25, 10)};
	${adaptiveValue('padding-left', 23, 8)};
	${adaptiveValue('padding-right', 23, 8)};
	
	span {
		&:nth-child(3) {
			height: 100%;
			${adaptiveValue('padding-top', 10, 7)};
			/* border: 1px solid #f00; */
			grid-row: 2 / 5;
		}
	}
`;

export const ProfilePasswordLabel = styled.span`
	${adaptiveValue("font-size", 16, 12)};
	color: ${vars.text};
	${adaptiveValue('letter-spacing', 1, 0)};
	white-space: nowrap;
	font-family: "RobotoRegular", sans-serif;
`;

export const ProfileActions = styled(ProfileLineWrapper)`
	display: flex;
	flex-direction: column;
	${adaptiveValue('gap', 30, 10)};
`;

export const ProfileActionItem = styled(ProfileLineWrapper)`
	user-select: none;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	${adaptiveValue('padding-top', 16, 8)};
	${adaptiveValue('padding-bottom', 16, 8)};
	${adaptiveValue('padding-left', 21, 11)};
	${adaptiveValue('padding-right', 21, 11)};
	border: ${rem(1)} solid ${lighten(.15, vars.lightGreen)};
	&:hover {
		background: linear-gradient(180deg, ${rgba(vars.darkGreen, .20)} 0%, ${rgba(vars.lightGreen, .20)} 51.04%, ${rgba(vars.darkGreen, .20)} 98.44%);
	}
`;

export const ProfileActionItemOperation = styled(ProfilePasswordLabel)`
	${adaptiveValue("font-size", 20, 18)};
`;

export const ProfileActionTasks = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: row;
	gap: ${rem(15)};
`;

export const ProfileButtons = styled.div`
	${adaptiveValue('margin-top', 15, 0)}
	display: flex;
	flex-direction: row;
	justify-content: center;
	${adaptiveValue('gap', 32, 16)};
`;
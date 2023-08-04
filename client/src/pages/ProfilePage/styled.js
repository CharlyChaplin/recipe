import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins";
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
	border: 1px solid ${vars.lightGreen};
	border-radius: ${rem(10)};
	padding: ${rem(25)} ${rem(23)};
`;

export const ProfileMainWrapper = styled(({ children, activated, ...props }) => (
	<div {...props}>
		{!activated && <span>Аккаунт не активирован</span>}
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
		box-shadow: 0px 0px 5px 0px ${rgba(vars.redColor, .5)};
		background-color: ${lighten(.2, vars.redColor)};
		font-family: "RobotoLight", sans-serif;
		color: ${vars.whiteColor};
		letter-spacing: ${rem(1)};
		z-index: 10;
	}
`;

export const ProfileWrapper = styled.div`
	width: ${rem(926)};
	height: fit-content;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${rem(55)};
	padding: ${rem(55)};
`;

export const ProfileCaption = styled(({ children, message, username, ...props }) => (
	<div {...props}>
		{message}&nbsp;
		<span>{username}</span>
		{children}
	</div>
))`
	display: flex;
	flex-direction: row;
	align-items: center;
	font-family: "Giger", sans-serif;
	${adaptiveValue("font-size", 45, 45)};
	letter-spacing: ${rem(1)};
	color: ${vars.whiteColor};
	span {
		color: ${vars.accent};
	}
`;

export const ProfileActivateStatus = styled.div`
	font-size: ${rem(16)};
	color: ${lighten(.3, vars.redColor)};
	
`;

export const ProfileFormWrapper = styled.div`
	background: ${vars.adminLayer};
	border: 1px solid ${vars.text};
	border-radius: ${rem(20)};
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: ${rem(25)};
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
	${adaptiveValue("font-size", 16, 16)};
	letter-spacing: ${rem(2)};
`;

export const ProfileForm = styled(({ children, ...props }) => (
	<form autoComplete="false" {...props}>{children}</form>
))`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${rem(20)};
	width: 100%;
	max-width: ${rem(534)};
	color: ${vars.text};
	margin-top: ${rem(30)};
`;

export const ProfileAvatar = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const ProfileNickname = styled(ProfileLineWrapper)``;

export const ProfilePassword = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	/* grid-auto-rows: auto; */
	gap: ${rem(10)};
	width: 100%;
	align-items: center;
	border: 1px solid ${vars.lightGreen};
	border-radius: ${rem(10)};
	padding: ${rem(25)} ${rem(23)};
`;



export const ProfilePasswordLabel = styled.div`
	${adaptiveValue("font-size", 16, 16)};
	color: ${vars.text};
	letter-spacing: ${rem(1)};
	white-space: nowrap;
	font-family: "RobotoRegular", sans-serif;
`;

export const ProfileActions = styled(ProfileLineWrapper)`
	display: flex;
	flex-direction: column;
	gap: ${rem(30)};
`;


export const ProfileActionItem = styled(ProfileLineWrapper)`
	user-select: none;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: ${rem(16)} ${rem(21)};
	border: 1px solid ${lighten(0.15, vars.lightGreen)};
	&:hover {
		background: linear-gradient(180deg, ${rgba(100, 112, 89, 0.20)} 0%, ${rgba(139, 152, 127, 0.20)} 51.04%, ${rgba(100, 112, 89, 0.20)} 98.44%);
	}
`;

export const ProfileActionItemOperation = styled(ProfilePasswordLabel)`
	${adaptiveValue("font-size", 20, 20)};
`;

export const ProfileActionTasks = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: row;
	gap: ${rem(15)};
`;


export const ProfileButtons = styled.div`
	margin-top: ${rem(15)};
	display: flex;
	flex-direction: row;
	gap: ${rem(32)};
`;
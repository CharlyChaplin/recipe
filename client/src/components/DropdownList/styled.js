import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins.js";
import vars from "init/vars.js";
import { rgba } from "polished";

const radius = rem(7);



export const Dropdown = styled.div`
	.collapsing {
		display: block;
	}
	.collapse:not(.collapse_show) {
		display: none;
	}
	.collapse_show {}
`;

export const DropdownBody = styled(({ buttonDeleteIcon, buttonEditIcon, buttonActionPosition, children, ...props }) => {
	return (
		<div {...props}>
			{children}
		</div>
	)
})`
	display: flex;
	flex-direction: ${({ buttonActionPosition }) => buttonActionPosition || 'row'};
	justify-content: space-between;
	${({ buttonDeleteIcon, buttonEditIcon }) => (buttonDeleteIcon || buttonEditIcon)
		? `${adaptiveValue('gap', 77, 10)}`
		: `${adaptiveValue('gap', 0, 0)}`
	};
	${({ buttonActionPosition }) => buttonActionPosition === 'row'
		? `${adaptiveValue('gap', 77, 10)}`
		: `${adaptiveValue('gap', 15, 10)}`
	};
	width: 100%;
`;

export const DropdownControl = styled(({ children, position, ...props }) => {
	return (<div {...props}>
		{children}
	</div>)
})`
	display: flex;
	flex-direction: ${({ position }) => position && position === 'column' ? 'column' : 'row'};
	align-items: ${({ position }) => position && position === 'column' ? 'flex-start' : 'center'};
	${adaptiveValue('gap', 15, 5)};
	width: 100%;
`;

export const DropdownLabel = styled(({ position, children, ...props }) => (
	<span {...props}>{children}</span>
))`
	margin-left: ${({ position }) => position && position === 'row' ? 0 : rem(5)};
	font-family: "RobotoRegular", sans-serif;
	${adaptiveValue("font-size", 16, 12)};
	color: ${vars.text};
	white-space: nowrap;
`;

export const DropdownWrapper = styled.div`
	width: fit-content;
	width: calc(100% - 31px);
	border: ${rem(1)} solid ${vars.lightGreen};
	z-index: 1;
	position: relative;
	border-top-left-radius: ${radius};
	border-bottom-left-radius: ${radius};
	
	&.opened {
		border-bottom-left-radius: 0;
		input {
			border-bottom-left-radius: 0;
		}
		svg {
			transform: rotate(0deg);
		}
	}
	&.closing {
		border-bottom-left-radius: 0;
		input {
			border-bottom-left-radius: 0;
		}
	}
`;

export const DropdownDropbox = styled(({ minWidth, children, ...props }) => {

	return (
		<div {...props}>{children}</div>
	)
})`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	gap: ${rem(20)};
	width: 100%;
	input {
		display: block;
		width: fit-content;
		width: 100%;
		min-width: ${({ minWidth }) => rem(minWidth) || 'unset'};
		height: 100%;
		padding: ${rem(5)} ${rem(10)};
		font-family: "RobotoRegular", sans-serif;
		${adaptiveValue("font-size", 16, 14)};
		cursor: pointer;
		position: relative;
		color: ${vars.text};
		border-top-left-radius: ${radius};
		border-bottom-left-radius: ${radius};
		
		&::placeholder {
			color: ${vars.placeholderColor};
			${adaptiveValue("font-size", 16, 14)};
		}
		&:focus {
			outline: none;
		}
	}
`;

export const DropdownListt = styled.ul`
	position: absolute;
	left: 0;
	top: ${rem(32)};
	width: 100%;
	max-height: ${rem(157)};
	overflow: auto;
	padding: 0;
	cursor: pointer;
	background-color: ${vars.whiteColor};
	outline: 1px solid ${vars.lightGreen};
	transition: all 0.25s ease 0s;
	${adaptiveValue("font-size", 18, 18)};
	border-bottom-left-radius: ${radius};
	border-bottom-right-radius: ${radius};
`;

export const DropdownListitem = styled(({ children, noItems, ...props }) => (
	<li {...props}>{children}</li>
))`
	user-select: 'none';
	pointer-events: ${({ noItems }) => noItems ? 'none' : 'all'};
	padding: ${rem(8)};
	color: ${({ noItems }) => noItems ? vars.placeholderColor : vars.text};
	font-family: "RobotoRegular", sans-serif;
	${adaptiveValue('font-size', 16, 14)};
	margin-bottom: ${rem(0)};
	
	&:hover {
		background-color: ${({ noItems }) => noItems ? vars.placeholderColor : rgba(vars.logoLight, .75)};
	}
`;

export const DropdownInputWrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: ${rem(37)};
	overflow: hidden;
`;

export const DropdownIcon = styled.div`
	position: absolute;
	top: 0;
	right: ${rem(-32)};
	width: ${rem(31)};
	height: 100%;
	background-color: ${vars.whiteColor};
	padding: ${rem(5)};
	outline: 1px solid ${vars.lightGreen};
	cursor: pointer;
	transition: all 0.25s ease 0s;
	border-top-right-radius: ${radius};
	border-bottom-right-radius: ${radius};
	&:focus {
		outline: 1px solid ${vars.lightGreen};
	}
	&:hover {
		svg {
			stroke: ${vars.lightGreen};
			path {
				fill: ${vars.whiteColor};
			}
		}
	}
	svg {
		transition: all 0.25s ease 0s;
		transform: rotate(180deg);
		height: 100%;
		width: 100%;
		path {
			transition: all 0.25s ease 0s;
		}
	}
`;

export const DropdownButtons = styled(({ buttonActionPosition, children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: ${rem(11)};
	margin-bottom: ${rem(1)};
	align-self: ${({ buttonActionPosition }) => buttonActionPosition === 'row' ? 'flex-end' : 'flex-start'};
`;



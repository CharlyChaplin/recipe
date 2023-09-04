import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins";
import vars from "init/vars";
import { PlaceholderText } from "./components/ExamplePlaceholder/styled";
import { lighten, rgba } from "polished";



export const SearchMainForm = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
`;

export const SearchMainFormInputWrapper = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	width: 100%;
	${adaptiveValue('border-radius', 20, 10)};
	border: ${rem(2)} solid ${vars.darkGreen};
	overflow: hidden;
`;

export const SearchMainFormPlaceholderBox = styled(({ children, showSearch, ...props }) => (
	<label {...props}>{children}</label>
))`
	position: relative;
	font-family: "RalewayRegular", sans-serif;
	${adaptiveValue("font-size", 18, 12)};
	display: block;
	box-shadow: ${rem(1)} ${rem(2)} ${rem(10)} ${rem(0)} ${rgba(vars.blackColor, .75)};
	
	input {
		line-height: calc(33 / 24);
		width: 100%;
		${adaptiveValue("font-size", 20, 14)};
		${adaptiveValue("padding-top", 8, 5)};
		${adaptiveValue("padding-bottom", 8, 5)};
		${adaptiveValue("padding-left", 25, 8)};
		${adaptiveValue("padding-right", 105, 70)};
		pointer-events: none;
		display: flex;
		flex-direction: row;
		align-items: center;
		outline: none;
		border-top-right-radius: ${({ showSearch }) => showSearch ? 0 : vars.borderRadiusSearchInput};
		border-bottom-right-radius: ${({ showSearch }) => showSearch ? 0 : vars.borderRadiusSearchInput};
		&:invalid + ${PlaceholderText} {
			display: block;
		}
	}
`;

export const SearchMainFormClear = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	${adaptiveValue('width', 28, 15)};
	${adaptiveValue('height', 28, 15)};
	position: absolute;
	${adaptiveValue('right', 70, 40)};
	top: 50%;
	transform: translate(0%, -50%);
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	
	&:hover {
		svg {
			fill: ${vars.lightGreen};
		}
	}
		
	svg {
		width: 100%;
		height: 100%;
		transition: all 0.25s ease 0s;
		fill: ${rgba(vars.lightGreen, .5)};
	}
`;

export const SearchMainFormButton = styled(({ children, showSearch, ...props }) => (
	<div {...props}>{children}</div>
))`
	background-color: ${vars.searchMainFormBackcolor};
	${adaptiveValue("width", 60, 35)};
	height: 100%;
	position: absolute;
	right: 0;
	top: 0;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border-top-right-radius: ${({ showSearch }) => showSearch ? 0 : 'unset'};
	border-bottom-right-radius: ${({ showSearch }) => showSearch ? 0 : 'unset'};
	svg {
		${adaptiveValue("width", 22, 16)};
		${adaptiveValue("height", 22, 16)};
		fill: ${vars.text};
		transition: all 0.25s ease 0s;
	}
	&:hover {
		svg {
			fill: ${lighten(.15, vars.dark)};
		}
	}
`;
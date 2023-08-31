import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins";
import vars from "init/vars";
import { PlaceholderText } from "./components/ExamplePlaceholder/styled";
import { rgba } from "polished";



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
	border-radius: ${rem(20)};
	border: ${rem(2)} solid ${vars.darkGreen};
	overflow: hidden;
`;

export const SearchMainFormPlaceholderBox = styled(({ children, showSearch, ...props }) => (
	<label {...props}>{children}</label>
))`
	position: relative;
	font-family: "RalewayRegular", sans-serif;
	${adaptiveValue("font-size", 18, 18)};
	display: block;
	box-shadow: ${rem(1)} ${rem(2)} ${rem(10)} ${rem(0)} ${rgba(vars.blackColor, .75)};
	
	input {
		line-height: calc(33 / 24);
		width: 100%;
		${adaptiveValue("font-size", 20, 20)};
		${adaptiveValue("padding-top", 8, 8)};
		${adaptiveValue("padding-bottom", 8, 8)};
		${adaptiveValue("padding-left", 25, 25)};
		${adaptiveValue("padding-right", 105, 105)};
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
	width: ${rem(28)};
	height: ${rem(28)};
	position: absolute;
	right: ${rem(70)};
	top: 0;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	height: 100%;
	
	&:hover {
		svg {
			fill: ${vars.lightGreen};
		}
	}
		
	svg {
		transition: all 0.25s ease 0s;
		scale: 1.5;
		fill: ${rgba(vars.lightGreen, .5)};
	}
`;

export const SearchMainFormButton = styled(({ children, showSearch, ...props }) => (
	<div {...props}>{children}</div>
))`
	background-color: ${vars.searchMainFormBackcolor};
	${adaptiveValue("width", 60, 60)};
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
		width: ${rem(22)};
		height: ${rem(22)};
		fill: ${vars.text};
	}
	&:hover
		svg {
			fill: ${vars.dark};
		}
`;
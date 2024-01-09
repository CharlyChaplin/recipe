import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins";
import { InnerWrapper } from "pages/pages.styled";
import vars from "init/vars";

export const MainHeader = styled(({ children, color = vars.text, ...props }) => {
	return (
		<h1 {...props}>
			{children}
		</h1>
	)
})`
	font-family: "Giger", sans-serif;
	${adaptiveValue('font-size', 45, 30)};
	line-height: 1.2;
	letter-spacing: ${rem(2)};
	width: fit-content;
	margin: 0;
	padding: 0;
	color: ${({ color }) => color && color || vars.text};
	text-align: center;
`;

export const InnerWrapperForMain = styled(InnerWrapper)`
	${adaptiveValue("padding-top", 105, 25)};
	${adaptiveValue("padding-left", 105, 10)};
	${adaptiveValue("padding-right", 105, 10)};
`;

export const SearchBar = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	width: 100%;
	margin-bottom: ${rem(40)};
`;

export const QuotationWrapper = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	margin-bottom: ${rem(25)};
	align-self: flex-end;
`;

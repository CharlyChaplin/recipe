import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins";
import { InnerWrapper } from "pages/pages.styled";


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

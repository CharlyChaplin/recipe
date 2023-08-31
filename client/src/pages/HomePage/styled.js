import { styled } from "styled-components";
import { rem } from "init/mixins";
import { InnerWrapper } from "pages/pages.styled";


export const InnerWrapperForMain = styled(InnerWrapper)`
	padding-left: ${rem(105)};
	padding-right: ${rem(105)};
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

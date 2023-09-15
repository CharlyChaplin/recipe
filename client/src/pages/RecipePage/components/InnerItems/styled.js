import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins";
import { ContentWrapper, InnerWrapper } from "pages/pages.styled";


export const InnerWrapperForCategories = styled(InnerWrapper)`
	${adaptiveValue("gap", 50, 20)};
	${adaptiveValue("padding-top", 30, 20)};
`;


export const ContentWrapperForCategories = styled(ContentWrapper)`
	grid-template-columns: repeat(auto-fit, minmax(${rem(150)}, ${rem(200)}));
	max-width: 90%;
	${adaptiveValue("row-gap", 50, 20)};
`;
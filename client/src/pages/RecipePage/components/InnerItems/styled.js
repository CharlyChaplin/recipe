import { styled } from "styled-components";
import { rem } from "init/mixins";
import { ContentWrapper } from "pages/pages.styled";


export const ContentWrapperForCategories = styled(ContentWrapper)`
	grid-template-columns: repeat(auto-fit, minmax(${rem(150)}, ${rem(200)}));
	max-width: 90%;
`;
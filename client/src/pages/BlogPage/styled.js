import { styled } from "styled-components";
import { ContentWrapper } from "pages/pages.styled";
import { adaptiveValue, em } from "init/mixins";


export const ContentWrapperForBlog = styled(ContentWrapper)`
	${adaptiveValue("padding-top", 50, 30)};
	${adaptiveValue("padding-bottom", 50, 30)};
	
	${adaptiveValue("padding-left", 60, 20, 1, 1390, 950)};
	${adaptiveValue("padding-right", 60, 20, 1, 1390, 950)};
	
	${adaptiveValue("padding-left", 30, 5, 1, 530, 320)};
	${adaptiveValue("padding-right", 30, 5, 1, 530, 320)};
	
	${adaptiveValue("margin-left", 20, 5)};
	${adaptiveValue("margin-right", 20, 5)};
	
	${adaptiveValue("gap", 50, 20, 1, 1390, 950)};
	
	@media (max-width: ${em(949.99)}){
		grid-template-columns: 1fr;
	}
`;
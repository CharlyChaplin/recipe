import { styled } from "styled-components";
import { adaptiveValue, em, rem } from "init/mixins";
import vars from "init/vars";
import { AddWrapper } from "../styled";


export const AddWrapperCategory = styled(AddWrapper)`
	${adaptiveValue('gap', 50, 25)};
	@media (max-width: ${em(800)}){
		flex-direction: column;
	}
`;

export const AddWrapperCategorySidePart = styled.div`
	flex: 0 1 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${rem(10)};
	align-self: center;
`;

export const AddCategoryPhoto = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: column;
	align-items: center;
	${adaptiveValue('gap', 10, 5)};
	
	span {
		font-family: "RobotoRegular", sans-serif;
		letter-spacing: ${rem(1)};
		color: ${vars.text};
	}
	
	@media (max-width: ${em(800)}){
		align-self: center;
	}
`;
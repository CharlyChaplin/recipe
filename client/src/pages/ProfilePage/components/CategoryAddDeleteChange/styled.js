import { styled } from "styled-components";
import { rem } from "init/mixins";
import vars from "init/vars";
import { AddWrapper } from "../styled";


export const AddWrapperCategory = styled(AddWrapper)`
	gap: ${rem(50)};
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
	gap: ${rem(10)};
	
	span {
		font-family: "RobotoRegular", sans-serif;
		letter-spacing: ${rem(1)};
		color: ${vars.text};
	}
`;
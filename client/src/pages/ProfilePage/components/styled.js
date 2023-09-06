import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins.js";
import vars from "init/vars.js";


export const AddWrapper = styled(({ verticalcenter, ...props }) => (
	<div {...props}></div>
))`
	display: flex;
	flex-direction: row;
	align-items: ${({ verticalcenter }) => verticalcenter ? 'center' : 'flex-end'};
	${adaptiveValue('gap', 10, 5)};
`;

export const HorizontalLine = styled.hr`
	width: 100%;
	height: ${rem(1)};
	background-color: ${vars.whiteColor};
`;

export const ModalContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	${adaptiveValue('gap', 15, 7)};
`;
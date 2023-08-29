import { styled } from "styled-components";
import { rem } from "init/mixins.js";
import vars from "init/vars.js";


export const AddWrapper = styled(({ verticalcenter, ...props }) => (
	<div {...props}></div>
))`
	display: flex;
	flex-direction: row;
	align-items: ${({ verticalcenter }) => verticalcenter ? 'center' : 'flex-end'};
	gap: ${rem(10)};
`;

export const HorizontalLine = styled.hr`
	width: 100%;
	height: ${rem(1)};
	background-color: ${vars.whiteColor};
`;

export const ModalContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${rem(15)};
`;
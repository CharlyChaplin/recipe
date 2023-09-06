import { keyframes, styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins.js";
import { rgba } from "polished";
import vars from "init/vars.js";

//========================================================================================================================================================
const appear = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;
const slideIn = keyframes`
	from {
		transform: translateY(${rem(-100)});
	}
	to {
		transform: translateY(0);
	}
`;
//========================================================================================================================================================

export const ModalWrapper = styled(({ children, onClose = () => { }, ...props }) => (
	<div onClick={onClose} {...props}>{children}</div>
))`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	z-index: 9999;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: ${rgba(0, 0, 0, 0.75)};
	animation: ${appear} 0.25s ease-in-out;
	user-select: none;
`;

export const ModalDialog = styled(({ children, ...props }) => (
	<div onClick={e => e.stopPropagation()} {...props}>{children}</div>
))`
	background: ${vars.adminLayer};
	position: relative;
	margin: 0 ${rem(5)};
	display: flex;
	${adaptiveValue('gap', 60, 30)};
	flex-direction: column;
	align-items: center;
	overflow: auto;
	height: 100%;
	box-shadow: 0 ${rem(4)} ${rem(8)} 0 ${rgba(0, 0, 0, 0.2)}, 0 ${rem(6)} ${rem(20)} 0 ${rgba(0, 0, 0, 0.19)};
	animation: ${slideIn} 0.3s ease-in-out;
	${adaptiveValue('border-radius', 20, 10)};
	${adaptiveValue('padding-top', 50, 20)};
	${adaptiveValue('padding-bottom', 50, 20)};
	${adaptiveValue('padding-left', 70, 10)};
	${adaptiveValue('padding-right', 70, 10)};
`;

export const ModalHeader = styled.div`
	text-align: center;
`;

export const ModalBody = styled.div`
	border: 1px solid ${vars.lightGreen};
	border-radius: 10px;
	
	${adaptiveValue('padding-top', 15, 7)};
	${adaptiveValue('padding-bottom', 15, 7)};
	${adaptiveValue('padding-left', 20, 10)};
	${adaptiveValue('padding-right', 20, 10)};
	width: 100%;
`;

export const ModalContent = styled.div`
	
`;

export const ModalButtons = styled.div`
	display: flex;
	flex-direction: row;
	gap: ${rem(32)};
`;
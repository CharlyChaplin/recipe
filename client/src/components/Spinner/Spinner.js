import { keyframes, styled } from "styled-components";
import { rem } from "init/mixins";
import vars from "init/vars";

//========================================================================================================================================================
const spiner = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;
//========================================================================================================================================================


const Spinner = styled(({ height, sizeIncrease, ...props }) => (
	<div {...props}></div>
))`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${({height}) => height ? rem(height) : rem(16)};
	height: ${({height}) => height ? rem(height) : rem(16)};
	transform: scale(${({sizeIncrease}) => sizeIncrease ? sizeIncrease : 1});
	&:after {
		content: " ";
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2px solid ${vars.whiteColor};
		border-color: ${vars.accent} transparent ${vars.accent} transparent;
		animation: ${spiner} 1s linear infinite;
	}
`;


export default Spinner;
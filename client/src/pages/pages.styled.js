import { styled } from "styled-components";
import { rem } from "init/mixins";
import vars from "init/vars";
import { rgba } from "polished";


export const MainWrapper = styled(({children, image, ...props}) => (
	<div {...props}>
		{children}
	</div>
))`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	height: 100%;
	padding: ${rem(55)};
	border-radius: ${rem(30)};
	overflow: hidden;
	position: relative;
	z-index: 0;
	background: url(${({image}) => image ? image : null}) 0 0 no-repeat;
	background-size: cover;
	background-repeat: no-repeat;
	color: ${vars.whiteColor};
`;

export const Overlay = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: ${rgba(vars.overlay, .85)};
	z-index: -1;
`;
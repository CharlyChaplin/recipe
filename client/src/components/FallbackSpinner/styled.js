import Spinner from "components/Spinner";
import vars from "init/vars";
import { rgba } from "polished";
import { styled } from "styled-components";


export const FallbackWrapper = styled.div`
	z-index: 10000;
	width: 100vw;
	height: 100%;
	background-color: ${rgba(vars.whiteColor, .15)};
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	${Spinner} {
		transform: scale(5);
	}
`;
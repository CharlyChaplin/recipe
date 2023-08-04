import { styled } from "styled-components";
import { rgba } from "polished";
import vars from "init/vars";
import { rem } from "init/mixins";



export const Page = styled(({children, ...props}) => (
	<main {...props}>
		{children}
	</main>
))`
	flex: 1 1 auto;
	padding: ${rem(0)} ${rem(7)};
	/* position: relative;
	width: 100%;
	overflow: hidden; */
	background-color: ${vars.dark};
`;

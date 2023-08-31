import { styled } from "styled-components";
import { adaptiveValue } from "init/mixins";
import vars from "init/vars";



export const SearchMainFormDesc = styled(({ text, ...props }) => (
	<div {...props}>
		<span>{text}</span>
	</div>
))`
	font-family: "RobotoLight", sans-serif;
	${adaptiveValue("font-size", 16, 11)};
	${adaptiveValue("letter-spacing", 4, 0)};
	color: ${vars.whiteColor};
	${adaptiveValue("margin-bottom", 8, 5)};
	${adaptiveValue("margin-left", 24, 17)};
`;

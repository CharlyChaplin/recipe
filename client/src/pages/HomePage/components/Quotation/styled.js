import { styled } from "styled-components"
import { adaptiveValue, rem } from "init/mixins";
import vars from "init/vars";
import { rgba } from "polished";



export const Quote = styled.div`
	position: relative;
	font-family: "NewStandardOld", sans-serif;
	${adaptiveValue("max-width", 376, 300)};
	
	&::before, &::after {
		content: '\\201C';
		font-weight: 400;
		position: absolute;
		${adaptiveValue("font-size", 44, 30)};
		color: ${vars.quoteColor};
	}
	
	&::before {
		${adaptiveValue("left", -30, -20)};
		${adaptiveValue("top", -20, -10)};
	}
	
	&::after {
		content: '\\201D';
		${adaptiveValue("right", -20, -15)};
		${adaptiveValue("bottom", -45, -30)};
	}
`;

export const QuoteWrapper = styled.div`
	${adaptiveValue("padding-top", 5, 5)};
	${adaptiveValue("padding-bottom", 5, 5)};
	${adaptiveValue("padding-left", 20, 10)};
	${adaptiveValue("padding-right", 20, 10)};
	background-color: ${rgba(vars.adminLayer, .9)};
	${adaptiveValue("border-radius", 21, 21)};
	overflow: hidden;
	box-shadow: ${rem(0)} ${rem(0)} ${rem(2)} ${rem(2)} ${vars.darkGreen};
`;

export const QuotePhrase = styled(({ text, ...props }) => (
	<div {...props}>{text}</div>
))`
	font-weight: 700;
	${adaptiveValue("font-size", 20, 16)};
	${adaptiveValue("line-height", 25, 20)};
	${adaptiveValue("letter-spacing", 2, 1)};
	color: ${vars.text};
	text-align: center;
`;

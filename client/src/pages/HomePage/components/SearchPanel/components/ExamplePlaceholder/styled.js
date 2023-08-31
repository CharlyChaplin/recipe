import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins";
import { rgba } from "polished";
import vars from "init/vars";


export const PlaceholderText = styled(({ text, children, ...props }) => (
	<div {...props}>
		{text}
		{children}
	</div>
))`
	${adaptiveValue("left", 25, 15)};
	display: none;
	width: 100%;
	position: absolute;
	top: calc(50% + 0px);
	transform: translate(0%, -50%);
	color: ${rgba(vars.text, .5)};
	cursor: text;
	user-select: none;
	white-space: nowrap;
	
	
`;

export const Example = styled(({ text, ...props }) => (
	<span {...props}>{text}</span>
))`
	pointer-events: auto;
	letter-spacing: ${rem(2)};
	border-bottom: ${rem(1)} dashed ${rgba(vars.text, 0.7)};
	font-weight: bold;
	cursor: pointer;
	transition: all 0.25s ease 0s;
	
	&:hover {
		color: ${rgba(vars.text, .6)};
		border-bottom: ${rem(1)} dotted ${rgba(vars.text, .7)};
	}
`;
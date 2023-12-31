import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins.js";
import vars from "init/vars.js";
import { darken, lighten, rgba } from "polished";


export const AvatarBlockPlaceholder = styled(({ text, size, ...props }) => (
	<div {...props}>
		{text}
	</div>
))`
	pointer-events: none;
	user-select: none;
	font-family: "RobotoRegular", sans-serif;
	${({ size }) =>
		adaptiveValue("font-size", size ? size * 0.15 : 12, size ? size * 0.15 : 12)
	};
	letter-spacing: ${rem(1)};
	color: ${rgba(vars.text, .5)};
	opacity: .5;
	line-height: ${({ size }) => size ? rem(size * 0.25) : rem(20)};
	position: absolute;
	text-align: center;
	transition: all 0.25s ease 0s;
	width: 100%;
`;

export const AvatarBlock = styled(({ labelPos, children, ...props }) => (
	<div {...props}>{children}</div>
))`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: ${({ labelPos }) => labelPos || 'row'};
	align-items: center;
	${adaptiveValue('gap', 15, 10)};
`;

export const AvatarLabel = styled(({ labelVerticalPos, labelText, fontSize, ...props }) => (
	<span {...props}>{labelText}</span>
))`
	font-family: "RobotoRegular", sans-serif;
	font-size: ${({ fontSize }) => `${adaptiveValue('font-size', fontSize, 12)}`};
	letter-spacing: ${rem(1)};
	line-height: 1.3;
	color: ${vars.text};
	text-align: center;
	order: ${({ labelVerticalPos }) => labelVerticalPos === 'top' ? 0 : 1};
`;

export const AvatarBlockWrapper = styled(({ children, size, ...props }) => (
	<div {...props}>
		{children}
	</div>
))`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	width: ${({ size }) => size ? rem(size) : '100%'};
	height: ${({ size }) => size ? rem(size) : '100%'};
	cursor: pointer;
	border-radius: 50%;
	border: ${rem(1)} solid ${rgba(vars.lightGreen, .75)};
	box-shadow: ${rem(0)} ${rem(0)} ${rem(2)} ${vars.lightGreen};
	transition: all 0.25s ease 0s;
	&:hover {
		border: ${rem(1)} solid ${rgba(vars.lightGreen, 1)};
	}
	&:hover ${AvatarBlockPlaceholder} {
		color: ${rgba(vars.darkGreen, 1)};
	}
`;

export const AvatarBlockImage = styled(({ children, imgOrSvg, ...props }) => {
	return (
		<div {...props}> {children}</div>
	)

})`
	position: absolute;
	background: ${vars.adminLayer};
	width: 100%;
	height: 100%;
	border-radius: 50%;
	overflow: hidden;
	opacity: ${({ imgOrSvg }) => imgOrSvg ? 1 : .25};
	display: flex;
	align-items: center;
	justify-content: center;
	
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	svg {
		width: 100%;
		height: 100%;
		fill: red;
	}
`;

export const AvatarLoadingView = styled(({ children, ...props }) => (
	<div {...props}>
		{children}
	</div>
))`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: ${darken(.2, vars.lightGreen)};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	${adaptiveValue('gap', 30, 15)};
	
	div {
		font-family: sans-serif;
		color: ${vars.whiteColor};
	}
`;
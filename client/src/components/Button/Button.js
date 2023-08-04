import styled from "styled-components";
import { adaptiveValue, rem } from "init/mixins.js";
import vars from "init/vars.js";
import { darken, lighten, rgba } from "polished";
import { ReactComponent as BackICO } from 'assets/img/icons/back.svg';




const Button = styled(({
	children,
	mode = '',				// 'dangerIco'
	type = 'common',		// common | back | dark
	disabled,
	equalPadding,
	action = () => { },
	...props
}) => {
	return (
		<button
			type='button'
			disabled={disabled}
			onClick={action}
			{...props}
		>
			{type === 'back' && <BackICO />}
			{children}
		</button>
	)
})`
	user-select: none;
	// pointer-events: ${p => p.disabled ? 'none' : 'auto'};
	cursor: ${p => p.disabled ? 'not-allowed' : 'pointer'};
	width: fit-content;
	background: ${p => p.disabled
		? vars.buttonDisabledColor
		: p.type === 'back'
			? rgba(vars.darkGreen, .25)
			: p.type === 'dark'
				? `linear-gradient(180deg, ${rgba(vars.buttonTopBottomDarkColor, 0.85)} 0%, ${rgba(vars.dark, 0.85)} 50%, ${rgba(vars.buttonTopBottomDarkColor, 0.85)} 100%)`
				: `linear-gradient(180deg, ${vars.buttonTopColor} 0%, ${vars.buttonBottomColor} 100%)`
	} ;
	border: 1px solid ${vars.darkGreen};
	border-radius: ${p => p.type === 'back' ? rem(12) : rem(5)};
	overflow: hidden;
	text-align: center;
	font-family: ${p => p.type === 'back' ? 'RalewayRegular' : 'RobotoRegular'}, sans-serif;
	${adaptiveValue("font-size", 16, 16)};
	line-height: 1;
	letter-spacing: ${rem(2)};
	color: ${p => p.type === 'back' ? vars.whiteColor : vars.whiteColor};
	padding: ${p => p.equalPadding ? rem(8) : `${rem(8)} ${rem(20)}`};
	text-shadow: ${p => p.type !== 'back' ? `${rem(2)} ${rem(2)} ${rem(4)} ${rgba(vars.blackColor, 0.25)}` : {}} ;
	transition: background 0.25s ease 0s;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: ${rem(10)};
	outline: none;
	
	svg {
		width: ${rem(20)};
		height: ${rem(20)};
		fill: ${p => p.type === 'back' ? vars.lightGreen : vars.text};
		transition: all 0.25s ${vars.cubic} 0s;
	}
	
	&:hover {
		background: ${({ type, disabled }) =>
		disabled
			? vars.buttonDisabledColor
			: type === 'dark'
				? `linear-gradient(180deg, ${darken(.05, rgba(vars.buttonTopBottomDarkColor, 0.85))} 0%, ${darken(.05, rgba(vars.dark, 0.85))} 50%, ${darken(.05, rgba(vars.buttonTopBottomDarkColor, 0.85))} 100%)`
				: type === 'back'
					? `linear-gradient(180deg, ${darken(.1, vars.buttonTopColor)} 0%, ${darken(.1, vars.buttonBottomColor)} 100%)`
					: `linear-gradient(180deg, ${darken(.1, vars.buttonTopColor)} 0%, ${darken(.1, vars.buttonBottomColor)} 100%)`};
		
		svg {
			scale: ${({ type, disabled }) => (
				disabled
					? 1
					: type === 'back'
						? 1
						: 1.25
			)};
			fill: ${({ equalPadding, mode, disabled }) => (
				disabled
					? vars.text
					: equalPadding && mode === 'dangerIco'
						? lighten(.35, vars.redColor)
						: mode === 'back'
							? 'none'
							: vars.accent)};
		}
	}

	&:active {
		// margin-top: 2px;
		// margin-left: 1px;
	}
`;


export default Button;
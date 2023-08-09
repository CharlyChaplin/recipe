import { createGlobalStyle } from 'styled-components';
import Vars from './vars.js';
import GigerWoff from '../assets/fonts/Giger.woff';
import GigerWoff2 from '../assets/fonts/Giger.woff2';
import NewStandardOldWoff from '../assets/fonts/NewStandardOld.woff';
import NewStandardOldWoff2 from '../assets/fonts/NewStandardOld.woff2';
import RalewayRegularWoff from '../assets/fonts/RalewayRegular.woff';
import RalewayRegularWoff2 from '../assets/fonts/RalewayRegular.woff2';
import RalewaySemiBoldWoff from '../assets/fonts/RalewaySemiBold.woff';
import RalewaySemiBoldWoff2 from '../assets/fonts/RalewaySemiBold.woff2';
import RalewayBoldWoff from '../assets/fonts/RalewayBold.woff';
import RalewayBoldWoff2 from '../assets/fonts/RalewayBold.woff2';
import RobotoLightWoff from '../assets/fonts/RobotoLight.woff';
import RobotoLightWoff2 from '../assets/fonts/RobotoLight.woff2';
import RobotoRegularWoff from '../assets/fonts/RobotoRegular.woff';
import RobotoRegularWoff2 from '../assets/fonts/RobotoRegular.woff2';
import { adaptiveValue, rem } from './mixins.js';
import { darken, rgba } from 'polished';

const fonts = `
@font-face{
	font-family: Giger;
	font-display: swap;
	src: url(${GigerWoff2}) format("woff2"), url(${GigerWoff}) format("woff");
	font-weight: 400;
	font-style: normal;
}
@font-face{
	font-family: NewStandardOld;
	font-display: swap;
	src: url(${NewStandardOldWoff2}) format("woff2"), url(${NewStandardOldWoff}) format("woff");
	font-weight: 400;
	font-style: normal;
}
@font-face{
	font-family: RalewayRegular;
	font-display: swap;
	src: url(${RalewayRegularWoff2}) format("woff2"), url(${RalewayRegularWoff}) format("woff");
	font-weight: 400;
	font-style: normal;
}
@font-face{
	font-family: RalewaySemiBold;
	font-display: swap;
	src: url(${RalewaySemiBoldWoff2}) format("woff2"), url(${RalewaySemiBoldWoff}) format("woff");
	font-weight: 400;
	font-style: normal;
}
@font-face{
	font-family: RalewayBold;
	font-display: swap;
	src: url(${RalewayBoldWoff2}) format("woff2"), url(${RalewayBoldWoff}) format("woff");
	font-weight: 400;
	font-style: normal;
}
@font-face{
	font-family: RobotoLight;
	font-display: swap;
	src: url(${RobotoLightWoff2}) format("woff2"), url(${RobotoLightWoff}) format("woff");
	font-weight: 400;
	font-style: normal;
}
@font-face{
	font-family: RobotoRegular;
	font-display: swap;
	src: url(${RobotoRegularWoff2}) format("woff2"), url(${RobotoRegularWoff}) format("woff");
	font-weight: 400;
	font-style: normal;
}
`

export let mainContainer = '';

if (Vars.maxWidthContainer > 0) {
	mainContainer += `
		max-width: ${rem(Vars.containerWidth)};
		margin: 0 auto
	`
};
if (Vars.containerPadding > 0) {
	if (Vars.maxWidthContainer > 0) {
		mainContainer += `padding: 0 ${rem(Vars.containerPadding / 2)}`
	} else {
		mainContainer += `
			${adaptiveValue("padding-left", Vars.containerPadding / 2, 15)};
			${adaptiveValue("padding-right", Vars.containerPadding / 2, 15)}
		`
	}
};

const InitStyle = createGlobalStyle`

	${fonts}
	
	#root {
		min-height: 100%;
		height: 100%;
		width: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, ${rgba(Vars.buttonTopBottomDarkColor, 0.85)} 0%, ${rgba(Vars.dark, 0.85)} 51.04%, ${rgba(Vars.buttonTopBottomDarkColor, 0.85)} 98.44%);
	}
	
	// Обнуляющие стили
	* {
		padding: 0px;
		margin: 0px;
		border: 0px;
	}
	
	*, *:before, *:after {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	
	*:focus, *:active {
		/* outline: none; */
	}
	
	a:focus, a:active {
		outline: none;
	}
	
	aside, nav, footer, header, section {
		display: block;
	}
	
	html, body {
		height: 100%;
	}
	
	html {
		font-family: sans-serif;
	}
	
	body {
		line-height: 1;
		text-rendering: geometricPrecision;
		-ms-text-size-adjust: 100%;
		-moz-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
	}
	
	input::-ms-clear {
		display: none;
	}
	
	button {
		cursor: pointer;
	}
	
	button::-moz-focus-inner {
		padding: 0;
		border: 0;
	}
	
	a, a:visited {
		text-decoration: none;
	}
	
	a:hover {
		text-decoration: none;
	}
	
	ul li {
		list-style: none;
	}
	
	img {
		vertical-align: top;
	}
	
	h1, h2, h3, h4, h5, h6 {
		font-weight: inherit;
		font-size: inherit;
	}
	
	
	
	/* width */
	&::-webkit-scrollbar {
		width: ${rem(10)};
	}
	/* The track NOT covered by the handle.*/
	&::-webkit-scrollbar-track-piece {
		background: ${rgba(Vars.darkGreen, .25)};
		border-radius: ${rem(5)};
	}
	/* button */
	&::-webkit-scrollbar-button {
		background: transparent;
	}
	/* Handle */
	&::-webkit-scrollbar-thumb {
		background: ${darken(.25, Vars.lightGreen)};
		border-radius: ${rem(10)};
	}
	/* Handle on hover */
	&::-webkit-scrollbar-thumb:hover {
		background: ${rgba(Vars.accent, .5)};
	}
	/* Track */
	&::-webkit-scrollbar-track {
		/* box-shadow: inset ${rem(0)} ${rem(0)} ${rem(5)} ${Vars.redColor}; */
		/* border-radius: ${rem(10)}; */
	}
	/* Corner */
	&::-webkit-scrollbar-corner {
		/* background: ${Vars.redColor}; */
	}
	/* Resizer */
	&::-webkit-resizer {
		background: ${Vars.redColor};
	}
`;

export default InitStyle;
import { styled } from "styled-components";
import { ContentWrapper, MainWrapper } from 'pages/pages.styled';
import { adaptiveValue, rem } from "init/mixins";
import { rgba } from "polished";
import vars from "init/vars";


export const MainWrapperChangedForBlogDetail = styled(MainWrapper)`
	overflow: hidden;
	
`;

export const ContentWrapperChangedForBlogDetail = styled(ContentWrapper)`
	max-width: ${rem(850)};
	display: flex;
	flex-direction: column;
	align-items: center;
	${adaptiveValue("padding", 35, 7)};
	${adaptiveValue("padding-top", 35, 15)};
	${adaptiveValue("margin-left", 20, 5)};
	${adaptiveValue("margin-right", 20, 5)};
	color: ${vars.text};
	font-family: "RobotoRegular", sans-serif;
	font-size: ${rem(17)};
	gap: ${rem(18)};
	margin-top: ${rem(50)};
`;

export const BlogDetailTop = styled(({ dateadd, owner, ...props }) => (
	<header {...props}>
		<time>{dateadd}</time>
		<span></span>
		<div>{owner}</div>
	</header>
))`
	display: flex;
	flex-direction: row;
	font-family: "RobotoRegular", sans-serif;
	font-size: ${rem(16)};
	color: ${rgba(vars.text, .5)};
	line-height: calc(18.75 / 16);
	transition: all 0.25s ease 0s;
	padding: ${rem(6)} ${rem(18)};
	border-radius: ${rem(7)};
	border-top: ${rem(1)} solid ${rgba(vars.text, .25)};
	border-bottom: ${rem(1)} solid ${rgba(vars.text, .25)};
	span {
		margin: 0 ${rem(10)};
		height: ${rem(16)};
		width: ${rem(1)};
		background-color: ${vars.text};
	}
`;

export const BlogDetailPhoto = styled(({ image, imageAltText, ...props }) => (
	<div {...props}>
		<img src={image} alt={imageAltText} />
	</div>
))`
	border: ${rem(1)} solid ${vars.lightGreen};
	border-radius: ${rem(10)};
	box-shadow: ${rem(2)} ${rem(4)} ${rem(2)} ${rem(0)} ${rgba(vars.blackColor, .30)};
	overflow: hidden;
	margin-bottom: ${rem(7)};
	max-width: ${rem(250)};
	max-height: ${rem(136)};
	width: ${rem(250)};
	height: ${rem(136)};
	img {
		width: 100%;
	}
`;

export const BlogDetailCaption = styled(({ text, ...props }) => (
	<div {...props}>
		{text}
	</div>
))`
	color: ${vars.text};
	font-family: "RalewayRegular", sans-serif;
	font-size: ${rem(32)};
	letter-spacing: ${rem(3.2)};
	margin-bottom: ${rem(15)};
	position: relative;
	
	&::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: ${rem(-5)};
		background-color: ${vars.text};
		height: ${rem(2)};
		width: 100%;
	}
`;

export const BlogTextWrapper = styled(({ content, ...props }) => (
	<div {...props}>
		<article>{content}</article>
	</div>
))`
	background-color: ${rgba(vars.whiteColor, .25)};
	border: ${rem(2)} solid ${rgba(vars.lightGreen, .5)};
	border-radius: ${rem(5)};
	padding: ${rem(16)};
	width: 100%;
	text-align: justify;
	color: ${vars.text};
	font-family: sans-serif;
	line-height: 1.4;
	letter-spacing: ${rem(.9)};
	
	article {
		text-indent: ${rem(25)};
		hyphens: auto;
		white-space: pre-line;
	}
`;
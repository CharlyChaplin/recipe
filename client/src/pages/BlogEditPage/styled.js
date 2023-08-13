import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins";
import { ContentWrapper } from "pages/pages.styled";
import vars from "init/vars";
import { rgba } from "polished";


export const ContentWrapperChangedForBlogEdit = styled(ContentWrapper)`
	width: fit-content;
	display: flex;
	flex-direction: column;
	align-items: center;
	${adaptiveValue("padding", 35, 35)};
	color: ${vars.text};
	font-family: "RobotoRegular", sans-serif;
	font-size: ${rem(17)};
	gap: ${rem(18)};
`;

export const BlogEditTop = styled(({ children, ...props }) => (
	<header {...props}>
		{children}
	</header>
))`
	display: flex;
	flex-direction: row;
	align-items: center;
	font-family: "Roboto", sans-serif;
	font-size: ${rem(16)};
	color: ${rgba(vars.text, .5)};
	line-height: calc(18.75 / 16);
	transition: all 0.25s ease 0s;
	padding: ${rem(6)} ${rem(18)};
	border-radius: ${rem(7)};
	border-top: ${rem(1)} solid ${rgba(vars.text, .25)};
	border-bottom: ${rem(1)} solid ${rgba(vars.text, .25)};
`;

export const Divisor = styled(({ ...props }) => (
	<span {...props}></span>
))`
	margin: 0 ${rem(10)};
	height: ${rem(16)};
	width: ${rem(1)};
	background-color: ${vars.text};
`;

export const BlogEditPhoto = styled(({ image, imageAltText, ...props }) => (
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

export const BlogEditCaption = styled(({ children, ...props }) => (
	<div {...props}>
		{children}
	</div>
))`
	color: ${vars.text};
	font-family: "RalewayRegular", sans-serif;
	font-size: ${rem(32)};
	letter-spacing: ${rem(3.2)};
	margin-bottom: ${rem(15)};
`;

export const BlogEditTextWrapper = styled(({ children, ...props }) => (
	<div {...props}>
		<article>{children}</article>
	</div>
))`
	/* display: flex; */
	/* align-items: center; */
	/* justify-content: center; */
	background-color: ${rgba(vars.whiteColor, .25)};
	border: ${rem(2)} solid ${rgba(vars.lightGreen, .5)};
	border-radius: ${rem(5)};
	padding: ${rem(16)};
	max-width: ${rem(646)};
	min-width: ${rem(600)};
	width: 100%;
	min-height: ${rem(263)};
	text-align: justify;
	color: ${vars.text};
	font-family: sans-serif;
	line-height: 1.4;
	letter-spacing: ${rem(.9)};
	
	article {
		display: flex;
		text-indent: ${rem(25)};
		hyphens: auto;
		height: 100%;
		width: 100%;
		min-height: 100%;
		
		textarea {
			height: 100%;
		}
	}
`;

export const BlogEditButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: ${rem(20)};
`;

export const BlogEditNotEdit = styled(({ data, isCaption, ...props }) => (
	<div {...props}>{data}</div>
))`
	font-family: "RobotoRegular", sans-serif;
	font-size: ${({isCaption}) => isCaption ? rem(32) : rem(16)};
	color: ${vars.text};
`;
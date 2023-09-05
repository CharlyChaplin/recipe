import { styled } from "styled-components";
import { adaptiveValue, em, rem } from "init/mixins";
import { ContentWrapper } from "pages/pages.styled";
import vars from "init/vars";
import { rgba } from "polished";


export const ContentWrapperChangedForBlogEdit = styled(ContentWrapper)`
	max-width: ${rem(1200)};
	display: flex;
	flex-direction: column;
	align-items: center;
	${adaptiveValue("padding", 35, 5)};
	${adaptiveValue("padding-top", 35, 10)};
	${adaptiveValue("padding-bottom", 35, 10)};
	${adaptiveValue("margin-left", 20, 5)};
	${adaptiveValue("margin-right", 20, 5)};
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
	${adaptiveValue('font-size', vars.fz, 14)};
	${adaptiveValue('gap', 0, 10)};
	color: ${rgba(vars.text, .5)};
	line-height: calc(18.75 / 16);
	transition: all 0.25s ease 0s;
	${adaptiveValue('padding-top', 6, 5)};
	${adaptiveValue('padding-bottom', 6, 5)};
	${adaptiveValue('padding-left', 18, 9)};
	${adaptiveValue('padding-right', 18, 9)};
	border-radius: ${rem(7)};
	border-top: ${rem(1)} solid ${rgba(vars.text, .25)};
	border-bottom: ${rem(1)} solid ${rgba(vars.text, .25)};
	
	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		gap: ${rem(5)};
		
		span {
			color: ${rgba(vars.darkGreen, .75)};
			white-space: nowrap; 
		}
	}
	
	@media (max-width: ${em(700)}){
		flex-direction: column;
		
		div {
			/* flex-direction: column; */
		}
	}
`;

export const Divisor = styled(({ ...props }) => (
	<span {...props}></span>
))`
	margin: 0 ${rem(20)};
	height: ${rem(16)};
	width: ${rem(1)};
	background-color: ${vars.text};
	
	@media (max-width: ${em(700)}){
		display: none;
	}
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
	background-color: ${rgba(vars.whiteColor, .25)};
	border: ${rem(2)} solid ${rgba(vars.lightGreen, .5)};
	border-radius: ${rem(5)};
	${adaptiveValue('padding-top', 16, 5)};
	${adaptiveValue('padding-bottom', 16, 5)};
	${adaptiveValue('padding-left', 16, 5)};
	${adaptiveValue('padding-right', 16, 5)};
	max-width: ${rem(646)};
	width: 100%;
	min-height: ${rem(400)};
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
			width: 100%
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
import { styled } from "styled-components";
import { AddPhotoBlock, ContentWrapper, InnerWrapper } from "pages/pages.styled";
import { adaptiveValue, em, rem } from "init/mixins";
import vars from "init/vars";
import { rgba } from "polished";
import { RecipeCookingTextWrapper, RecipeLeft, RecipeMiniCaption } from "pages/RecipeEditPage/styled";


export const InnerWrapperChangedForRecipeDetail = styled(InnerWrapper)`
	${adaptiveValue("padding-left", 30, 10)};
	${adaptiveValue("padding-right", 30, 10)};
`;

export const ContentWrapperChangedForRecipeDetail = styled(ContentWrapper)`
	max-width: ${rem(1200)};
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	${adaptiveValue("padding-top", 20, 20)};
	${adaptiveValue("padding-bottom", 35, 35)};
	${adaptiveValue("padding-left", 35, 35)};
	${adaptiveValue("padding-right", 35, 35)};
	color: ${vars.text};
	font-family: "RobotoRegular", sans-serif;
	font-size: ${rem(17)};
	gap: ${rem(40)};
	margin-top: ${rem(100)};
`;

export const RecipeDetailTop = styled.div`
	align-self: flex-end;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: ${rem(6)};
	font-family: "RobotoLight", sans-serif;
	color: ${rgba(vars.text, .6)};
`;

export const RecipeShowPhotoBlock = styled(AddPhotoBlock)`
	min-width: ${rem(160)};
	max-width: ${rem(213)};
	
	@media (max-width: ${em(860)}){
		 max-width: unset;
	}
	
	@media (max-width: ${em(479.98)}) {
		height: fit-content;
	}
`;

export const RecipeShowCaption = styled(({ text, ...props }) => (
	<div {...props}>{text}</div>
))`
	font-family: "RalewaySemiBold", sans-serif;
	${adaptiveValue("font-size", 24, 16)};
	color: ${vars.text};
	text-transform: uppercase;
	text-shadow: ${rem(1)} ${rem(2)} ${rem(4)} ${rgba(vars.blackColor, 0.25)};
	text-align: center;
	${adaptiveValue("letter-spacing", 3, 1)};
	line-height: calc(${(vars.fz + 5) / vars.fz});
`;

export const RecipeShowShortDescription = styled.div`
	font-family: "RalewayRegular", sans-serif;
	${adaptiveValue("font-size", vars.fz, 13)};
	color: ${vars.text};
	line-height: calc(${(vars.fz + 2) / vars.fz});
	letter-spacing: ${rem(1)};
	hyphens: auto;
	text-align: justify;
	text-indent: ${rem(20)};
`;

export const RecipeShowLeft = styled(RecipeLeft)`
	gap: ${rem(50)};
`;

export const RecipeShowMiniCaption = styled(RecipeMiniCaption)`
	margin-left: 0;
	position: relative;
	&::after {
		content: '';
		background-color: ${vars.text};
		height: ${rem(1)};
		width: 100%;
		position: absolute;
		left: 0;
		bottom: ${rem(-3)};
	}
`;

export const RecipeShowIngredientsWrapper = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	padding-left: ${rem(15)};
	ul {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: ${rem(10)};
		letter-spacing: ${rem(0.5)};
	}
`;

export const RecipeShowCookingTextWrapper = styled(RecipeCookingTextWrapper)`
	gap: ${rem(25)};
	align-items: flex-start;
`;

export const RecipeCookingTextCaption = styled(RecipeMiniCaption)`
	align-self: center;
	text-shadow: ${rem(1)} ${rem(2)} ${rem(4)} ${rgba(vars.blackColor, .25)};
	font-size: ${rem(24)};
	padding: ${rem(10)} ${rem(12)};
	border-radius: ${rem(15)};
	border: ${rem(1)} solid ${rgba(vars.lightGreen, .5)};
	background-color: ${rgba(vars.lightGreen, .15)};
	overflow: hidden;
	margin-left: 0;
`;

export const RecipeShowCookingText = styled.div`
	font-family: "RobotoLight", sans-serif;
	line-height: calc(${(vars.fz + (vars.fz * 0.5)) / vars.fz});
	text-align: justify;
	hyphens: auto;
	color: ${vars.text};
	text-indent: ${rem(30)};
	letter-spacing: ${rem(1.5)};
`;
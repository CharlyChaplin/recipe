import { styled } from "styled-components";
import { adaptiveValue, em, rem } from "init/mixins";
import vars from "init/vars";
import { AddPhotoBlock, ContentWrapper } from "pages/pages.styled";
import { rgba } from "polished";



export const ContentWrapperChangedForRecipeEdit = styled(ContentWrapper)`
	max-width: ${rem(1200)};
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	${adaptiveValue("padding", 35, 10)};
	color: ${vars.text};
	font-family: "RobotoRegular", sans-serif;
	font-size: ${rem(17)};
	gap: ${rem(40)};
`;

export const RecipeEditTop = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: ${rem(40)};
	${adaptiveValue('gap', 40, 10)};
	${adaptiveValue('font-size', vars.fz, 13)};
	
	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		${adaptiveValue('gap', 10, 2)};
		
		span {
			color: ${rgba(vars.text, .75)};
			white-space: nowrap; 
		}
	}
	
	@media (max-width: ${em(768)}) {
		flex-direction: column;
	}
`;

export const RecipeWrapper = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	${adaptiveValue("gap", 60, 50, 0, 1390, 860)};
	width: 100%;
	position: relative;
	&:after {
		content: '';
		position: absolute;
		top: 0;
		left: calc(50% - 1px);
		height: 100%;
		width: ${rem(1)};
		background-color: ${vars.adminLayer};
		box-shadow: ${rem(0)} ${rem(4)} ${rem(4)} ${rem(0)} ${rgba(vars.darkGreen, 0.25)} inset;
	}
	
	@media (max-width: ${em(992)}) {
		flex-direction: column;
		justify-content: center;
		&:after {
			display: none;
		}
	}
`;

export const RecipeLeft = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	flex: 0 1 50%;
	display: flex;
	flex-direction: column;
	${adaptiveValue("gap", 40, 50)};
	width: 100%;
`;

export const RecipeRight = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	flex: 0 1 50%;
	display: flex;
	flex-direction: column;
	min-height: ${rem(300)};
	height: 100%;
	width: 100%;
	${adaptiveValue("gap", 30, 15, 0, 1390, 860)};
	
	@media (max-width: ${em(992)}) {
		flex: 1 1 auto;
	}
`;

export const RecipeLeftTopWrapper = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	${adaptiveValue("gap", 35, 15, 0, 1390, 860)};
	
	@media (max-width: ${em(992)}) {
		justify-content: space-evenly;
		width: 100%;
		${adaptiveValue("gap", 15, 30, 0, 860, 320)};
	}
	@media (max-width: ${em(479.98)}) {
		flex-direction: column;
	}
`;

export const AddPhotoBlockForRecipe = styled(AddPhotoBlock)`
	flex: 0 1 50%;
`;

export const RecipeLeftTopTextWrapper = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	flex: 0 0 50%;
	display: flex;
	flex-direction: column;
	${adaptiveValue("gap", 20, 15, 3, 1390, 860)};
	width: 100%;
	
	@media (max-width: ${em(860)}) {
		max-width: ${rem(300)};
		flex: unset;
	}
`;

export const RecipeMiniCaption = styled(({ text, noMargin, ...props }) => (
	<div {...props}>{text}</div>
))`
	font-family: "RalewayBold", sans-serif;
	font-weight: bold;
	${adaptiveValue('font-size', 20, 18)};
	${adaptiveValue('letter-spacing', 1, 0)};
	text-transform: uppercase;
	line-height: 1.2;
	color: ${vars.text};
	
	${({ noMargin }) => noMargin
		? 'margin-left: 0;'
		: `${adaptiveValue('margin-left', 5, 10)};`};
`;

export const RecipeIngredientsWrapper = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	${adaptiveValue('gap', 23, 10)};
`;

export const RecipeCookingTextWrapper = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${rem(15)};
`;

export const RecipeCookingText = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	width: 100%;
	height: 100%;
	
	textarea {
		font-family: sans-serif;
		${adaptiveValue('font-size', vars.fz, 16)};
		letter-spacing: ${rem(1)};
	}
`;

export const RecipeEditButtonWrapper = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: ${rem(30)};
`;
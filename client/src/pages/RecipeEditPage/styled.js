import { adaptiveValue, em, rem } from "init/mixins";
import vars from "init/vars";
import { RecipeBlockContentWrapper } from "pages/pages.styled";
import { AddPhotoBlock, ContentWrapper } from "pages/pages.styled";
import { rgba } from "polished";
import { styled } from "styled-components";



export const ContentWrapperChangedForRecipeEdit = styled(ContentWrapper)`
	max-width: ${rem(1200)};
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	${adaptiveValue("padding", 35, 35)};
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
	
	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		gap: ${rem(10)};
		
		span {
			color: ${rgba(vars.darkGreen, .75)};
			white-space: nowrap; 
		}
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
	
	@media (max-width: ${em(860)}) {
		flex-direction: column;
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
	${adaptiveValue("gap", 40, 15, 0, 1390, 860)};
`;

export const RecipeRight = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	flex: 0 1 50%;
	display: flex;
	flex-direction: column;
	height: 100%;
	${adaptiveValue("gap", 30, 15, 0, 1390, 860)};
`;

export const RecipeLeftTopWrapper = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	${adaptiveValue("gap", 35, 15, 0, 1390, 860)};
	
	@media (max-width: ${em(860)}) {
		${adaptiveValue("gap", 35, 15, 0, 860, 320)};
		justify-content: center;
		${adaptiveValue("gap", 15, 5, 0, 860, 320)};
	}
	@media (max-width: ${em(479.98)}) {
		flex-direction: column;
	}
`;

export const AddPhotoBlockForRecipe = styled(AddPhotoBlock)`
	/* flex: 0 1 50%; */
`;

export const RecipeLeftTopTextWrapper = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	flex: 0 0 50%;
	display: flex;
	flex-direction: column;
	${adaptiveValue("gap", 17, 7, 3, 1390, 860)};
`;

export const RecipeMiniCaption = styled(({ text, ...props }) => (
	<div {...props}>{text}</div>
))`
	font-family: "RalewayBold", sans-serif;
	font-weight: bold;
	font-size: ${rem(20)};
	letter-spacing: ${rem(1)};
	text-transform: uppercase;
	color: ${vars.text};
	margin-left: ${rem(20)};
`;

export const RecipeIngredientsWrapper = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	gap: ${rem(23)};
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
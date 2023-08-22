import { adaptiveValue, rem } from "init/mixins";
import vars from "init/vars";
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
	gap: ${rem(18)};
`;

export const RecipeEditTop = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: ${rem(40)};
`;

export const RecipeWrapper = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	gap:${rem(60)};
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
`;

export const RecipeLeft = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	flex: 0 1 50%;
	display: flex;
	flex-direction: column;
	gap: ${rem(40)};
`;

export const RecipeRight = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	flex: 0 1 50%;
	display: flex;
	flex-direction: column;
	border: 1px solid #f00;
`;

export const RecipeLeftTopWrapper = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: ${rem(35)};
`;

export const AddPhotoBlockForRecipe = styled(AddPhotoBlock)`
	flex: 0 1 50%;
`;

export const RecipeLeftTopTextWrapper = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	flex: 0 1 50%;
	display: flex;
	flex-direction: column;
	gap: ${rem(17)};
`;

export const RecipeIngredientsWrapper = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	
`;

export const RecipeMiniCaption = styled(({ text, ...props }) => (
	<div {...props}>{text}</div>
))`
	font-family: "RalewayBold", sans-serif;
	font-weight: bold;
	font-size: ${rem(20)};
	letter-spacing: 110%;
	text-transform: uppercase;
	color: ${vars.text};
`;

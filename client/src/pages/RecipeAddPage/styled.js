import { styled } from "styled-components";
import { adaptiveValue, em, rem } from "init/mixins";
import { AddPhotoBlockForRecipe, RecipeEditTop } from "pages/RecipeEditPage/styled";
import vars from "init/vars";
import { EditNotEdit, InnerWrapper, RecipeBlockContentWrapper } from "pages/pages.styled";
import { lighten, rgba } from "polished";




export const InnerWrapperChangedForRecipeAdd = styled(InnerWrapper)`
	${adaptiveValue("padding-left", 20, 10)};
	${adaptiveValue("padding-right", 20, 10)};
`;

export const RecipeAddTop = styled(RecipeEditTop)`
	color: ${lighten(.2, vars.text)};
	${adaptiveValue('column-gap', 60, 20, 1, 1390, 768)};
	${adaptiveValue('row-gap', 15, 5, 1, 768.99, 320)};
	${EditNotEdit} {
		color: ${lighten(.2, vars.text)};
	}
	
	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: ${rem(8)};
		
		span {
			color: ${lighten(.4, vars.text)};
		}
	}
	
	@media (max-width: ${em(768)}) {
		flex-direction: row;
	}
		
	@media (max-width: ${em(480)}) {
		flex-direction: column;
	}
`;

export const AddPhotoBlockForRecipeAdd = styled(AddPhotoBlockForRecipe)`
	${adaptiveValue('height', 150, 100)};
`;

export const RecipeBlockContentWrapperForIngredients = styled(RecipeBlockContentWrapper)`
	display: flex;
	flex-direction: column;
	${adaptiveValue('gap', 15, 7)};
	
	button {
		align-self: flex-start;
		box-shadow: ${rem(2)} ${rem(2)} ${rem(5)} ${rem(0)} ${rgba(vars.blackColor, .3)};
	}
	
	hr {
		width: 90%;
		height: ${rem(1)};
		background-color: ${rgba(vars.adminLayer, .5)};
	}
`;

export const RecipeIngredientsItemsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${rem(5)};
	max-height: ${rem(296)};
	overflow: auto;
	${adaptiveValue("padding-right", 10, 5)};
`;
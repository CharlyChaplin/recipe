import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins";
import { RecipeEditTop } from "pages/RecipeEditPage/styled";
import vars from "init/vars";
import { EditNotEdit, RecipeBlockContentWrapper } from "pages/pages.styled";
import { lighten, rgba } from "polished";


export const RecipeAddTop = styled(RecipeEditTop)`
	align-self: flex-end;
	/* gap: ${rem(50)}; */
	color: ${lighten(.2, vars.text)};
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
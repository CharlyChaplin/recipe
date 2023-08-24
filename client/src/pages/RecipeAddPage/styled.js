import { styled } from "styled-components";
import { rem } from "init/mixins";
import { RecipeEditTop } from "pages/RecipeEditPage/styled";
import vars from "init/vars";
import { EditNotEdit } from "pages/pages.styled";
import { lighten } from "polished";


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
import { styled } from "styled-components";
import { rem } from "init/mixins";
import vars from "init/vars";
import { darken, lighten } from "polished";


export const IngredientShowListItem = styled(({ children, image, ...props }) => (
	<li {...props}>
		{
			image ? image : null
		}
		{children}
	</li>
))`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: ${rem(12)};
	font-family: "RobotoLight", sans-serif;
	line-height: calc(${(vars.fz + 2) / vars.fz});
	background-color: ${({ image }) => image ? 'none' : lighten(0, vars.lightGreen)};
	border-radius: ${({ image }) => image ? 0 : rem(5)};
	padding: ${({image}) => image ? 0 : `${rem(3)} ${rem(5)}`};
	color: ${({image}) => image ? 'unset' : darken(.1, vars.whiteColor)};
	
	img {
		max-width: ${rem(16)}
	}
`;
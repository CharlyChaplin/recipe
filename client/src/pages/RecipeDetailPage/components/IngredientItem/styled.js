import { rem } from "init/mixins";
import vars from "init/vars";
import { styled } from "styled-components";


export const IngredientShowListItem = styled(({ children, image, ...props }) => (
	<li {...props}>
		{
			image ? <img src={image} alt="" /> : null
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
	
	img {
		max-width: ${rem(16)}
	}
`;
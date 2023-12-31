import { styled } from "styled-components";
import { rem } from "init/mixins";


export const IngredientItemWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: ${rem(10)};
	justify-content: space-between;
	
	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: ${rem(5)};
		font-size: ${rem(12)};
		width: 100%;
	}
	
	span {
		white-space: nowrap;
	}
`;
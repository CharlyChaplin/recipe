import { styled } from "styled-components";
import { rem } from "init/mixins.js";

export const Block = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${rem(15)};
`;
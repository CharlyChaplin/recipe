import { rem } from "init/mixins";
import { styled } from "styled-components";

export const BlogWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${rem(50)};
	border: 1px solid #f00;
`;


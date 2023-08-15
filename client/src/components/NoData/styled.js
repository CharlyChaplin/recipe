import { styled } from "styled-components";
import { rem } from "init/mixins";
import vars from "init/vars";


export const NoDataWrapper = styled(({ children, ...props }) => (
	<div {...props}>
		{children}
	</div>
))`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: ${rem(40)};
`;

export const NoDataIcon = styled(({ children, ...props }) => (
	<div {...props}>
		{children}
	</div>
))`
	width: ${rem(100)};
	height: ${rem(100)};
	
	svg {
		width: 100%;
	}
`;

export const NoDataText = styled(({ text, ...props }) => (
	<div {...props}>
		{text}
	</div>
))`
	font-family: sans-serif;
	font-size: ${rem(22)};
	color: ${vars.dark};
`;
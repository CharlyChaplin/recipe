import styled from 'styled-components';
import { adaptiveValue, rem } from 'init/mixins';
import vars from 'init/vars';
import { darken, lighten, rgba } from 'polished';

export const Tool_Panel = styled(({ children, ...props }) => {
	return (
		<div {...props}>
			{children}
		</div>
	)
})`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: flex-start;
	margin: 0 0 0 ${rem(10)};
	row-gap: ${rem(5)};
	column-gap: ${rem(2)};
	
	.tool-panel__item {
		user-select: none;
		width: fit-content;
		background: linear-gradient(180deg, ${vars.buttonTopColor} 0%, ${vars.buttonBottomColor} 100%);
		border: ${rem(1)} solid ${vars.darkGreen};
		border-radius: ${rem(5)};
		text-align: center;
		font-family: sans-serif;
		font-size: ${rem(16)};
		padding: ${rem(5)};
		line-height: 1;
		color: ${vars.whiteColor};
		text-shadow: ${rem(2)} ${rem(2)} ${rem(4)} ${rgba(vars.blackColor, 0.25)};
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		outline: none;
		
		&:hover {
			background: linear-gradient(180deg, ${darken(.1, vars.buttonTopColor)} 0%, ${darken(.1, vars.buttonBottomColor)} 100%);
		}
	}
	
	.tool-panel__item_active {
		background: linear-gradient(180deg, ${rgba(vars.buttonTopBottomDarkColor, 0.85)} 0%, ${rgba(vars.dark, 0.85)} 50%, ${rgba(vars.buttonTopBottomDarkColor, 0.85)} 100%);
	}
`;
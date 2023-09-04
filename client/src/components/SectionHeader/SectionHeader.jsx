import React from 'react';
import { styled } from 'styled-components';
import vars from 'init/vars.js';
import { adaptiveValue, rem } from 'init/mixins.js';


const SectionHeader = styled(({ children, color = vars.text, ...props }) => {
	return (
		<div {...props}>
			{children}
		</div>
	)
})`
	font-family: "Giger", sans-serif;
	${adaptiveValue('font-size', 45, 30)};
	${adaptiveValue('line-height', 45, 35)};
	letter-spacing: ${rem(2)};
	width: fit-content;
	margin: 0;
	padding: 0;
	color: ${({ color }) => color && color || vars.text};
	text-align: center;
`;



export default SectionHeader;
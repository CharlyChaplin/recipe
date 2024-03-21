import styled from 'styled-components';
import clsName from "classnames";
import vars from 'init/vars';
import { rem } from 'init/mixins';
import { rgba } from 'polished';


export const Editor_Wrapper = styled(({ cls, children, ...props }) => {

	return (
		<div className={clsName(cls, props.className)}>
			{children}
		</div>
	)
})`
	border: ${rem(1)} solid ${rgba(vars.lightGreen, .5)};
	border-radius: ${rem(5)};
	padding: ${rem(5)} ${rem(7)};
	cursor: text;
	height: 100%;
	color: ${vars.text};
	
	.DraftEditor-root,
	.DraftEditor-editorContainer,
	.public-DraftEditor-content {
		height: 100%;
	}
	
	h1, h2, h3, h4, h5, h6 {
		font-weight: revert;
	}
	h1 {
		font-size: ${rem(32)};
	}
	h2 {
		font-size: ${rem(24)};
	}
	h3 {
		font-size: ${rem(19)};
	}
	h4 {
		font-size: ${rem(16)};
	}
	h5 {
		font-size: ${rem(14)};
	}
	h6 {
		font-size: ${rem(12)};
	}
	
`;
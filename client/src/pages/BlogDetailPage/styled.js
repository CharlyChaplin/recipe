import { styled } from "styled-components";
import { ContentWrapper } from 'pages/pages.styled';
import { adaptiveValue, rem } from "init/mixins";
import { rgba } from "polished";
import vars from "init/vars";


export const ContentWrapperChangedForBlogDetail = styled(ContentWrapper)`
	width: fit-content;
	display: flex;
	flex-direction: row;
	${adaptiveValue("padding", 35, 35)};
	color: ${vars.text};
	font-family: "RobotoRegular", sans-serif;
	font-size: ${rem(16)};
	gap: ${rem(11)};
`;

export const BlogDetailTop = styled(({ dateadd, owner, ...props }) => (
	<header {...props}>
		<time>{dateadd}</time>
		<span></span>
		<div>{owner}</div>
	</header>
))`
	
	display: flex;
	flex-direction: row;
	font-family: "Roboto", sans-serif;
	font-size: ${rem(16)};
	color: ${rgba(vars.text, .5)};
	line-height: calc(18.75 / 16);
	transition: all 0.25s ease 0s;
	span {
		margin: 0 ${rem(10)};
		height: ${rem(16)};
		width: ${rem(1)};
		background-color: ${vars.text};
	}
`;
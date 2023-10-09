import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins";
import { Link } from "react-router-dom";
import vars from "init/vars";



export const PreviewItemPhoto = styled(({ children, ...props }) => (
	<div {...props}>
		{children}
	</div>
))`
	flex: 1 0 auto;
	overflow: hidden;
	border-radius: ${rem(10)};
	border: ${rem(1)} solid ${vars.lightGreen};
	transition: all 0.25s ease 0s;
	max-width: ${rem(200)};
	max-height: ${rem(150)};
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: all 0.25s ease 0s;
	}
`;

export const PreviewItemDescription = styled(({ text, ...props }) => (
	<div {...props}>
		<span>{text}</span>
	</div>
))`
	font-family: "RalewaySemiBold", sans-serif;
	${adaptiveValue('font-size', 20, 18)};
	line-height: calc(20 / ${vars.fz});
	${adaptiveValue('letter-spacing', 2, 1)};
	color: ${vars.text};
	text-align: center;
	transition: all 0.25s ease 0s;
`;

export const PreviewItemWrapper = styled(({ url, children, ...props }) => (
	<Link to={url} {...props}>
		{children}
	</Link>
))`
	display: flex;
	flex-direction: column;
	align-items: center;
	${adaptiveValue('gap', 15, 10)};
	
	&:hover {
		${PreviewItemPhoto} {
			border: ${rem(1)} solid ${vars.accent};
			img {
				scale: 1.025;
			}
		}
		${PreviewItemDescription} {
			color: ${vars.darkGreen};
		}
	}
`;
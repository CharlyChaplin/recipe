import { styled } from "styled-components";
import vars from "init/vars";
import { adaptiveValue, rem } from "init/mixins";
import { rgba } from "polished";



export const SearchNotFound = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: ${rem(15)};
	margin-left: ${rem(10)};
	padding: rem(7) rem(10);
	color: ${vars.text};
`;

export const SearchNotFoundImageBlock = styled(({ image, alt, ...props }) => (
	<div {...props}>
		<img src={image} alt={alt} />
	</div>
))`
	width: ${rem(30)};
	height: ${rem(24)};
	
	img {
		width: 100%;
		height: 100%;
		filter: drop-shadow(${rem(2)} ${rem(2)} ${rem(5)} ${rgba(vars.blackColor, .25)});
	}
`;

export const SearchNotFoundDescription = styled(({ text, ...props }) => (
	<div {...props}>{text}</div>
))`
	font-family: "RalewayRegular", sans-serif;
	${adaptiveValue("font-size", 18, 18)};
`;

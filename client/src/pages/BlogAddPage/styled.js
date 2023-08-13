import { rem } from "init/mixins";
import vars from "init/vars";
import { rgba } from "polished";
import { styled } from "styled-components";


export const BlogAddPhoto = styled(({ image, imageAltText, ...props }) => (
	<div {...props}>
		<img src={image} alt={imageAltText} />
	</div>
))`
	border: ${rem(1)} solid ${vars.lightGreen};
	border-radius: ${rem(10)};
	box-shadow: ${rem(2)} ${rem(4)} ${rem(2)} ${rem(0)} ${rgba(vars.blackColor, .30)};
	overflow: hidden;
	margin-bottom: ${rem(7)};
	max-width: ${rem(250)};
	max-height: ${rem(136)};
	width: ${rem(250)};
	height: ${rem(136)};
	img {
		width: 100%;
	}
`;
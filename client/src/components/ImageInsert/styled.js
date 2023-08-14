import { rem } from "init/mixins";
import vars from "init/vars";
import { rgba } from "polished";
import { styled } from "styled-components";




export const NewImageWrapper = styled(({ children, ...props }) => (
	<div {...props}>
		{
			children
		}
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
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: relative;
`;

export const NewImagePicture = styled(({ image, ...props }) => {
	console.log(image);
	return (
		<div {...props}>
			{
				image
					? <img src={image} alt={image} />
					: <span>Перетащите файл...</span>
			}
		</div>
	)
})`

	img {
		width: 100%;
	}
	
	span {
		display: block;
	}
`;

export const NewImageOverlay = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: ${rgba(vars.overlay, .25)};
`;
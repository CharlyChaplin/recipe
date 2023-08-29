import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins";
import vars from "init/vars";
import { rgba } from "polished";




export const NewImageWrapper = styled(({ children, ...props }) => (
	<div {...props}>
		{
			children
		}
	</div>
))`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: relative;
	height: 100%;
`;

export const NewImagePicture = styled(({ image, ...props }) => (
	<div {...props}>
		{
			image
				? <img src={image} alt={image} />
				: <span>Перетащите файл...</span>
		}
	</div>
))`
	width: 100%;
	height: 100%;
	
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	span {
		display: block;
	}
`;

export const NewImagePlaceholder = styled(({ placeholder, ...props }) => (
	<div {...props}>
		{placeholder || "Выберите или перетащите файл..."}
	</div>
))`
	pointer-events: none;
	text-align: center;
	color: ${vars.placeholderColor};
	line-height: 150%;
	padding: ${rem(10)};
`;

export const NewImageOverlay = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: ${rgba(vars.overlay, .25)};
	pointer-events: none;
`;
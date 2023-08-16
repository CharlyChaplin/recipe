import { Link } from "react-router-dom";
import { styled } from "styled-components";


export const PreviewItemWrapper = styled(({ url, children, ...props }) => (
	<Link to={url} {...props}>
		{children}
	</Link>
))`
	border: 1px solid #f00;
`;

export const PreviewItemPhoto = styled(({ image, imageAlt, ...props }) => (
	<div {...props}>
		<img src={image} alt={imageAlt} />
	</div>
))`
	
`;

export const PreviewItemDescription = styled(({ text, ...props }) => (
	<div {...props}>
		<span>{text}</span>
	</div>
))`
	
`;
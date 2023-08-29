import React from 'react';
import { PreviewItemDescription, PreviewItemPhoto, PreviewItemWrapper } from './styled';



const PreviewItem = ({ url, image, imageAlt, description }) => {

	return (
		<>
			<PreviewItemWrapper url={url}>

				<PreviewItemPhoto image={image} imageAlt={imageAlt} />
				<PreviewItemDescription text={description} />

			</PreviewItemWrapper>
		</>
	);
}

export default PreviewItem;
import React from 'react';
import { PreviewItemDescription, PreviewItemPhoto, PreviewItemWrapper } from './styled';



const PreviewItem = ({ url, image, imageAlt, description }) => {
	// console.log(url, image, imageAlt, description);

	return (
		<>
			<PreviewItemWrapper url={url}>

				<PreviewItemPhoto image={image} imageAlt={imageAlt} />
				<PreviewItemDescription text={description} />

			</PreviewItemWrapper>

			{/* <Link to={url} className="category__item itemcategory">
				<div className="itemcategory__photo">
					<img src={image} alt={imageAlt} />
				</div>
				<div className="itemcategory__description">
					<span>{title}</span>
				</div>
			</Link> */}
		</>
	);
}

export default PreviewItem;
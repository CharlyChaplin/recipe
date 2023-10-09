import React from 'react';
import { PreviewItemDescription, PreviewItemPhoto, PreviewItemWrapper } from './styled';
import { useState } from 'react';
import { useEffect } from 'react';
import Spinner from 'components/Spinner/Spinner';
import vars from 'init/vars';
import { RecipeShowPhotoBlock } from 'pages/RecipeDetailPage/styled';



const PreviewItem = ({ url, image, imageAlt, description }) => {
	const [imgSrc, setImgSrc] = useState('');

	useEffect(() => {
		fetch(image, { headers: { "Origin": "https://lexun.ru" }, mode: 'cors' })
			.then(resp => resp.blob())
			.then(result => setImgSrc(URL.createObjectURL(result)))
			.catch(err => console.log(err));
	}, []);

	return (
		<>
			<PreviewItemWrapper url={url}>

				<PreviewItemPhoto>
					{/* <img src={image} alt={imageAlt} /> */}
					{
						imgSrc.length > 0
							? <img src={imgSrc} alt={imageAlt} crossOrigin='use-credentials' />
							: <Spinner height={50} />
					}
				</PreviewItemPhoto>
				<PreviewItemDescription text={description} />

			</PreviewItemWrapper>
		</>
	);
}

export default PreviewItem;
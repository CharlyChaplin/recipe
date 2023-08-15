import React, { useEffect, useRef } from 'react';
import { NewImageInput, NewImageOverlay, NewImagePicture, NewImagePlaceholder, NewImageWrapper } from './styled';
import { useState } from 'react';


const ImageInsert = () => {
	const [draggable, setDraggable] = useState(false);

	const [file, setFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState("");
	const fileInput = useRef(null);



	useEffect(() => {
		file && console.log(file);

	}, [file, previewUrl]);

	function handleDragEnter(e) {
		e.preventDefault();
		e.stopPropagation();
		setDraggable(true);
	}

	function handleDragLeave(e) {
		e.preventDefault();
		e.stopPropagation();
		setDraggable(false);
	}

	function handleDrop(e) {
		e.preventDefault();
		e.stopPropagation();
		setDraggable(false);

		const image = e.dataTransfer.files[0];
		handleFile(image);


		let fd = new FormData();

		fd.append('file', image);
		fd.append('blogPath', 'okroshka');

		// for (let val of fd.values()) console.log(val);
	}

	function handleFile(file) {
		setFile(file);
		setPreviewUrl(URL.createObjectURL(file));
	}


	return (
		<>
			<NewImageWrapper onClick={() => fileInput.current.click()} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragEnd={handleDragLeave} onDragOver={handleDragEnter} onDrop={handleDrop}>
				{
					previewUrl && <NewImagePicture image={previewUrl} />
				}
				<input type="file" ref={fileInput} hidden accept='image/*' onChange={e => handleFile(e.target.files[0])} />
				{!previewUrl && <NewImagePlaceholder />}

				{
					draggable && <NewImageOverlay />
				}
			</NewImageWrapper>
		</>
	);
}

export default ImageInsert;
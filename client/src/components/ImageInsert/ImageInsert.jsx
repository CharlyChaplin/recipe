import React, { useRef, useState } from 'react';
import { NewImageOverlay, NewImagePicture, NewImagePlaceholder, NewImageWrapper } from './styled';
import { useEffect } from 'react';


const ImageInsert = ({ currentFile, selectedFile, placeholder }) => {
	const [draggable, setDraggable] = useState(false);

	const [file, setFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState("");
	const fileInput = useRef(null);


	useEffect(() => {
		if (file) selectedFile(file);
	}, [file]);

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

		if (e.dataTransfer.files.length > 1) {
			alert("Выберите только ОДИН файл");
			return;
		};

		handleFile(e.dataTransfer.files[0]);
	}

	function handleFile(file) {
		setFile(file);
		setPreviewUrl(URL.createObjectURL(file));
		URL.revokeObjectURL(file);
	}


	return (
		<>
			<NewImageWrapper onClick={() => fileInput.current.click()} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragEnd={handleDragLeave} onDragOver={handleDragEnter} onDrop={handleDrop}>

				{(previewUrl || currentFile) && <NewImagePicture image={previewUrl || currentFile} />}

				<input type="file" ref={fileInput} hidden accept='image/*' onChange={e => handleFile(e.target.files[0])} />

				{(!previewUrl && !currentFile) && <NewImagePlaceholder placeholder={placeholder} />}

				{draggable && <NewImageOverlay />}

			</NewImageWrapper>
		</>
	);
}

export default ImageInsert;
import React, { useRef, useState } from 'react';
import { NewImageOverlay, NewImagePicture, NewImagePlaceholder, NewImageWrapper } from './styled';
import { useEffect } from 'react';


const ImageInsert = ({ currentFile, selectedFile, placeholder }) => {
	// console.log('currentFile=', currentFile, 'selectedFile=', selectedFile);
	const [draggable, setDraggable] = useState(false);

	const [file, setFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState("");
	const fileInput = useRef(null);


	useEffect(() => {
		console.log(file);
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

		if (!selectedFile) return;

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


	// console.log(currentFile, previewUrl);
	

	return (
		<>
			<NewImageWrapper
				onClick={selectedFile ? () => fileInput.current.click() : () => { }}
				onDragEnter={handleDragEnter}
				onDragOver={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragEnd={handleDragLeave}
				onDrop={handleDrop}
			>

				{
					(previewUrl || currentFile) &&
					<NewImagePicture image={previewUrl || currentFile} />
				}

				<input
					type="file"
					ref={fileInput}
					hidden
					accept='image/*'
					onChange={e => handleFile(e.target.files[0])}
				/>

				{
					(!previewUrl && !currentFile) &&
					<NewImagePlaceholder placeholder={placeholder} />
				}

				{
					draggable && selectedFile &&
					<NewImageOverlay />
				}

			</NewImageWrapper>
		</>
	);
}

export default ImageInsert;
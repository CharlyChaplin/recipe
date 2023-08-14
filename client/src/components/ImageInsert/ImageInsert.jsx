import React from 'react';
import { NewImageInput, NewImageOverlay, NewImagePicture, NewImageWrapper } from './styled';
import { useState } from 'react';


const ImageInsert = () => {
	const [draggable, setDraggable] = useState(false);
	const [file, setFile] = useState(null);
	const [inputFile, setInputFile] = useState(null);

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

		const files = Array.from(e.dataTransfer.files);
		if (files.length > 1) {
			alert("Only single file allow.");
			return;
		}
		let fd = new FormData();

		files.forEach((el, i) => {
			fd.append(`file[${i}]`, el);
			setFile(el);
		});
		fd.append('blogPath', 'okroshka');

		for (let val of fd.values()) console.log(val);
	}

	function getInputFile(e) {
		console.log(e);
	}


	return (
		<>
			<NewImageWrapper onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragEnd={handleDragLeave} onDragOver={handleDragEnter} onDrop={handleDrop}>
				<NewImagePicture image={file} />
				<input type="file" onChange={getInputFile} />
				{
					draggable && <NewImageOverlay />
				}
			</NewImageWrapper>
		</>
	);
}

export default ImageInsert;
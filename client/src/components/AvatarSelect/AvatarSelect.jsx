import React, { useState } from 'react';
import { AvatarBlock, AvatarBlockImage, AvatarBlockPlaceholder, AvatarBlockWrapper, AvatarLabel, HiddenInput } from './styled.js';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import vars from 'init/vars.js';
import { ReactComponent as AnonimICO } from './img/login.svg';
import { useRef } from 'react';


const AvatarSelect = ({
	labelPos = 'row',
	labelVerticalPos = 'top',
	labelText,
	placeholderText,
	singleFileOnly,
	image,
	source = 'userData',
	size = 100
}) => {
	const [draggable, setDraggable] = useState(false);
	const [data, getFile] = useState({ name: "", path: "" });
	const { userData, userById } = useSelector(state => state.userReducer);

	const [file, setFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState("");
	const fileInput = useRef(null);


	useEffect(() => {
		if (image?.length) {
			getFile({ name: "avatar", path: `${image}` });
		} else {
			getFile({ name: '', path: '' })
		}
	}, [userData, userById]);


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

		if (singleFileOnly && e.dataTransfer.files.length > 1) {
			alert("Выберите только ОДИН файл.");
			return;
		}

		handleSendFile(e.dataTransfer.files[0]);
	}

	function handleFile(file) {
		setFile(file);
		setPreviewUrl(URL.createObjectURL(file));
		URL.revokeObjectURL(file);

		handleSendFile(file)
	}

	function handleSendFile(file) {
		let formData = new FormData();

		formData.append(`file[0]`, el);
		formData.append('userPath', source === 'userById' ? userById.email : userData.user.email);

		axios.post(`${vars.remoteHost}/file/upload`, formData)
			.then(res => {
				getFile({
					name: res.data[0].name,
					path: `${vars.remoteHost}/users/${source == 'userById' ? userById.email : userData.user.email}${res.data[0].path}`
				})
			})
			.catch(err => console.log(err));
	}


	return (
		<>
			<AvatarBlock labelPos={labelPos}>
				{!!labelText && labelText.length > 0 ? <AvatarLabel labelVerticalPos={labelVerticalPos} labelText={labelText} fontSize={vars.fz} /> : null}
				<AvatarBlockWrapper onClick={() => fileInput.current.click()} size={size} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragEnd={handleDragLeave} onDragOver={handleDragEnter} onDrop={handleDrop}>
					<input
						type="file"
						ref={fileInput}
						hidden
						accept='image/*'
						onChange={e => handleFile(e.target.files[0])}
					/>
					{
						<>
							<AvatarBlockImage imgOrSvg={data.name}>
								{
									data?.name?.length > 0
										? <img src={data.path} alt={data.name} />
										: <AnonimICO />
								}
							</AvatarBlockImage>
							{
								(!draggable && data?.name?.length == 0)
									? <AvatarBlockPlaceholder size={size} text={placeholderText} />
									: null
							}
						</>
					}


				</AvatarBlockWrapper>

			</AvatarBlock>

		</>
	);
}

export default AvatarSelect;
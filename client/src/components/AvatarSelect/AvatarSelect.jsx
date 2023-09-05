import React, { useState } from 'react';
import { AvatarBlock, AvatarBlockImage, AvatarBlockPlaceholder, AvatarBlockWrapper, AvatarLabel, HiddenInput } from './styled.js';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import vars from 'init/vars.js';


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

		const files = Array.from(e.dataTransfer.files);
		if (singleFileOnly && files.length > 1) {
			alert("Only single file allow.");
			return;
		}
		let formData = new FormData();

		files.forEach((el, i) => formData.append(`file[${i}]`, el));
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
			<AvatarBlock $labelPos={labelPos}>
				{!!labelText && labelText.length > 0 ? <AvatarLabel labelVerticalPos={labelVerticalPos} labelText={labelText} fontSize={16} /> : null}
				<AvatarBlockWrapper size={size} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragEnd={handleDragLeave} onDragOver={handleDragEnter} onDrop={handleDrop}>
					{
						<>
							<AvatarBlockImage imgOrSvg={data.name}>
								{
									data?.name?.length > 0
										? <img src={data.path} alt={data.name} />
										: <svg width="33.866mm" height="33.866mm" version="1.1" viewBox="0 0 33.866 33.866" xmlns="http://www.w3.org/2000/svg">
											<g transform="translate(-83.608,-110.07)" fill="#fff">
												<g transform="matrix(.26458 0 0 .26458 83.608 110.07)">
													<circle id="circle" cx="64" cy="64" r="64" fill="#aaa" />
													<path id="left" d="m64 28.5c-11 0-20 9-20 20 0 7.2 3.9 13.6 9.6 17.1-14.2 4.4-24.6 17.4-24.6 33.4h35" />
													<path d="m64 28.5c11 0 20 9 20 20 0 7.2-3.9 13.6-9.6 17.1 14.2 4.4 24.6 17.4 24.6 33.4h-35" />
												</g>
											</g>
										</svg>
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
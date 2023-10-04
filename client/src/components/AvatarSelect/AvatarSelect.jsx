import React, { useState } from 'react';
import { AvatarBlock, AvatarBlockImage, AvatarBlockPlaceholder, AvatarBlockWrapper, AvatarLabel, AvatarLoadingView, HiddenInput } from './styled.js';
import ax from 'axiosSetup/index.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import vars from 'init/vars.js';
import { ReactComponent as AnonimICO } from './img/login.svg';
import { useRef } from 'react';
import { showInfo } from 'redux/slices/infoSlice.js';
import Spinner from 'components/Spinner/Spinner.js';

const allowImageTypes = ['jpeg', 'png', 'webp', 'gif', 'avif'];

const AvatarSelect = ({
	labelPos = 'row',
	labelVerticalPos = 'top',
	labelText,
	placeholderText,
	singleFileOnly,
	image,
	source = 'userData',
	size = 100,
	locked = false
}) => {
	const [loading, setLoading] = useState(false);
	const [draggable, setDraggable] = useState(false);
	const [data, getFile] = useState({ name: "", path: "" });
	const { userData, userById } = useSelector(state => state.userReducer);

	const [file, setFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState("");
	const fileInput = useRef(null);

	const dispatch = useDispatch();


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
		if (locked) return;
		setDraggable(true);
	}

	function handleDragLeave(e) {
		e.preventDefault();
		e.stopPropagation();
		if (locked) return;
		setDraggable(false);
	}

	function handleDrop(e) {
		e.preventDefault();
		e.stopPropagation();
		if (locked) return;
		setDraggable(false);

		if (singleFileOnly && e.dataTransfer.files.length > 1) {
			alert("Выберите только ОДИН файл.");
			return;
		}

		handleSendFile(e.dataTransfer.files[0]);
	}

	function handleFile(file) {
		if (locked) return;

		setFile(file);
		setPreviewUrl(URL.createObjectURL(file));
		URL.revokeObjectURL(file);

		handleSendFile(file)
	}

	function handleSendFile(file) {
		let formData = new FormData();

		// проверяем на правильный формат
		const fileAllowed = Boolean(allowImageTypes.find(el =>
			el === file.type.replace('image/', '').trim()
		));
		if (!fileAllowed) {
			dispatch(showInfo(
				{
					text: `Неверный формат изображения. ${String.fromCharCode(10, 13)} Принимаются форматы:${String.fromCharCode(10, 13)}${allowImageTypes.reduce((acc, curr) => acc += curr.toUpperCase() + " ", "")}`,
					info: true
				}))
			return;
		};

		// при большом размере файла (для аватарки) выводим сообщение
		if (file.size > 1500000) {
			dispatch(showInfo(
				{
					text: `Размер файла слишком большой для аватара (${new Intl.NumberFormat("ru-RU").format(file.size)} байт). Подождите его загрузки...`,
					info: true
				}))
		}
		// формируем объект для отправки на сервер
		formData.append(`file`, file);
		formData.append('userPath', source === 'userById' ? userById.email : userData.user.email);

		setLoading(true);
		ax.post(`${vars.remoteHost}/file/upload`, formData, {
			headers: {
				"Content-Type": 'multipart/formdata'
			}
		})
			.then(res => {
				setLoading(false);
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
						!loading
							? <>
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
							: <AvatarLoadingView>
								<Spinner sizeIncrease={3} />
							</AvatarLoadingView>
					}


				</AvatarBlockWrapper>

			</AvatarBlock>

		</>
	);
}

export default AvatarSelect;
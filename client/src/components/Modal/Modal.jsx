import React, { useEffect } from 'react';
import { ModalBody, ModalButtons, ModalContent, ModalDialog, ModalHeader, ModalWrapper } from './styled';
import Button from 'components/Button/Button';
import { useContext } from 'react';
import { DataContext } from 'pages/ProfilePage/context';
import { useDispatch, useSelector } from 'react-redux';
import { showInfo } from 'redux/slices/infoSlice';
import axios from 'axiosSetup';



const Modal = ({ params: {
	title = '',
	content,
	okBtnCaption = '',
	actionType = '',
	okBtnFunc = () => { },	// если необходимо выкинуть наружу действие
	cancelBtnCaption = '',
	onClose = () => { }
}
}) => {
	const modalStore = useContext(DataContext);
	const dispatch = useDispatch();



	useEffect(() => {
		document.addEventListener("keydown", keydownHandler);
		return () => document.removeEventListener("keydown", keydownHandler);
	}, []);

	function keydownHandler({ key }) {
		switch (key) {
			case 'Escape':
				onClose();
				break;
			default:
				break;
		}
	}

	// В зависимости от назначения модального окна выполняются нужные действия
	// при нажатии кнопки "OK" или "Применить"
	async function okButtonHandle() {
		switch (actionType) {
			case "userAddChangeDelete":
				const { userEditEmailForChange: email, userEditNewNickname: nickname, userEditNewRole: role } = modalStore;
				if (email) {
					try {
						const resp = await axios.post('/user/changeuserbyemail', { email, nickname, role });
						if (resp.status === 200) {
							dispatch(showInfo({ text: "Данные успешно изменены", ok: true }));
						}
					} catch (error) {
						console.log(`Error: ${error}`);
					}
				}
				break;
			default:
				okBtnFunc();
				onClose();
				break;
		}
	}



	return (
		<>
			<ModalWrapper onClose={onClose}>
				<ModalDialog>
					<ModalHeader>{title && title}</ModalHeader>

					{
						content &&
						<ModalBody>
							<ModalContent>{content}</ModalContent>
						</ModalBody>
					}

					<ModalButtons>
						{
							okBtnCaption?.length > 0 &&
							<Button action={okButtonHandle}>
								{okBtnCaption}
							</Button>
						}
						{
							cancelBtnCaption?.length > 0 &&
							<Button action={onClose}>
								{cancelBtnCaption}
							</Button>
						}
					</ModalButtons>
				</ModalDialog>
			</ModalWrapper >
		</>
	);
}

export default Modal;
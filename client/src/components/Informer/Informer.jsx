import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideInfo, isConfirmOk } from 'redux/slices/infoSlice';
import { ButtonsWrapper, Info, InfoContent, InfoIcon, InfoText, InfoWrapper } from './styled';
import vars from 'init/vars';
import Button from 'components/Button/Button';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from 'routes/helper';


let changeView;
let showTime;

const Informer = () => {
	const buttons = useRef();
	const [view, setView] = useState(false);
	const {
		text = "",
		show = false,
		warning = false,
		ok = false,
		cancel = false,
		isConfirm,
		isConfirmResult = false,
		isLogoutAction = false
	} = useSelector(state => state.infoReducer.showInformation);
	const dispatch = useDispatch();
	const navigate = useNavigate();


	useEffect(() => {
		if (show) {
			setView(true);
			if (!isConfirm?.ok && !isConfirm?.cancel) unloadMe();
		}

		return () => {
			clearTimeout(showTime);
			clearTimeout(changeView);
		}
	}, [show, isLogoutAction]);

	function unloadMe(fast) {
		changeView = setTimeout(() => {
			setView(false);
		}, fast ? 0 : Number(vars.informerShowTime));
		showTime = setTimeout(() => {
			dispatch(hideInfo());
		}, (fast ? 0 : Number(vars.informerShowTime)) + vars.informerAdditionalTimeAfterHide);
	}

	function handleClick() {
		if (!isConfirm?.ok || !isConfirm?.cancel) {
			setView(false);
			setTimeout(() => {
				dispatch(hideInfo());
			}, vars.informerAdditionalTimeAfterHide);
		}
	}

	async function handleOk() {
		await dispatch(isConfirmOk());
		if (isLogoutAction) navigate(paths.logout);
	}

	function handleCancel() {
		if (!isConfirmResult) unloadMe(true);
	}

	if (isConfirmResult) unloadMe(true);

	return (
		<>
			<Info view={view} onClick={handleClick}>
				<InfoWrapper warning={warning} ok={ok} cancel={cancel} isConfirm={isConfirm}>
					{
						(warning || ok || cancel) &&
						<InfoIcon warning={warning} ok={ok} cancel={cancel} />
					}

					<InfoContent>
						<InfoText>{text}</InfoText>

						{
							(isConfirm && (isConfirm?.ok || isConfirm?.cancel))
								? <ButtonsWrapper ref={buttons}>
									{isConfirm.ok && <Button onClick={handleOk}>{isConfirm.ok}</Button>}
									{isConfirm.cancel && <Button onClick={handleCancel}>{isConfirm.cancel}</Button>}
								</ButtonsWrapper>

								: null
						}
					</InfoContent>
				</InfoWrapper>
			</Info>
		</>
	);
}

export default Informer;
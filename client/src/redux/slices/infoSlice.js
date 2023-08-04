import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	showInformation: {
		text: "",
		show: false,
		warning: false,
		ok: false,
		cancel: false,
		isConfirm: {},
		isConfirmResult: false,
		isLogoutAction: false,
	}
};


export const infoSlice = createSlice({
	name: 'informer',
	initialState,
	reducers: {
		showInfo: (state, { payload: { text, warning = false, ok = false, cancel = false, isConfirm = {}, logoutAction = false } }) => {
			state.showInformation = {
				text,
				show: true,
				warning,
				ok,
				cancel,
				isConfirm,
				isLogoutAction: logoutAction,
			}
		},
		hideInfo: (state) => {
			state.showInformation = {
				text: "",
				show: false,
				warning: false,
				ok: false,
				cancel: false,
				isConfirm: {}
			}
		},
		isConfirmOk: (state, _) => {
			state.showInformation.isConfirmResult = true;
		},
		isConfirmCancel: (state, _) => {
			state.showInformation.isConfirmResult = false;
		},
	}
});

export const { showInfo, hideInfo, isConfirmOk, isConfirmCancel } = infoSlice.actions;
export default infoSlice.reducer;
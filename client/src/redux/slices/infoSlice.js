import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	errors: "",
	showInformation: {
		text: "",
		show: false,
		warning: false,
		ok: false,
		cancel: false,
		info: false,
		isConfirm: {},
		isConfirmResult: false,
		isLogoutAction: false,
		isOffline: false
	}
};


export const infoSlice = createSlice({
	name: 'informer',
	initialState,
	reducers: {
		showInfo: (state, { payload: { text, warning = false, ok = false, cancel = false, info = false, isConfirm = {}, logoutAction = false } }) => {
			state.showInformation = {
				text,
				show: true,
				warning,
				ok,
				cancel,
				info,
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
				info: false,
				isConfirm: {}
			}
		},
		isConfirmOk: (state, _) => {
			state.showInformation.isConfirmResult = true;
		},
		isConfirmCancel: (state, _) => {
			state.showInformation.isConfirmResult = false;
		},
		getOfflineStatus: (state, action) => {
			state.showInformation.isOffline = action.payload;
		}
	}
});

export const { showInfo, hideInfo, isConfirmOk, isConfirmCancel, getOfflineStatus } = infoSlice.actions;
export default infoSlice.reducer;
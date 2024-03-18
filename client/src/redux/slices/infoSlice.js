import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


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

export const isOfflineStatus = createAsyncThunk(
	'phrase/add',
	async (_, { rejectWithValue }) => {
		try {
			const resp = await axios.get('https://lexun.space/test');
			return resp.data ? true : false;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);


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
		isOffline: (state, action) => {
			state.showInformation.isOffline = action.payload;
		}
	},
	extraReducers: (build) => {
		build.addCase(isOfflineStatus.pending, (state, action) => {

		});
		build.addCase(isOfflineStatus.fulfilled, (state, action) => {
			state.showInformation.isOffline = action.payload;
		});
		build.addCase(isOfflineStatus.rejected, (state, action) => {
			state.errors = action.payload;
		});
	}
});

export const { showInfo, hideInfo, isConfirmOk, isConfirmCancel, isOffline } = infoSlice.actions;
export default infoSlice.reducer;
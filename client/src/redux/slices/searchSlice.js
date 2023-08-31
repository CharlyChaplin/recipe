import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axiosSetup';

const initialState = {
	searchStatus: false
}


export const searchSlice = createSlice({
	name: 'searchSlice',
	initialState,
	reducers: {
		changeSearchStatus: (state, action) => {
			state.searchStatus = false;
		}
	}
});


export const { searching } = searchSlice.actions;

export default searchSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axiosSetup';

const initialState = {
	searching: false,
	searchResult: {}
}

export const searchQuery = createAsyncThunk(
	'search/query',
	async (query, { rejectWithValue }) => {
		try {
			const resp = await axios.get(`/search/?q=${query}`);
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const searchSlice = createSlice({
	name: 'searchSlice',
	initialState,
	reducers: {
		changeSearchStatus: (state, action) => {
			state.searchStatus = false;
		},
		clearSearchResult: (state, action) => {
			state.searchResult = {};
		}
	},
	extraReducers: (build) => {
		build.addCase(searchQuery.pending, (state, action) => {
			state.searching = true;
		});
		build.addCase(searchQuery.fulfilled, (state, action) => {
			state.searching = false;
			state.searchResult = action.payload;
		});
		build.addCase(searchQuery.rejected, (state, action) => {
			state.searching = false;
			state.searchResult = [];
		});
	}
});


export const { changeSearchStatus, clearSearchResult } = searchSlice.actions;

export default searchSlice.reducer;
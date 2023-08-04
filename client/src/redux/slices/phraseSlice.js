import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axiosSetup';

const initialState = {
	loading: false,
	phraseData: [],
	errors: "",
}

export const phraseAddPhrase = createAsyncThunk(
	'phrase/add',
	async (data, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/phrase/add', data);
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const phraseGetPhrases = createAsyncThunk(
	'phrase/getAllPhrases',
	async (_, { rejectWithValue }) => {
		try {
			const resp = await axios.get('/phrase/phrases');
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const phraseDeletePhrase = createAsyncThunk(
	'phrase/delete',
	async (data, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/phrase/delete', data);
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);


export const phraseSlice = createSlice({
	name: 'phraseSlice',
	initialState,
	reducers: {},
	extraReducers: (build) => {
		//========================================================================================================================================================
		build.addCase(phraseAddPhrase.pending, (state, action) => {
			state.loading = true;
			state.phraseData = [];
			state.errors = "";
		});
		build.addCase(phraseAddPhrase.fulfilled, (state, action) => {
			state.loading = false;
			state.phraseData = action.payload;
			state.errors = "";
		});
		build.addCase(phraseAddPhrase.rejected, (state, action) => {
			state.loading = false;
			state.phraseData = [];
			state.errors = action.payload;
		});
		//========================================================================================================================================================
		build.addCase(phraseGetPhrases.pending, (state, action) => {
			state.loading = true;
			state.phraseData = [];
			state.errors = "";
		});
		build.addCase(phraseGetPhrases.fulfilled, (state, action) => {
			state.loading = false;
			state.phraseData = action.payload;
			state.errors = "";
		});
		build.addCase(phraseGetPhrases.rejected, (state, action) => {
			state.loading = false;
			state.phraseData = [];
			state.errors = action.payload;
		});
		//========================================================================================================================================================
		build.addCase(phraseDeletePhrase.pending, (state, action) => {
			state.loading = true;
			state.phraseData = [];
			state.errors = "";
		});
		build.addCase(phraseDeletePhrase.fulfilled, (state, action) => {
			state.loading = false;
			state.phraseData = action.payload;
			state.errors = "";
		});
		build.addCase(phraseDeletePhrase.rejected, (state, action) => {
			state.loading = false;
			state.phraseData = [];
			state.errors = action.payload;
		});
		//========================================================================================================================================================

	}
});


export const { } = phraseSlice.actions;

export default phraseSlice.reducer;
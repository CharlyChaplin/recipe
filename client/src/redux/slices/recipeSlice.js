import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axiosSetup';

const initialState = {
	loading: false,
	recipeData: [],
	recipies: [],
	errors: "",
}

export const recipeAddRecipe = createAsyncThunk(
	'recipe/add',
	async (data, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/recipe/add', data);
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const recipeDeleteRecipe = createAsyncThunk(
	'recipe/delete',
	async (data, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/recipe/delete', data);
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const recipeGetRecipe = createAsyncThunk(
	'recipe/getOneRecipe',
	async (data, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/recipe/getrecipe', data);
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const recipeGetRecipies = createAsyncThunk(
	'recipe/getAllRecipies',
	async (_, { rejectWithValue }) => {
		try {
			const resp = await axios.get('/recipe/recipies');
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);



export const recipeSlice = createSlice({
	name: 'recipeSlice',
	initialState,
	reducers: {},
	extraReducers: (build) => {
		//========================================================================================================================================================
		build.addCase(recipeAddRecipe.pending, (state, action) => {
			state.loading = true;
			state.recipeData = [];
			state.errors = "";
		});
		build.addCase(recipeAddRecipe.fulfilled, (state, action) => {
			state.loading = false;
			state.recipeData = action.payload;
			state.errors = "";
		});
		build.addCase(recipeAddRecipe.rejected, (state, action) => {
			state.loading = false;
			state.recipeData = [];
			state.errors = action.payload;
		});
		//========================================================================================================================================================
		build.addCase(recipeDeleteRecipe.pending, (state, action) => {
			state.loading = true;
			state.recipeData = [];
			state.errors = "";
		});
		build.addCase(recipeDeleteRecipe.fulfilled, (state, action) => {
			state.loading = false;
			state.recipeData = action.payload;
			state.errors = "";
		});
		build.addCase(recipeDeleteRecipe.rejected, (state, action) => {
			state.loading = false;
			state.recipeData = [];
			state.errors = action.payload;
		});
		//========================================================================================================================================================
		build.addCase(recipeGetRecipe.pending, (state, action) => {
			state.loading = true;
			state.recipeData = [];
			state.errors = "";
		});
		build.addCase(recipeGetRecipe.fulfilled, (state, action) => {
			state.loading = false;
			state.recipeData = action.payload;
			state.errors = "";
		});
		build.addCase(recipeGetRecipe.rejected, (state, action) => {
			state.loading = false;
			state.recipeData = [];
			state.errors = action.payload;
		});
		//========================================================================================================================================================
		build.addCase(recipeGetRecipies.pending, (state, action) => {
			state.loading = true;
			state.recipies = [];
			state.errors = "";
		});
		build.addCase(recipeGetRecipies.fulfilled, (state, action) => {
			state.loading = false;
			state.recipies = action.payload;
			state.errors = "";
		});
		build.addCase(recipeGetRecipies.rejected, (state, action) => {
			state.loading = false;
			state.recipies = [];
			state.errors = action.payload;
		});
	}
});


export const { } = recipeSlice.actions;

export default recipeSlice.reducer;
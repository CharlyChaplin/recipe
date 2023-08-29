import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axiosSetup';

const initialState = {
	categoryLoading: false,
	categoryData: [],
	errors: "",
}

export const categoryAddCategory = createAsyncThunk(
	'category/add',
	async (data, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/category/add', data);
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const categoryDeleteCategory = createAsyncThunk(
	'category/delete',
	async (data, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/category/delete', data);
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const categoryEditCategory = createAsyncThunk(
	'category/edit',
	async (data, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/category/edit', data);
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const categoryGetCategories = createAsyncThunk(
	'category/getAllCategories',
	async (_, { rejectWithValue }) => {
		try {
			const resp = await axios.get('/category/categories');
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const categoryGetCategoryName = createAsyncThunk(
	'category/getCategoryName',
	async (data, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/category/getcategoryname', data);
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);




export const categorySlice = createSlice({
	name: 'categorySlice',
	initialState,
	reducers: {
		clearCategoryData: (state, action) => {
			state.categoryData = [];
			state.completed = false;
		}
	},
	extraReducers: (build) => {
		//========================================================================================================================================================
		build.addCase(categoryAddCategory.pending, (state, action) => {
			state.categoryLoading = true;
			state.categoryData = [];
			state.errors = "";
		});
		build.addCase(categoryAddCategory.fulfilled, (state, action) => {
			state.categoryLoading = false;
			state.categoryData = action.payload;
			state.errors = "";
		});
		build.addCase(categoryAddCategory.rejected, (state, action) => {
			state.categoryLoading = false;
			state.categoryData = [];
			state.errors = action.payload;
		});
		//========================================================================================================================================================
		build.addCase(categoryDeleteCategory.pending, (state, action) => {
			state.categoryLoading = true;
			state.categoryData = [];
			state.errors = "";
		});
		build.addCase(categoryDeleteCategory.fulfilled, (state, action) => {
			state.categoryLoading = false;
			state.categoryData = action.payload;
			state.errors = "";
		});
		build.addCase(categoryDeleteCategory.rejected, (state, action) => {
			state.categoryLoading = false;
			state.categoryData = [];
			state.errors = action.payload;
		});
		//========================================================================================================================================================
		build.addCase(categoryEditCategory.pending, (state, action) => {
			state.categoryLoading = true;
			state.categoryData = [];
			state.errors = "";
		});
		build.addCase(categoryEditCategory.fulfilled, (state, action) => {
			state.categoryLoading = false;
			state.categoryData = action.payload;
			state.errors = "";
		});
		build.addCase(categoryEditCategory.rejected, (state, action) => {
			state.categoryLoading = false;
			state.categoryData = [];
			state.errors = action.payload;
		});
		//========================================================================================================================================================
		build.addCase(categoryGetCategories.pending, (state, action) => {
			state.categoryLoading = true;
			state.errors = "";
		});
		build.addCase(categoryGetCategories.fulfilled, (state, action) => {
			state.categoryLoading = false;
			state.categoryData = action.payload;
			state.errors = "";
		});
		build.addCase(categoryGetCategories.rejected, (state, action) => {
			state.categoryLoading = false;
			state.categoryData = [];
			state.errors = action.payload;
		});
		//========================================================================================================================================================
		build.addCase(categoryGetCategoryName.pending, (state, action) => {
			state.categoryLoading = true;
			state.errors = "";
		});
		build.addCase(categoryGetCategoryName.fulfilled, (state, action) => {
			state.categoryLoading = false;
			state.categoryData = action.payload;
			state.errors = "";
		});
		build.addCase(categoryGetCategoryName.rejected, (state, action) => {
			state.categoryLoading = false;
			state.categoryData = [];
			state.errors = action.payload;
		});
	}
});


export const { clearCategoryData } = categorySlice.actions;

export default categorySlice.reducer;
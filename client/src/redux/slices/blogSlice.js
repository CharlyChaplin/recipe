import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axiosSetup';

const initialState = {
	loading: false,
	blogData: [],
	blogs: [],
	blogsPreview: [],
	errors: "",
}

export const blogAddBlog = createAsyncThunk(
	'blog/add',
	async (data, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/blog/add', data);
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);



export const blogDeleteBlog = createAsyncThunk(
	'blog/delete',
	async (data, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/blog/delete', data);
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const blogGetBlog = createAsyncThunk(
	'blog/getOneBlog',
	async (data, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/blog/getblog', data);
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const blogGetBlogs = createAsyncThunk(
	'blog/getAllBlogs',
	async (_, { rejectWithValue }) => {
		try {
			const resp = await axios.get('/blog/blogs');
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const blogGetPreviewBlogs = createAsyncThunk(
	'blog/getPreviewBlog',
	async (_, { rejectWithValue }) => {
		try {
			const resp = await axios.get('/blog/preview');
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);



export const blogSlice = createSlice({
	name: 'recipeSlice',
	initialState,
	reducers: {},
	extraReducers: (build) => {
		//========================================================================================================================================================
		build.addCase(blogAddBlog.pending, (state, action) => {
			state.loading = true;
			state.blogData = [];
			state.errors = "";
		});
		build.addCase(blogAddBlog.fulfilled, (state, action) => {
			state.loading = false;
			state.blogData = action.payload;
			state.errors = "";
		});
		build.addCase(blogAddBlog.rejected, (state, action) => {
			state.loading = false;
			state.blogData = [];
			state.errors = action.payload;
		});
		//========================================================================================================================================================
		build.addCase(blogDeleteBlog.pending, (state, action) => {
			state.loading = true;
			state.blogData = [];
			state.errors = "";
		});
		build.addCase(blogDeleteBlog.fulfilled, (state, action) => {
			state.loading = false;
			state.blogData = action.payload;
			state.errors = "";
		});
		build.addCase(blogDeleteBlog.rejected, (state, action) => {
			state.loading = false;
			state.blogData = [];
			state.errors = action.payload;
		});
		//========================================================================================================================================================
		build.addCase(blogGetBlog.pending, (state, action) => {
			state.loading = true;
			state.blogData = [];
			state.errors = "";
		});
		build.addCase(blogGetBlog.fulfilled, (state, action) => {
			state.loading = false;
			state.blogData = action.payload;
			state.errors = "";
		});
		build.addCase(blogGetBlog.rejected, (state, action) => {
			state.loading = false;
			state.blogData = [];
			state.errors = action.payload;
		});
		//========================================================================================================================================================
		build.addCase(blogGetBlogs.pending, (state, action) => {
			state.loading = true;
			state.blogs = [];
			state.errors = "";
		});
		build.addCase(blogGetBlogs.fulfilled, (state, action) => {
			state.loading = false;
			state.blogs = action.payload;
			state.errors = "";
		});
		build.addCase(blogGetBlogs.rejected, (state, action) => {
			state.loading = false;
			state.blogs = [];
			state.errors = action.payload;
		});
		//========================================================================================================================================================
		build.addCase(blogGetPreviewBlogs.pending, (state, action) => {
			state.loading = true;
			state.errors = "";
		});
		build.addCase(blogGetPreviewBlogs.fulfilled, (state, action) => {
			state.loading = false;
			state.blogsPreview = action.payload;
			state.errors = "";
		});
		build.addCase(blogGetPreviewBlogs.rejected, (state, action) => {
			state.loading = false;
			state.errors = action.payload;
		});
	}
});


export const { } = blogSlice.actions;

export default blogSlice.reducer;
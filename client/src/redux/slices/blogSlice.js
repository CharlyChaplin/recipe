import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axiosSetup';

const initialState = {
	loading: false,
	blogData: [],
	blogs: [],
	blogsPreview: [],
	errors: "",
	completed: false
}

export const blogAddBlog = createAsyncThunk(
	'blog/add',
	async (formData, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/blog/add', formData, {
				headers: {
					"Content-Type": 'multipart/formdata'
				}
			});
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const blogEditBlog = createAsyncThunk(
	'blog/edit',
	async (data, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/blog/edit', data, {
				headers: {
					"Content-Type": 'multipart/formdata'
				}
			});
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
	name: 'blogSlice',
	initialState,
	reducers: {
		clearBlogData: (state, action) => {
			state.blogData = [];
			state.completed = false;
		}
	},
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
			state.completed = true;
		});
		build.addCase(blogAddBlog.rejected, (state, action) => {
			state.loading = false;
			state.blogData = [];
			state.errors = action.payload;
			state.completed = false;
		});
		//========================================================================================================================================================
		build.addCase(blogEditBlog.pending, (state, action) => {
			state.loading = true;
			state.blogData = [];
			state.errors = "";
		});
		build.addCase(blogEditBlog.fulfilled, (state, action) => {
			state.loading = false;
			state.blogData = action.payload;
			state.completed = true;
			state.errors = "";
		});
		build.addCase(blogEditBlog.rejected, (state, action) => {
			state.loading = false;
			state.blogData = [];
			state.completed = false;
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


export const { clearBlogData } = blogSlice.actions;

export default blogSlice.reducer;
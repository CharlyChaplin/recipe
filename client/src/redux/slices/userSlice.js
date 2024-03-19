import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axiosSetup';
import Cookies from "js-cookie";

const initialState = {
	isAuth: false,
	loading: false,
	userData: [],
	userUpdateSuccess: false,
	users: [],
	usersName: [],
	userById: [],
	roles: [],
	errors: "",
	completed: false
}

export const userRegister = createAsyncThunk(
	'user/signup',
	async (formData, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/user/signup', formData);
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const userLogin = createAsyncThunk(
	'user/signin',
	async (formData, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/user/signin', formData);
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const userLogout = createAsyncThunk(
	'user/logout',
	async (_, { rejectWithValue }) => {

		try {
			const resp = await axios.get('/user/logout');
			if (resp.status === 200) {
				Cookies.remove('accesstoken');
				Cookies.remove('refreshtoken');
			}
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const userGetUser = createAsyncThunk(
	'user/getUser',
	async (_, { rejectWithValue }) => {
		try {
			const resp = await axios.get('/user/getuser');
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const userGetUsers = createAsyncThunk(
	'user/getUsers',
	async (_, { rejectWithValue }) => {
		try {
			const resp = await axios.get('/user/getusers');
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const userGetUsersNickname = createAsyncThunk(
	'user/getUsersNickname',
	async (_, { rejectWithValue }) => {
		try {
			const resp = await axios.get('/user/getusersname');
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
)

export const userUpdate = createAsyncThunk(
	'user/updateUser',
	async (data, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/user/updateuser', data);
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const userGetUserByEmail = createAsyncThunk(
	'user/getUserByEmail',
	async (userEmail, { rejectWithValue }) => {
		try {
			const resp = await axios.post('/user/getuserbyemail', { email: userEmail });
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const userGetRoles = createAsyncThunk(
	'user/getRoles',
	async (_, { rejectWithValue }) => {
		try {
			const resp = await axios.get('/user/getroles');
			return resp.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);



export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		authStatus: (state, action) => {
			state.isAuth = action.payload
		},
		clearUserDataInStore: (state, action) => {
			state.userById = [];
			state.errors = "";
			state.completed = false;
		},
		userUpdateSuccessReset: (state, action) => {
			state.userUpdateSuccess = false;
		}
	},
	extraReducers: (build) => {
		build.addCase(userRegister.pending, (state, action) => {
			state.loading = true;
			state.userData = [];
			state.errors = "";
			state.isAuth = false;
		});
		build.addCase(userRegister.fulfilled, (state, action) => {
			state.loading = false;
			state.userData = action.payload;
			state.errors = "";
			state.isAuth = false;
		});
		build.addCase(userRegister.rejected, (state, action) => {
			state.loading = false;
			state.userData = [];
			state.errors = action.payload;
			state.isAuth = false;
		});
		//========================================================================================================================================================
		build.addCase(userLogin.pending, (state, action) => {
			state.loading = true;
			state.userData = "";
			state.errors = "";
			state.isAuth = false;
			state.completed = false;
		});
		build.addCase(userLogin.fulfilled, (state, action) => {
			state.loading = false;
			state.userData = action.payload;
			state.errors = "";
			state.isAuth = true;
			state.completed = true;
		});
		build.addCase(userLogin.rejected, (state, action) => {
			state.loading = false;
			state.userData = "";
			state.errors = action.payload;
			state.isAuth = false;
			state.completed = true;
		});
		//========================================================================================================================================================
		build.addCase(userLogout.pending, (state, action) => {
			state.loading = true;
			state.userData = "";
			state.errors = "";
		});
		build.addCase(userLogout.fulfilled, (state, action) => {
			state.loading = false;
			state.userData = action.payload;
			state.errors = "";
			state.isAuth = false;
			state.completed = false;
		});
		build.addCase(userLogout.rejected, (state, action) => {
			state.loading = false;
			state.userData = "";
			state.errors = action.payload;
			state.completed = false;
		});
		//========================================================================================================================================================
		build.addCase(userGetUser.pending, (state, action) => {
			state.loading = true;
			// state.errors = "";
		});
		build.addCase(userGetUser.fulfilled, (state, action) => {
			state.loading = false;
			state.userData = action.payload;
			// state.errors = "";
			state.isAuth = true;
		});
		build.addCase(userGetUser.rejected, (state, action) => {
			state.loading = false;
			state.userData = "";
			state.errors = action.payload;
			state.isAuth = false;
		});
		//========================================================================================================================================================
		build.addCase(userUpdate.pending, (state, action) => {
			state.loading = true;
			state.userUpdateSuccess = false;
			state.errors = "";
		});
		build.addCase(userUpdate.fulfilled, (state, action) => {
			state.loading = false;
			state.userUpdateSuccess = true;
			state.userData = action.payload;
			state.errors = "";
		});
		build.addCase(userUpdate.rejected, (state, action) => {
			state.loading = false;
			state.userUpdateSuccess = false;
			state.errors = action.payload;
		});
		//========================================================================================================================================================
		build.addCase(userGetUsers.pending, (state, action) => {
			state.loading = true;
			state.users = [];
			state.errors = "";
		});
		build.addCase(userGetUsers.fulfilled, (state, action) => {
			state.loading = false;
			state.users = action.payload;
			state.errors = "";
		});
		build.addCase(userGetUsers.rejected, (state, action) => {
			state.loading = false;
			state.users = [];
			state.errors = action.payload;
		});
		//========================================================================================================================================================
		build.addCase(userGetUsersNickname.pending, (state, action) => {
			state.loading = true;
			state.errors = "";
		});
		build.addCase(userGetUsersNickname.fulfilled, (state, action) => {
			state.loading = false;
			state.usersName = action.payload;
			state.errors = "";
		});
		build.addCase(userGetUsersNickname.rejected, (state, action) => {
			state.loading = false;
			state.usersName = [];
			state.errors = action.payload;
		});
		//========================================================================================================================================================
		build.addCase(userGetUserByEmail.pending, (state, action) => {
			state.loading = true;
			state.errors = "";
		});
		build.addCase(userGetUserByEmail.fulfilled, (state, action) => {
			state.loading = false;
			state.userById = action.payload;
			state.errors = "";
		});
		build.addCase(userGetUserByEmail.rejected, (state, action) => {
			state.loading = false;
			state.userById = [];
			state.errors = action.payload;
		});
		//========================================================================================================================================================
		build.addCase(userGetRoles.pending, (state, action) => {
			state.loading = true;
			state.errors = "";
		});
		build.addCase(userGetRoles.fulfilled, (state, action) => {
			state.loading = false;
			state.roles = action.payload;
			state.errors = "";
		});
		build.addCase(userGetRoles.rejected, (state, action) => {
			state.loading = false;
			state.roles = [];
			state.errors = action.payload;
		});
	}
});


export const { authStatus, clearUserDataInStore, userUpdateSuccessReset } = userSlice.actions;

export default userSlice.reducer;
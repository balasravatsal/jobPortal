import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import {toast} from "react-toastify";
import {addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage} from "../../utils/localStorage";

const initialState = {
    isLoading : false,
    isSideBarOpen : false,
    user: getUserFromLocalStorage(),
}

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user, thunkAPI) => {
        // console.log(`Register User: ${JSON.stringify(user)}`)
        try {
            const resp = await customFetch.post('/auth/register', user)
            console.log(resp.data)
            return resp.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)
export const loginUser = createAsyncThunk (
    `user/loginUser`,
    async (user, thunkAPI) => {
        // console.log(`Login user: ${JSON.stringify(user)}`)
        try {
            const resp = await customFetch.post('/auth/login', user)
            // console.log(resp)
            return resp.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.msg)
        }
    }
)

export const updateUser = createAsyncThunk(
    `user/updateUser`,
    async (user, thunkAPI) => {
        try {
            const resp = await customFetch.patch(`/auth/updateUser`, user, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
                }
            })
            return resp.data
        }
        catch (e) {
            console.log(e.response)
            return thunkAPI.rejectWithValue(e.response.data.msg)
        }
    }
)

export const registeredApplicant = createAsyncThunk(
    `user/registeredApplicant`,
    async (user, thunkAPI) => {
        try {
            const resp = await customFetch.post(`/auth/registeredApplicant`, user, {
                headers:{
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`
                }
            })
            // console.log(resp.data)
            return resp.data
        }
        catch (e) {
            console.log('error coming')
            console.log(e)
        }
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleSidebar: (state) =>{
            state.isSideBarOpen = !state.isSideBarOpen
        },
        logoutUser: (state) => {
            state.user = null
            state.isSidebarOpen = false
            removeUserFromLocalStorage()
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, {payload}) => {
                const {user} = payload
                state.isLoading = false
                state.user = user
                addUserToLocalStorage(user)
                toast.success(`Hey there, ${user.name}`)
            })
            .addCase(registerUser.rejected, (state, {payload}) => {
                state.isLoading = false
                toast.error(payload)
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, {payload}) => {
                const {user} = payload
                state.isLoading = false
                state.user = user
                addUserToLocalStorage(user)
                toast.success(`Welcome back ${user.name}`)
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false
                toast.error('Invalid credentials')
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                // console.log(payload)
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Information Updated!`);
            })
            .addCase(updateUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
        // extraReducers: {
        //     [registerUser.pending]: (state) => {
        //             state.isLoading = true
        //     },
        //     [registerUser.fulfilled]:(state, {payload}) => {
        //         const {user} = payload
        //         console.log(user)
        //         state.isLoading = false
        //         state.user = user
        //         // addUserToLocalStorage(user)
        //         toast.success(`Hey there, ${user.name}`)
        //     },
        //     [registerUser.rejected]: (state, {payload}) => {
        //         state.isLoading = false
        //         toast.error(payload)
        //     }
    }
})


export const {toggleSidebar, logoutUser} = userSlice.actions
export default userSlice.reducer
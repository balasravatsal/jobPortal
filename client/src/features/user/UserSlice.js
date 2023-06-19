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
            return resp.data
            // console.log(resp)
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
            return resp.data
            // console.log(resp)
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err)
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
            .addCase(loginUser.rejected, (state, {payload}) => {
                state.isLoading = false
                toast.error(payload)
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, {payload}) => {
                const {user} = payload
                state.user = user
                state.isLoading = false
                addUserToLocalStorage(user)
                toast.success(`Information has been updated`)
            })
            .addCase(updateUser.rejected, (state, {payload}) => {
                state.isLoading = false
                toast.error(payload)
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

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading : false,
    user: null,
}

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user, thunkAPI) => {
        console.log(`Register User: ${JSON.stringify(user)}`)
    }
)
export const loginUser = createAsyncThunk (
    `user/loginUser`,
    async (user, thunkAPI) => {
        console.log(`Login user: ${JSON.stringify(user)}`)
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState,
})



export default userSlice.reducer

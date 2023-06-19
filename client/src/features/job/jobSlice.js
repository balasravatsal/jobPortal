import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import error from "../../pages/Error";

const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: '',
};


export const createJob = createAsyncThunk(
    `jobs/createJob`,
    async (job, thunkAPI) => {
        try {
            const resp = await customFetch.post(`/jobs`, job, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`
                }
            })
            thunkAPI.dispatch(clearInput)
            return resp.data
        }
        catch (error) {
            if(error.response.status === 401) {
                return thunkAPI.rejectWithValue('Unauthorized! Logging out...')
            }
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        handleChange: (state, {payload: {name, value}}) => {
            state[name]=value
        },
        clearInput: () => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createJob.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createJob.fulfilled, (state, {payload}) => {
                state.isLoading = false
                toast('New job listed!')
            })
            .addCase(createJob.rejected, (state, {payload}) => {
                state.isLoading = false
                toast.error(payload)
            })
    }
});

export const { handleChange, clearInput } = jobSlice.actions
export default jobSlice.reducer;
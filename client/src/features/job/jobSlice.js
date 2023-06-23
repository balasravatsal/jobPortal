import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import {showLoading, hideLoading, getAllJobs} from "../allJobs/allJobsSlice";
import {getUserFromLocalStorage} from "../../utils/localStorage";

const initialState = {
    isLoading: false,
    position: '',
    company: '',
    job_location: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    job_type: 'full-time',
    statusOptions: ['Registration', 'Interview', 'Closed'],
    status: 'Registration',
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
            thunkAPI.dispatch(clearInput())
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

export const deleteJob = createAsyncThunk(
    `job/deleteJob`,
    async (job_id, thunkAPI) => {

        console.log('up')
        thunkAPI.dispatch(showLoading());
        try {
            const resp = await customFetch.delete(`/jobs/${job_id}`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`
                }
            });
            thunkAPI.dispatch(getAllJobs())
            console.log('below')
            return resp.data;
        } catch (error) {
            thunkAPI.dispatch(hideLoading());
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const editJob = createAsyncThunk(
    `job/editJob`,
    async ({job_id, job}, thunkAPI) => {
        // console.log(job)
        try {
            const resp = await customFetch.patch(`/jobs/${job_id}`,  job, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`
                }
            })
            thunkAPI.dispatch(clearInput())
            return resp.data
        }
        catch (error) {
            thunkAPI.dispatch(hideLoading());
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const applyForJob = createAsyncThunk(
    `job/applyForJob`,
    async (job_id, thunkAPI) => {
        console.log(getUserFromLocalStorage())
        try{
            const resp = await customFetch.post(`/jobs/${job_id}`, getUserFromLocalStorage(), {
                headers:{
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`
                }
            })
            // console.log('...', resp)
            return resp.data
        }
        catch (e) {
            thunkAPI.dispatch(hideLoading())
            return thunkAPI.rejectWithValue((e.response.data))
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
            return {
                ...initialState,
                job_location: getUserFromLocalStorage()?.location || '',
            };
        },
        setEditJob: (state, action) => {
            // console.log(action)
            return {
                ...state, isEditing: true, ...action.payload
            }
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
            .addCase(deleteJob.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteJob.fulfilled, (state, { payload }) => {
                toast.success(payload);
            })
            .addCase(deleteJob.rejected, (state, { payload }) => {
                toast.error(payload);
            })
            .addCase(editJob.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editJob.fulfilled, (state, { payload }) => {
                toast.success(payload);
            })
            .addCase(editJob.rejected, (state, { payload }) => {
                toast.error(payload);
            })
            .addCase(applyForJob.pending, (state) => {
                state.isLading = true
            })
            .addCase(applyForJob.fulfilled, (state, {payload}) => {
                toast(payload)
            })
            .addCase(applyForJob.rejected, (state, {payload}) => {
                toast.error(payload)
            })
    }
});

export const { handleChange, clearInput, setEditJob } = jobSlice.actions
export default jobSlice.reducer;
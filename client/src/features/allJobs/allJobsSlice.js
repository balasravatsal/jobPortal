import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
// import {get} from "axios";
import {toast} from "react-toastify";

const initialFilterState = {
    search: '',
    searchStatus: '',
    searchType: '',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'A - Z', 'Z - A']
}

const initialState = {
    isLoading: false,
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplication: [],
    ...initialFilterState
}


export const getAllJobs = createAsyncThunk(
    'allJobs/getJobs',
    async (_, thunkAPI) => {
        let url = '/jobs'
        // console.log(thunkAPI.getState())
        try{
            const resp = await customFetch.get(url, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`
                }
            })
            // console.log(resp)
            // console.log(resp.data)
            return resp.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue('There was as error while fetching')
        }
    }
)

export const showStats = createAsyncThunk (
    `allJobs/showStats`,
    async (_, thunkAPI) => {
        try {
            const resp = await customFetch.get(`/jobs/stats`)
            console.log('log')
            return resp.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
)






const allJobsSlice = createSlice({
    name: 'allJobs',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.isLoading = true
        },
        hideLoading: (state) => {
            state.isLoading = false
        }
    },
    extraReducers:(builder)=> {
        builder
            .addCase(getAllJobs.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(getAllJobs.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.jobs = payload.jobs
            })
            .addCase(getAllJobs.rejected, (state, {payload}) => {
                state.isLoading = false
                toast.error(payload)
            })
    }
})



export const { showLoading, hideLoading } = allJobsSlice.actions

export default allJobsSlice.reducer




import userSlice from "./features/user/UserSlice";
import {configureStore} from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        user: userSlice,
    }
})


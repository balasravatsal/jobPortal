import userSlice from "./features/users/UserSlice";
import {configureStore} from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        user: userSlice,
    }
})


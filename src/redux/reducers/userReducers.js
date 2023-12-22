import { createSlice } from '@reduxjs/toolkit'

import {
    signUp,
} from "../actions"

const initialState = {
    currentUser: "",

     // Sign in with token
     errorSignUp: "",
     successSignUp: false,
     loadingSignUp: false,
}

const userSlice = createSlice({
    name: "userStore",
    initialState,
    reducers: {
        [signUp.pending]: (state, { payload }) => {
            state.loadingSignUp = true;
            state.errorSignUp = "";
        },
        [signUp.fulfilled]: (state, { payload }) => {
            state.loadingSignUp=  false;
            state.successSignUp= payload.message;
            state.currentUser= payload.user;
        },
        [signUp.rejected]: (state, { payload }) => {
            state.loadingSignUp=  false;
            state.errorSignUp= payload;
        },
    }
})

export default userSlice.reducer
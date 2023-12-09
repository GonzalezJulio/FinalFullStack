import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    error: null, 
    loading: false,
};

const userSlice =  createSlice({
    name: "user",
    initialState,
    reducers: {
        userSignInStart: (state) => {
            state.loading = true;
        },
        userSignInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        userSignInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { userSignInStart, userSignInSuccess, userSignInFailure } = userSlice.actions;

export default userSlice.reducer;

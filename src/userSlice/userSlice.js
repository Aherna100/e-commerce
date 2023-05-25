import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userSignup } from "../actions/authAction";

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

export const userSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        userInfo: null,
        token,
        error: null,
        success: false
    },
    reducers: {
        logout: (state) => {
            state.error = null
            state.userInfo = null
            state.auth = null
            state.token = null
            localStorage.removeItem('token')
        },
        setCredentials: (state, { payload }) => {
            state.userInfo = payload
        }
    },
    extraReducers: {
        [userLogin.pending]: (state) => {
            state.loading = true
            state.error = false
        },
        [userLogin.failed]: (state) => {
            state.loading = false
            state.error = true
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.success = true
            state.userInfo = payload.user
            state.token = payload.token
        },
        [userSignup.pending]: (state) => {
            state.loading = true
            state.error = false
        },
        [userSignup.failed]: (state) => {
            state.loading = false
            state.error = true
        },
        [userSignup.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true
        }
    }
});

export const { logout, setCredentials } = userSlice.actions;

export default userSlice.reducer;
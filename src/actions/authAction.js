import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ROOT = 'http://localhost:3500/api'

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectedWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                },
            }

            const { data } = await axios.post(
                `${ROOT}/auth/login`,
                { username, password },
                config
            );
            localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectedWithValue(error.response.data.message);
            } else {
                return rejectedWithValue(error.message);
            }
        }
    }
);
export const userSignup = createAsyncThunk(
    'auth/register',
    async ({ username, password }, { rejectedWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                },
            }

            const { data } = await axios.post(
                `${ROOT}/auth/register`,
                { username, password },
                config
            );
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectedWithValue(error.response.data.message);
            } else {
                return rejectedWithValue(error.message);
            }
        }
    }
)
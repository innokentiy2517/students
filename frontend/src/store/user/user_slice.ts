import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export interface UserState {
    token: string,
    role: string,
    error: Record<string, string>
}

export interface LoginDto {
    login: string,
    password: string
}

export interface RegisterDto {
    login: string,
    password: string,
    role: string
}

export interface ResponseError {
    message: string,
    cause: string
}

export interface AuthResponse {
    token: string,
    role: string
}

const initialState: UserState = {
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || '',
    error: {}
}

export const login = createAsyncThunk('user/login', async (data: LoginDto, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<AuthResponse>('http://192.168.0.103:3000/users/login', {
            login: data.login,
            password: data.password
        })

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);

        return fulfillWithValue(response.data);
    } catch (e) {
        const error = e as { response: { data: ResponseError } };
        return rejectWithValue(error.response.data);
    }
});

export const register = createAsyncThunk('user/register', async (data: RegisterDto, {rejectWithValue, fulfillWithValue}) => {
    try{
        const response = await axios.post<AuthResponse>('http://192.168.0.103:3000/users/register', {
            login: data.login,
            password: data.password,
            role: data.role
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);

        return fulfillWithValue(response.data);
    } catch (e) {
        const error = e as { response: { data: ResponseError } };
        return rejectWithValue(error.response.data);
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state: UserState) => {
            state.token = '';
            state.role = '';
            state.error = {};
        }
    },
    extraReducers: {
        [login.fulfilled.type]: (state, action: PayloadAction<AuthResponse>) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.error = {};
        },
        [login.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [register.fulfilled.type]: (state, action: PayloadAction<AuthResponse>) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.error = {};
        },
        [register.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        }
    }
});

export const UserActions = {
    login,
    register,
    ...userSlice.actions
}

export default userSlice.reducer;
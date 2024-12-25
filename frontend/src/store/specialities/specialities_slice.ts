import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {ResponseError} from "../user/user_slice.ts";

export interface Speciality {
    id: number
    name: string
}

export interface SpecialitiesState {
    specialities: Speciality[];
    error: Record<string, string>;
}

const initialState: SpecialitiesState = {
    specialities: [],
    error: {}
}

export const get_specialities = createAsyncThunk('specialities/get_specialities', async () => {
    const response = await axios.get<Speciality[]>('http://192.168.0.103:3000/specialities/get_specialities', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
});

export const add_speciality = createAsyncThunk('specialities/add_speciality', async (name: string, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<Speciality>('http://192.168.0.103:3000/specialities/create',
        {
            name
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return fulfillWithValue(response.data);
    } catch (e) {
        const error = e as { response: { data: ResponseError } };
        return rejectWithValue(error.response.data);
    }
});

export const update_speciality = createAsyncThunk('specialities/update_speciality', async ({id, name}: { id: number, name: string }, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<Speciality>('http://192.168.0.103:3000/specialities/update',
            {
                id,
                name
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        return fulfillWithValue(response.data);
    } catch (e) {
        const error = e as { response: { data: ResponseError } };
        return rejectWithValue(error.response.data);
    }
})

export const delete_speciality = createAsyncThunk('specialities/delete', async (id: number, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<Speciality>('http://192.168.0.103:3000/specialities/delete',
            {
                id
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        return fulfillWithValue(response.data);
    } catch (e) {
        const error = e as { response: { data: ResponseError } };
        return rejectWithValue(error.response.data);
    }
})

export const specialitiesSlice = createSlice({
    name: 'specialities',
    initialState,
    reducers: {},
    extraReducers: {
        [get_specialities.fulfilled.type]: (state, action: PayloadAction<Speciality[]>) => {
            state.specialities = action.payload;
        },
        [add_speciality.fulfilled.type]: (state) => {
            state.error = {};
        },
        [add_speciality.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [update_speciality.fulfilled.type]: (state) => {
            state.error = {};
        },
        [update_speciality.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [delete_speciality.fulfilled.type]: (state) => {
            state.error = {};
        },
        [delete_speciality.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        }
    }
});

export const SpecialitiesActions = {
    get_specialities,
    add_speciality,
    update_speciality,
    delete_speciality,
    ...specialitiesSlice.actions
}

export default specialitiesSlice.reducer;
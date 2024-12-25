import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {ResponseError} from "../user/user_slice.ts";

export interface Discipline {
    id: number
    name: string
}

export interface DisciplinesState {
    disciplines: Discipline[]
    error: Record<string, string>
}

const initialState: DisciplinesState = {
    disciplines: [],
    error: {}
}

export const get_disciplines = createAsyncThunk('disciplines/get_disciplines', async () => {
    const response = await axios.get<Discipline[]>('http://localhost:3000/disciplines/get_disciplines', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return response.data;
});

export const add_discipline = createAsyncThunk('disciplines/add_discipline', async (name: string, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<Discipline>('http://localhost:3000/disciplines/create',
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

export const update_discipline = createAsyncThunk('disciplines/update_discipline', async ({id, name}: { id: number, name: string }, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<Discipline>('http://localhost:3000/disciplines/update',
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

export const delete_discipline = createAsyncThunk('disciplines/delete', async (id: number, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<Discipline>('http://localhost:3000/disciplines/delete',
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

export const disciplinesSlice = createSlice({
    name: 'disciplines',
    initialState,
    reducers: {},
    extraReducers: {
        [get_disciplines.fulfilled.type]: (state, action: PayloadAction<Discipline[]>) => {
            state.disciplines = action.payload;
        },
        [get_disciplines.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [add_discipline.fulfilled.type]: (state) => {
            state.error = {};
        },
        [add_discipline.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [update_discipline.fulfilled.type]: (state) => {
            state.error = {};
        },
        [update_discipline.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [delete_discipline.fulfilled.type]: (state) => {
            state.error = {};
        },
        [delete_discipline.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        }
    }
})

export const DisciplinesActions = {
    get_disciplines,
    add_discipline,
    update_discipline,
    delete_discipline,
    ...disciplinesSlice.actions
}

export default disciplinesSlice.reducer;
import {Speciality} from "../specialities/specialities_slice.ts";
import axios from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ResponseError} from "../user/user_slice.ts";

export interface Group {
    id: number,
    group_cipher: string,
    group_number: number,
    speciality_id: number,
    speciality: Speciality,
    start_study_year: number,
}

export interface GroupsState {
    groups: Group[],
    error: Record<string, string>
}

export interface GroupAddFormType {
    group_cipher: string,
    group_number: number,
    speciality_id: number,
    start_study_year: number
}

const initialState: GroupsState = {
    groups: [],
    error: {}
}

export const add_group = createAsyncThunk('groups/add_group', async (data: GroupAddFormType, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<Group>('http://192.168.0.103:3000/groups/create',
            {
                group_cipher: data.group_cipher,
                group_number: data.group_number,
                speciality_id: data.speciality_id,
                start_study_year: data.start_study_year
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

export const get_groups = createAsyncThunk('groups/get_groups', async () => {
    const response = await axios.get<Group[]>('http://192.168.0.103:3000/groups/get_groups', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
});

export const update_group = createAsyncThunk('groups/update', async ({id, group_cipher, group_number, speciality_id, start_study_year}: GroupAddFormType & {id: number}, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<Group>('http://192.168.0.103:3000/groups/update',
            {
                id,
                group_cipher,
                group_number,
                speciality_id,
                start_study_year
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

export const delete_group = createAsyncThunk('groups/delete', async (id: number, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<Group>('http://192.168.0.103:3000/groups/delete',
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

export const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        drop_group_error_key: (state, action: PayloadAction<string>) => {
            delete state.error[action.payload];
        }
    },
    extraReducers: {
        [get_groups.fulfilled.type]: (state, action: PayloadAction<Group[]>) => {
            state.groups = action.payload;
        },
        [get_groups.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [add_group.fulfilled.type]: (state) => {
            state.error = {};
        },
        [add_group.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [update_group.fulfilled.type]: (state) => {
            state.error = {};
        },
        [update_group.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [delete_group.fulfilled.type]: (state) => {
            state.error = {};
        },
        [delete_group.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        }
    }
})

export const GroupsActions = {
    add_group,
    get_groups,
    update_group,
    delete_group,
    ...groupsSlice.actions
}

export default groupsSlice.reducer;
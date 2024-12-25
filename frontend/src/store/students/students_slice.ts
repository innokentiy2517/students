import {Group} from "../groups/groups_slice.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {ResponseError} from "../user/user_slice.ts";

export interface Student {
    id: number
    document_number: string
    surname: string
    name: string
    middle_name: string
    date_of_birth: string
    group_id: number
    gender: string
    group: Group
}

export interface StudentsState {
    students: Student[]
    error: Record<string, string>,
    student_for_modal: Student
}

export interface StudentAddFormType {
    document_number: string
    surname: string
    name: string
    middle_name: string
    date_of_birth: Date
    group_id: number
    gender: string
}

const initialState: StudentsState = {
    students: [],
    error: {},
    student_for_modal: {
        id: 0,
        document_number: '',
        surname: '',
        name: '',
        middle_name: '',
        date_of_birth: '',
        group_id: 0,
        gender: '',
        group: {
            id: 0,
            group_cipher: '',
            group_number: 0,
            speciality_id: 0,
            speciality: {
                id: 0,
                name: ''
            },
            start_study_year: 0
        }
    }
}

export const add_student = createAsyncThunk('students/add', async (student: StudentAddFormType, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<Student>('http://192.168.0.103:3000/students/create',
            {
                ...student
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

export const get_all_students = createAsyncThunk('students/get_all', async () => {
    const response = await axios.get<Student[]>('http://192.168.0.103:3000/students/get_all', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return response.data;
});

export const update_student = createAsyncThunk('students/update', async (student: StudentAddFormType & {id: number}, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<Student>('http://192.168.0.103:3000/students/update',
            {
                ...student
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

export const delete_student = createAsyncThunk('students/delete', async (id: number, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<Student>('http://192.168.0.103:3000/students/delete',
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

export const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        drop_student_error_key: (state, action: PayloadAction<string>) => {
            delete state.error[action.payload];
        },
        get_student: (state, action: PayloadAction<number>) => {
            state.student_for_modal = state.students.find(student => student.id === action.payload)!
        }
    },
    extraReducers: {
        [get_all_students.fulfilled.type]: (state, action) => {
            state.students = action.payload;
        },
        [get_all_students.rejected.type]: (state, action) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [delete_student.fulfilled.type]: (state) => {
            state.error = {};
        },
        [delete_student.rejected.type]: (state, action) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [add_student.fulfilled.type]: (state) => {
            state.error = {};
        },
        [add_student.rejected.type]: (state, action) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [update_student.fulfilled.type]: (state) => {
            state.error = {};
        },
        [update_student.rejected.type]: (state, action) => {
            state.error[action.payload.cause] = action.payload.message;
        }
    }
})

export const StudentsActions = {
    ...studentsSlice.actions,
    add_student,
    get_all_students,
    update_student,
    delete_student
}

export default studentsSlice.reducer;
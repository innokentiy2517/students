import {Student} from "../students/students_slice.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {ResponseError} from "../user/user_slice.ts";
import {LearningPlanContent} from "../learning_plans/learning_plan_slice.ts";

export interface Statement {
    id: number,
    date_of_issue: Date,
    student_id: number,
    student: Student,
    learning_plan_content: LearningPlanContent,
    mark?: number
}

export interface StatementAddFormType {
    date_of_issue: Date,
    student_id: number,
    discipline_id: number
}

export interface StatementUpdateFormType {
    id: number
    mark: number
}

export interface StatementsState {
    statements: Statement[],
    error: Record<string, string>,
    student_personal_card?: Statement[] | undefined
}

const initialState: StatementsState = {
    statements: [],
    student_personal_card: undefined,
    error: {}
}

const add_statement = createAsyncThunk(
    'statements/add_statement',
    async (statement: StatementAddFormType, {rejectWithValue, fulfillWithValue}) => {
        try {
            const response = await axios.post<Statement>('http://localhost:3000/statements/create',
                {
                    date_of_issue: statement.date_of_issue,
                    student_id: statement.student_id,
                    discipline_id: statement.discipline_id
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
    }
);

const get_statements = createAsyncThunk('statements/get_statements', async () => {
    const response = await axios.get<Statement[]>('http://localhost:3000/statements/get', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return response.data;
});

const get_students_personal_card = createAsyncThunk('statements/get_students_personal_card', async (document_number: string) => {
    const response = await axios.post<Statement[]>('http://localhost:3000/statements/get_students_personal_card', {
        document_number
    },{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return response.data;
});

const set_mark = createAsyncThunk('statements/set_mark', async (data: StatementUpdateFormType, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<Statement>('http://localhost:3000/statements/set_mark',
            {
                id: data.id,
                mark: data.mark
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

const delete_statement = createAsyncThunk('statements/delete', async (id: number, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<Statement>('http://localhost:3000/statements/delete',
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

export const statementsSlice = createSlice({
    name: 'statements',
    initialState,
    reducers: {
        drop_student_personal_card: (state) => {
            state.student_personal_card = undefined
        }
    },
    extraReducers: {
        [add_statement.fulfilled.type]: (state) => {
            state.error = {};
        },
        [add_statement.rejected.type]: (state, action) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [get_statements.fulfilled.type]: (state, action) => {
            state.statements = action.payload;
        },
        [get_statements.rejected.type]: (state, action) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [get_students_personal_card.fulfilled.type]: (state, action) => {
            state.student_personal_card = action.payload;
        },
        [get_students_personal_card.rejected.type]: (state, action) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [set_mark.fulfilled.type]: (state) => {
            state.error = {};
        },
        [set_mark.rejected.type]: (state, action) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [delete_statement.fulfilled.type]: (state) => {
            state.error = {};
        },
        [delete_statement.rejected.type]: (state, action) => {
            state.error[action.payload.cause] = action.payload.message;
        }
    }
})

export const StatementsActions = {
    ...statementsSlice.actions,
    add_statement,
    get_statements,
    get_students_personal_card,
    set_mark,
    delete_statement
}

export default statementsSlice.reducer;
import {Student} from "../students/students_slice.ts";
import {Discipline} from "../disciplines/disciplines_slice.ts";
import {createSlice} from "@reduxjs/toolkit";

export interface Statement {
    id: number,
    date_of_issue: Date,
    student_id: number,
    student: Student,
    discipline_id: number,
    discipline: Discipline
}

export interface StatementsState {
    statements: Statement[],
    error: Record<string, string>
}

const initialState: StatementsState = {
    statements: [],
    error: {}
}

export const statementsSlice = createSlice({
    name: 'statements',
    initialState,
    reducers: {}
})

export const StatementsActions = {
    ...statementsSlice.actions
}

export default statementsSlice.reducer;
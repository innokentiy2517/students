import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {ResponseError} from "../user/user_slice.ts";
import {Discipline} from "../disciplines/disciplines_slice.ts";

export interface LearningPlanContent {
    id: number,
    discipline_id: number,
    discipline: Discipline,
    number_of_hours: number,
    attestation_type: string,
    semester: number
}

export interface LearningPlan {
    id: number,
    start_study_year: number,
    speciality_id: number,
    speciality: {
        id: number,
        name: string
    },
    learning_plan_contents: LearningPlanContent[]
}

export interface LearningPlanState {
    learning_plans: LearningPlan[],
    error: Record<string, string>,
    learning_plan_for_modal: LearningPlan,
    learning_plan_for_group: LearningPlan
}

export interface LearningPlanAddFormType {
    start_study_year: number,
    speciality_id: number
}

const initialState: LearningPlanState = {
    learning_plans: [],
    error: {},
    learning_plan_for_modal: {
        id: 0,
        start_study_year: 0,
        speciality_id: 0,
        speciality: {
            id: 0,
            name: ''
        },
        learning_plan_contents: []
    },
    learning_plan_for_group: {
        id: 0,
        start_study_year: 0,
        speciality_id: 0,
        speciality: {
            id: 0,
            name: ''
        },
        learning_plan_contents: []
    }
}

export const get_learning_plans = createAsyncThunk('learning_plan/get_learning_plans', async () => {
    const response = await axios.get<LearningPlan[]>('http://192.168.0.103:3000/learning_plan/get_learning_plans', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
});

export const get_learning_plan = createAsyncThunk('learning_plan/get_learning_plan', async (id: number) => {
    const response = await axios.post<LearningPlan>(`http://192.168.0.103:3000/learning_plan/get_learning_plan`,
        {
            id
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    return response.data;
})

// const get_learning_plan_for_group = createAsyncThunk('learning_plan/get_learning_plan_for_group', async ({speciality_id, start_study_year}: { speciality_id: number, start_study_year: number }) => {
//     const response = await axios.post<LearningPlan>(`http://192.168.0.103:3000/learning_plan/get_learning_plan_for_group`,
//         {
//             speciality_id: speciality_id,
//             start_study_year: start_study_year
//         },
//         {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         });
//     return response.data;
// })

export const add_learning_plan = createAsyncThunk('learning_plan/add_learning_plan', async (data: LearningPlanAddFormType, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<LearningPlanAddFormType>('http://192.168.0.103:3000/learning_plan/create',
            {
                start_study_year: data.start_study_year,
                speciality_id: data.speciality_id
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

export const add_learning_plan_content = createAsyncThunk('learning_plan/add_learning_plan_content', async ({learning_plan_id, discipline_id, number_of_hours, attestation_type, semester}: {
    learning_plan_id: number,
    discipline_id: number,
    number_of_hours: number,
    attestation_type: string,
    semester: number
}, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<LearningPlan>('http://192.168.0.103:3000/learning_plan/add_content',
            {
                learning_plan_id,
                discipline_id,
                number_of_hours,
                attestation_type,
                semester
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

export const delete_learning_plan_content = createAsyncThunk('learning_plan/delete_content', async (id: number, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<LearningPlan>('http://192.168.0.103:3000/learning_plan/delete_content',
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

export const update_learning_plan = createAsyncThunk('learning_plan/update_learning_plan', async ({id, start_study_year, speciality_id}: { id: number, start_study_year: number, speciality_id: number }, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<LearningPlan>('http://192.168.0.103:3000/learning_plan/update_start_year',
            {
                id,
                start_study_year,
                speciality_id
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

export const delete_learning_plan = createAsyncThunk('learning_plan/delete_learning_plan', async (id: number, {rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axios.post<LearningPlan>('http://192.168.0.103:3000/learning_plan/delete',
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

export const learningPlanSlice = createSlice({
    name: 'learning_plan',
    initialState,
    reducers: {
        drop_error: (state) => {
            state.error = {};
        },
        get_learning_plans_for_student: (state, action) => {
            state.learning_plan_for_group = state.learning_plans.find(el => el.start_study_year === action.payload.start_study_year && el.speciality_id === action.payload.speciality_id)!;
        }
    },
    extraReducers: {
        [get_learning_plans.fulfilled.type]: (state, action) => {
            state.learning_plans = action.payload;
        },
        [get_learning_plans.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [add_learning_plan.fulfilled.type]: (state) => {
            state.error = {};
        },
        [add_learning_plan.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [add_learning_plan_content.fulfilled.type]: (state) => {
            state.error = {};
        },
        [add_learning_plan_content.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [update_learning_plan.fulfilled.type]: (state) => {
            state.error = {};
        },
        [update_learning_plan.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [get_learning_plan.fulfilled.type]: (state, action: PayloadAction<LearningPlan>) => {
            state.learning_plan_for_modal = action.payload;
        },
        [get_learning_plan.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [delete_learning_plan_content.fulfilled.type]: (state) => {
            state.error = {};
        },
        [delete_learning_plan_content.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        },
        [delete_learning_plan.fulfilled.type]: (state) => {
            state.error = {};
        },
        [delete_learning_plan.rejected.type]: (state, action: PayloadAction<ResponseError>) => {
            state.error[action.payload.cause] = action.payload.message;
        }
    }
});

export const LearningPlanActions = {
    add_learning_plan,
    add_learning_plan_content,
    get_learning_plans,
    get_learning_plan,
    update_learning_plan,
    delete_learning_plan_content,
    delete_learning_plan,
    ...learningPlanSlice.actions
};


export default learningPlanSlice.reducer
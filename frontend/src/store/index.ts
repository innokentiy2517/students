import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import userReducer, {
    UserActions
} from "./user/user_slice";
import specialitiesReducer, {
    SpecialitiesActions
} from "./specialities/specialities_slice";
import disciplinesReducer, {
    DisciplinesActions
} from "./disciplines/disciplines_slice.ts";
import learningPlanReducer, {
    LearningPlanActions,
} from "./learning_plans/learning_plan_slice.ts";
import groupsReducer, {
    GroupsActions
} from "./groups/groups_slice.ts"
import studentsReducer, {
    StudentsActions
} from "./students/students_slice.ts";
import statementsReducer, {
    StatementsActions
} from "./statements/statements_slice.ts";

export const ActionCreators = {
    ...UserActions,
    ...SpecialitiesActions,
    ...DisciplinesActions,
    ...LearningPlanActions,
    ...GroupsActions,
    ...StudentsActions,
    ...StatementsActions
}

const rootReducer = combineReducers({
    user: userReducer,
    specialities: specialitiesReducer,
    disciplines: disciplinesReducer,
    learningPlans: learningPlanReducer,
    groups: groupsReducer,
    students: studentsReducer,
    statements: statementsReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import userReducer, {login, register, userSlice} from "./user/user_slice";

const userActions = userSlice.actions;

export const ActionCreators = {
    register,
    login,
    ...userActions
}

const rootReducer = combineReducers({
    user: userReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
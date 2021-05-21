import {applyMiddleware, combineReducers, createStore} from "redux";
import {TasksActionsType, tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {TodolistsActionsType, todoListsReducer} from "../features/TodolistsList/todolists-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {AppActionsType, appReducer} from "./app-reducer";
import {AuthActionType, authReducer} from "../features/Login/auth-reducer";

export type AppRootStateType = ReturnType<typeof rootReducer>
export type ActionsType = TodolistsActionsType | TasksActionsType | AppActionsType | AuthActionType
export type AppThunk<ReturnType = void> = ThunkAction<void,AppRootStateType,unknown,ActionsType>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))
// @ts-ignore
window.store = store
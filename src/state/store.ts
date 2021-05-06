import {applyMiddleware, combineReducers, createStore} from "redux";
import {TasksActionsType, tasksReducer} from "./tasks-reducer";
import {TodolistsActionsType, todoListsReducer} from "./todolists-reducer";
import thunk, {ThunkAction} from "redux-thunk";

export type AppRootStateType = ReturnType<typeof rootReducer>


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})

// let preloadedState;
// const persistedTodostring = localStorage.getItem('app-state')
// if (persistedTodostring) {
//     preloadedState = JSON.parse(persistedTodostring)
// }
export type AppActionsType = TodolistsActionsType | TasksActionsType
export type AppThunk<ReturnType = void> = ThunkAction<void,AppRootStateType,unknown,AppActionsType>
export const store = createStore(rootReducer,applyMiddleware(thunk))

// store.subscribe(() => {
//     localStorage.setItem('app-state',JSON.stringify(store.getState()))
// })

// @ts-ignore
window.store = store
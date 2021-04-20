import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todolists-reducer";

export type AppRootStateType = ReturnType<typeof rootReducer>


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})

let preloadedState;
const persistedTodostring = localStorage.getItem('app-state')
if (persistedTodostring) {
    preloadedState = JSON.parse(persistedTodostring)
}

export const store = createStore(rootReducer,preloadedState)

store.subscribe(() => {
    localStorage.setItem('app-state',JSON.stringify(store.getState()))
})

// @ts-ignore
window.store = store
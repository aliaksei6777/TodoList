import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {todoListsReducer} from "../features/TodolistsList/todolists-reducer";
import {AppRootStateType} from "./store";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: "", entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: "", entityStatus: 'idle'}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: '1', addedDate: "",
                deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: '1', addedDate: "",
                deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: '1', addedDate: "",
                deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: '1', addedDate: "",
                deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low
            }
        ]
    },
    app: {status: "loading", error: "error"}
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>{storyFn()}</Provider>
)
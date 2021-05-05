import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todolists-reducer";
import {AppRootStateType} from "./store";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {todoListId: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {todoListId: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: ""}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                taskId: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: '1', addedDate: "",
                deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                taskId: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: '1', addedDate: "",
                deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low
            }
        ],
        ["todolistId2"]: [
            {
                taskId: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: '1', addedDate: "",
                deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                taskId: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: '1', addedDate: "",
                deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low
            }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>{storyFn()}</Provider>
)
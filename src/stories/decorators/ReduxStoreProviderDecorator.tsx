import React from 'react';
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {tasksReducer} from "../../features/TodolistsList/tasks-reducer";
import {todoListsReducer} from "../../features/TodolistsList/todolists-reducer";
import {AppRootStateType} from "../../app/store";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {appReducer} from "../../app/app-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer,
    app: appReducer
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
    app: {status: "idle", error: null}
};

export const storyBookStore = createStore(rootReducer, initialGlobalState,applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>{storyFn()}</Provider>
)
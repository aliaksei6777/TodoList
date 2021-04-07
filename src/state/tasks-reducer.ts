import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";
import {TaskStateType} from "../App";

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskID: string
    id: string
}
type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    id: string
}
type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskID: string,
    isDone: boolean,
    id: string
}
type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskID: string,
    title: string,
    id: string
}

export type ActionType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodoListActionType | RemoveTodoListActionType


const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state,[action.id]: state[action.id].filter(t => t.id !== action.taskID)}
        }
        case "ADD-TASK": {
            return {...state, [action.id]:[...state[action.id], {id: v1(), title: action.title, isDone: false}]}
        }
        case "CHANGE-TASK-STATUS": {
            return {...state, [action.id]: state[action.id].map(t => t.id === action.taskID
                    ? {...t,isDone: action.isDone} : t)}
        }
        case "CHANGE-TASK-TITLE": {
            return {...state, [action.id]: state[action.id].map(t => t.id === action.taskID
                    ? {...t,title: action.title} : t)}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.id]: []}

        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (id: string, taskID: string ): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", id, taskID} as const
}
export const addTaskAC = (id: string, title: string): AddTaskActionType => {
    return {type: "ADD-TASK", id, title} as const
}
export const changeTaskStatusAC = (id: string, taskID: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", id, taskID, isDone} as const
}
export const changeTaskTitleAC = (id: string, taskID: string, title: string, ): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", id, taskID, title} as const
}

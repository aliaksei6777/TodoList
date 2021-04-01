import {FilterValuesType, TaskStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todoListId: string
}
type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todoListId: string
}
type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string,
    isDone: boolean,
    todoListId: string
}
type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string,
    title: string,
    todoListId: string
}

export type ActionType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodoListActionType | RemoveTodoListActionType

export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = stateCopy[action.todoListId].filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case "ADD-TASK": {
            const newTask = {id: v1(), title: action.title, isDone: false }
            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
        }
        case "CHANGE-TASK-STATUS": {
            // const stateCopy = {...state}
            // let task = stateCopy[action.todoListId].find(t => t.id === action.taskId)
            // if (task) {
            //     task.isDone = action.isDone
            // }
            return {...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId
                    ? {...t, isDone: action.isDone} : {...t}
                )
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {...state, [action.todoListId]: state[action.todoListId].map(t =>
                    t.id === action.taskId ? {...t, title: action.title} : {...t}
                )}
        }
        case "ADD-TODOLIST": {

            return {...state, [action.todoListID]: []}
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

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId, todoListId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todoListId: todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todoListId: todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todoListId: todolistId}
}

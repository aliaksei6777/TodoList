import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

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
    status: TaskStatuses,
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

export type TaskStateType = {
    [key: string]: TaskType[]
}

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state,[action.todoListId]: state[action.todoListId].filter(t => t.taskId !== action.taskId)}
        }
        case "ADD-TASK": {
            return {...state, [action.todoListId]:[...state[action.todoListId],
                    {taskId: v1(), title: action.title, status: TaskStatuses.New,
                        todoListId: action.todoListId, addedDate: "", deadline: "", description:"", startDate: "",
                        order: 0, priority: TaskPriorities.Low
                    }]}
        }
        case "CHANGE-TASK-STATUS": {
            return {...state, [action.todoListId]: state[action.todoListId].map(t => t.taskId === action.taskId
                    ? {...t,status: action.status} : t)}
        }
        case "CHANGE-TASK-TITLE": {
            return {...state, [action.todoListId]: state[action.todoListId].map(t => t.taskId === action.taskId
                    ? {...t,title: action.title} : t)}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todoListId]: []}

        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (todoListId: string, taskId: string ): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todoListId, taskId} as const
}
export const addTaskAC = (todoListId: string, title: string): AddTaskActionType => {
    return {type: "ADD-TASK", todoListId, title} as const
}
export const changeTaskStatusAC = (todoListId: string, taskId: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", todoListId, taskId, status} as const
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string, ): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", todoListId, taskId, title} as const
}

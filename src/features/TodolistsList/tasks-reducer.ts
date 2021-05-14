import {AddTodolistActionType, RemoveTodoListActionType, SetTodolistActionType} from "./todolists-reducer";
import {TaskType, todolistAPI, UpdateTaskType} from "../../api/todolist-api";
import {AppRootStateType, AppThunk} from "../../app/store";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error";

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: TasksActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state,[action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [...state[action.task.todoListId], action.task]}
        case "UPDATE-TASK":
            return {...state, [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskID ? {...t, ...action.model} : t)}
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy
        case "SET-TODOLIST": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            return {...state, [action.todoListId]: action.tasks}
        }
        default:
            return state
    }
}

//actions
export const removeTask = (todoListId: string, taskId: string ) => ({type: "REMOVE-TASK", todoListId, taskId} as const)
export const addTask = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTask = (todoListId: string, taskID: string, model: UpdateTaskDomainModelType) => ({
    type: "UPDATE-TASK", todoListId, taskID, model} as const)
export const setTasks = (tasks: TaskType[], todoListId: string) => ({type: 'SET-TASKS', tasks, todoListId} as const)

//thunks
export const fetchTasksTC = (id: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistAPI.getTasks(id)
        dispatch(setTasks(res.data.items,id))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(dispatch,e.message)
    }

}

export const removeTaskTC = (id: string, taskId: string):AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistAPI.deleteTask(id, taskId)
        if(res.data.resultCode === 0) {
            dispatch(removeTask(id, taskId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch,e.message)
    }
}

export const addTaskTC = (id: string, title: string):AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistAPI.createTask(id, title)
        if (res.data.resultCode === 0) {
            dispatch(addTask(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch,e.message)
    }
}

export const updateTaskTC = (id: string, taskId: string, model: UpdateTaskDomainModelType):AppThunk =>
    async (dispatch: Dispatch,getState: () => AppRootStateType) => {
        try {
            const state = getState()
            const task = state.tasks[id].find(t => t.id === taskId)
            if (!task) {
                //throw new Error("task not found in the state");
                console.warn('task not found in the state')
                return
            }

            const apiModel: UpdateTaskType = {
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status: task.status,
                ...model
            }
            dispatch(setAppStatusAC('loading'))
            const res = await todolistAPI.updateTask(apiModel, id, taskId)
            if (res.data.resultCode === 0) {
                dispatch(updateTask(id, taskId, model))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch,res.data)
            }
        } catch (e) {
            handleServerNetworkError(dispatch, e.message)
        }
    }

//types
export type UpdateTaskDomainModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export type TasksActionsType =
    | ReturnType<typeof removeTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof updateTask>
    | ReturnType<typeof setTasks>
    | AddTodolistActionType
    | RemoveTodoListActionType
    | SetTodolistActionType
export type TaskStateType = {
    [key: string]: TaskType[]
}


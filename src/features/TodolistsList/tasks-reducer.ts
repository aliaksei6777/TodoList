import {
    addTodolist,
    AddTodolistActionType,
    ClearDataActionType, clearTodosData, removeTodoList,
    RemoveTodoListActionType,
    SetTodolistActionType, setTodolists
} from "./todolists-reducer";
import {TaskType, todolistAPI, UpdateTaskType} from "../../api/todolist-api";
import {AppRootStateType, AppThunk} from "../../app/store";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TaskStateType = {}

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        removeTask(state, action: PayloadAction<{todoListId: string, taskId: string}>){
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1){
                tasks.splice(index,1)
            }
        },
        addTask(state, action: PayloadAction<{task: TaskType}>){
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTask(state, action: PayloadAction<{todoListId: string, taskId: string, model: UpdateTaskDomainModelType}>){
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1){
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasks(state, action: PayloadAction<{tasks: TaskType[], todoListId: string}>){
            state[action.payload.todoListId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolist, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodoList, (state, action) => {
            delete state[action.payload.todoListId]
        });
        builder.addCase(setTodolists, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(clearTodosData, (state, action) => {
            return {}
        });
    }
})

export const tasksReducer = slice.reducer

//actions
export const {removeTask,addTask,updateTask,setTasks} = slice.actions

//thunks
export const fetchTasksTC = (id: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistAPI.getTasks(id)
        dispatch(setTasks({tasks: res.data.items, todoListId: id}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e) {
        handleServerNetworkError(dispatch,e.message)
    }

}

export const removeTaskTC = (id: string, taskId: string):AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistAPI.deleteTask(id, taskId)
        if(res.data.resultCode === 0) {
            dispatch(removeTask({todoListId: id, taskId: taskId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch,e.message)
    }
}

export const addTaskTC = (id: string, title: string):AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistAPI.createTask(id, title)
        if (res.data.resultCode === 0) {
            dispatch(addTask({task: res.data.data.item}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
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
            dispatch(setAppStatusAC({status: 'loading'}))
            const res = await todolistAPI.updateTask(apiModel, id, taskId)
            if (res.data.resultCode === 0) {
                dispatch(updateTask({todoListId: id, taskId: taskId, model: model}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
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
    | ClearDataActionType
export type TaskStateType = {
    [key: string]: TaskType[]
}


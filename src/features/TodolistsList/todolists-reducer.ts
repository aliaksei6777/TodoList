import {todolistAPI, TodoListType} from "../../api/todolist-api";
import {AppThunk} from "../../app/store";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error";
import {fetchTasksTC} from "./tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: "todolist",
    initialState: initialState,
    reducers: {
        removeTodoList(state, action: PayloadAction<{todoListId: string}>){
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolist(state, action: PayloadAction<{todolist: TodoListType}>){
            state.unshift({...action.payload.todolist, filter: "all",entityStatus: 'idle'})
        },
        changeTodoListTitle(state, action: PayloadAction<{todoListId: string, title: string}>){
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[index].title = action.payload.title
        },
        changeTodoListFilterAC(state, action: PayloadAction<{todoListId: string, filter: FilterValuesType}>){
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[index].filter = action.payload.filter
        },
        setTodolists(state, action: PayloadAction<{todolists: TodoListType[]}>){
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{id: string, entityStatus: RequestStatusType}>){
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        },
        clearTodosData(state, action: PayloadAction<{}>){
            return []
        },
    }
})

export const todoListsReducer = slice.reducer

export const {removeTodoList,addTodolist,changeTodoListTitle,changeTodoListFilterAC,
    setTodolists,changeTodolistEntityStatusAC,clearTodosData} = slice.actions

//thunks
export const fetchTodolistTC = ():AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistAPI.getTodolists()
        dispatch(setTodolists({todolists: res.data}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
        res.data.forEach((tl) => {
            dispatch(fetchTasksTC(tl.id))})
    } catch (e) {
        handleServerNetworkError(dispatch, e.message)
    }
}

export const addTodolistTC = (title: string):AppThunk => async dispatch => {
    try{
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistAPI.createTodolist(title)
        if(res.data.resultCode === 0){
            dispatch(addTodolist({todolist: res.data.data.item}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e.message)
    }
}

export const removeTodolistTC = (id: string):AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({id: id, entityStatus: "loading"}))
        const res = await todolistAPI.deleteTodolist(id)
        if (res.data.resultCode === 0) {
            dispatch(removeTodoList({todoListId: id}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e.message)
    }
}

export const changeTodolistTitleTC = (id: string, title: string):AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
         const res = await todolistAPI.updateTodolist(id, title)
        if(res.data.resultCode === 0) {
            dispatch(changeTodoListTitle({todoListId: id, title: title}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e.message)
    }
}

//types
export type RemoveTodoListActionType = ReturnType<typeof removeTodoList>
export type AddTodolistActionType = ReturnType<typeof addTodolist>
export type SetTodolistActionType = ReturnType<typeof setTodolists>
export type ClearDataActionType = ReturnType<typeof clearTodosData>
export type TodolistsActionsType =
    | RemoveTodoListActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodoListTitle>
    | ReturnType<typeof changeTodoListFilterAC>
    | SetTodolistActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | ClearDataActionType

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

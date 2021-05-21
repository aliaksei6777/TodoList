import {todolistAPI, TodoListType} from "../../api/todolist-api";
import {AppThunk} from "../../app/store";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error";

const initialState: Array<TodolistDomainType> = []
export const todoListsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType):Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all",entityStatus: 'idle'},...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl,title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListId ? {...tl,filter: action.filter} : tl)
        case "SET-TODOLIST":
            return action.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl,entityStatus: action.entityStatus} : tl)
        default:
            return state
    }
}

//actions
export const removeTodoList = (todoListId: string) => ({type: "REMOVE-TODOLIST", todoListId} as const)
export const addTodolist = (todolist: TodoListType) => ({type: "ADD-TODOLIST", todolist} as const)
export const changeTodoListTitle = (todoListId: string, title: string) =>
    ({type: "CHANGE-TODOLIST-TITLE", todoListId, title} as const)
export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType) =>
    ({type: "CHANGE-TODOLIST-FILTER", todoListId, filter} as const)
export const setTodolists = (todolists: TodoListType[]) => ({type: 'SET-TODOLIST', todolists} as const)
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus} as const)

//thunks
export const fetchTodolistTC = ():AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistAPI.getTodolists()
        dispatch(setTodolists(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(dispatch, e.message)
    }
}

export const addTodolistTC = (title: string):AppThunk => async dispatch => {
    try{
        dispatch(setAppStatusAC('loading'))
        const res = await todolistAPI.createTodolist(title)
        if(res.data.resultCode === 0){
            dispatch(addTodolist(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e.message)
    }
}

export const removeTodolistTC = (id: string):AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(id, "loading"))
        const res = await todolistAPI.deleteTodolist(id)
        if (res.data.resultCode === 0) {
            dispatch(removeTodoList(id))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e.message)
    }
}

export const changeTodolistTitleTC = (id: string, title: string):AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistAPI.updateTodolist(id, title)
        if(res.data.resultCode === 0) {
            dispatch(changeTodoListTitle(id, title))
            dispatch(setAppStatusAC('succeeded'))
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
export type TodolistsActionsType =
    | RemoveTodoListActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodoListTitle>
    | ReturnType<typeof changeTodoListFilterAC>
    | SetTodolistActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

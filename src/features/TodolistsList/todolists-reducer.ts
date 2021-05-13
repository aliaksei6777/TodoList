import {todolistAPI, TodoListType} from "../../api/todolist-api";
import {AppThunk} from "../../app/store";
import {Dispatch} from "redux";

const initialState: Array<TodolistDomainType> = []
export const todoListsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType):Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all"},...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl,title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListId ? {...tl,filter: action.filter} : tl)
        case "SET-TODOLIST":
            return action.todolists.map(tl => ({...tl, filter: "all"}))
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
export const setTodolist = (todolists: TodoListType[]) => ({type: 'SET-TODOLIST', todolists} as const)

//thunks
export const fetchTodolistTC = ():AppThunk => async dispatch => {
    try {
        const res = await todolistAPI.getTodolists()
        dispatch(setTodolist(res.data))
    } catch (e) {
        throw new Error(e)
    }
}

export const addTodolistTC = (title: string):AppThunk => async dispatch => {
    try {
        const res = await todolistAPI.createTodolist(title)
        dispatch(addTodolist(res.data.data.item))
    } catch (e) {
        throw new Error(e)
    }
}

export const removeTodolistTC = (id: string):AppThunk => async dispatch => {
    try {
        const res = await todolistAPI.deleteTodolist(id)
        dispatch(removeTodoList(id))
    } catch (e) {
        throw new Error(e)
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodoListTitle(id, title))
            })
    }
}
//types
export type RemoveTodoListActionType = ReturnType<typeof removeTodoList>
export type AddTodolistActionType = ReturnType<typeof addTodolist>
export type SetTodolistActionType = ReturnType<typeof setTodolist>
export type TodolistsActionsType =
    | RemoveTodoListActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodoListTitle>
    | ReturnType<typeof changeTodoListFilterAC>
    | SetTodolistActionType
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodoListType & {filter: FilterValuesType}

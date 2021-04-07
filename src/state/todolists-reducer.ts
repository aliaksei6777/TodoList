import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST",
    id: string,
    title: string

}
type ChangeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
type ChangeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

export type ActionType = RemoveTodoListActionType | AddTodoListActionType
    | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

const initialState: Array<TodoListType> = []

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionType):Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":{
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: action.id, title: action.title, filter: "all"}]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {...tl,title: action.title} : {...tl})
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.id ? {...tl,filter: action.filter} : tl)
        }
        default:
            return state
    }
}

export const removeTodoListAC = (id: string): RemoveTodoListActionType => {
    return {
        type: "REMOVE-TODOLIST",
        id
    }
}
export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {
        type: "ADD-TODOLIST",
        id: v1(),
        title
    }
}
export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id,
        title
    }
}
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id,
        filter
    }
}
import {v1} from "uuid";
import {TodoListType} from "../api/todolist-api";

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    todoListId: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST",
    todoListId: string,
    title: string

}
type ChangeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    todoListId: string
    title: string
}
type ChangeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    todoListId: string
    filter: FilterValuesType
}

export type ActionType = RemoveTodoListActionType | AddTodoListActionType
    | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodoListType & {filter: FilterValuesType}

const initialState: Array<TodolistDomainType> = []

export const todoListsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType):Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":{
            return state.filter(tl => tl.todoListId !== action.todoListId)
        }
        case "ADD-TODOLIST": {
            return [...state, {todoListId: action.todoListId, title: action.title, filter: "all", addedDate: '', order: 0}]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.todoListId === action.todoListId ? {...tl,title: action.title} : {...tl})
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.todoListId === action.todoListId ? {...tl,filter: action.filter} : tl)
        }
        default:
            return state
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return {
        type: "REMOVE-TODOLIST",
        todoListId
    }
}
export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {
        type: "ADD-TODOLIST",
        todoListId: v1(),
        title
    }
}
export const changeTodoListTitleAC = (todoListId: string, title: string): ChangeTodoListTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        todoListId,
        title
    }
}
export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        todoListId,
        filter
    }
}
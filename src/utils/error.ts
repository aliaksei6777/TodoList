import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";

export const handleServerAppError = <T>(dispatch: Dispatch<ErrorsActionType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'ERROR'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (dispatch: Dispatch<ErrorsActionType>, message: string) => {
    dispatch(setAppErrorAC({error: message ? message: 'Some error ocurred'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}

type ErrorsActionType = SetAppErrorActionType | SetAppStatusActionType
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";

export const handleServerAppError = <T>(dispatch: Dispatch<ErrorsActionType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('ERROR'))
    }
    dispatch(setAppStatusAC('failed'))
}


export const handleServerNetworkError = (dispatch: Dispatch<ErrorsActionType>, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

type ErrorsActionType = SetAppErrorActionType | SetAppStatusActionType
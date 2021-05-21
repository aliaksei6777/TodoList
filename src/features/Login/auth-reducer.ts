import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error";
import {AppThunk} from "../../app/store";

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType):AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await authAPI.login(data)
        if(res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e.message)
    }
}

export const logoutTC = ():AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch,e.message)
    }
}


// types
export type AuthActionType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = typeof initialState


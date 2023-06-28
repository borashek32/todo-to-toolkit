import { Dispatch } from "redux"
import {authActions} from "features/auth/auth.slice"
import {authAPI} from "features/auth/auth.api"

const initialState: InitialStateType = {
  status: "idle",
  error: null,
  isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status }
    case "APP/SET-ERROR":
      return { ...state, error: action.error }
    case "APP/SET-IS-INITIALIED":
      return { ...state, isInitialized: action.value }
    default:
      return { ...state }
  }
}

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type InitialStateType = {
  status: RequestStatusType
  error: string | null
  isInitialized: boolean
}

export const setAppErrorAC = (error: string | null) => ({ type: "APP/SET-ERROR", error } as const)
export const setAppStatusAC = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status } as const)
export const setAppInitializedAC = (value: boolean) => ({ type: "APP/SET-IS-INITIALIED", value } as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
    } else {
    }

    dispatch(setAppInitializedAC(true))
  })
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

type ActionsType = SetAppErrorActionType | SetAppStatusActionType | ReturnType<typeof setAppInitializedAC>

import { Dispatch } from "redux"
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "app/app-reducer"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import {LoginParamsType} from "features/auth/auth.types"
import {authAPI} from "features/auth/auth.api"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"


const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }
  }
})

const login =
  (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

const logout = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}


export const authActions = slice.actions
export const authSlice = slice.reducer
export const authThunks = {
  login,
  logout
}

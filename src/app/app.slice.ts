import { Dispatch } from "redux"
import {authActions} from "features/auth/auth.slice"
import {authAPI} from "features/auth/auth.api"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RequestStatusType} from "app/app.types"


const slice = createSlice({
  name: 'app',
  initialState: {
    status: "idle",
    error: '',
    isInitialized: false,
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setAppError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error
    }
  }
})

export const initializeApp = () => (dispatch: Dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
    }
    dispatch(appActions.setAppIsInitialized({ isInitialized: true }))
  })
}

export const appActions = slice.actions
export const appReducer = slice.reducer
export const appThunks = {
  initializeApp
}
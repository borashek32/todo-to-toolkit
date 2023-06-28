import {LoginParamsType} from "features/auth/auth.types"
import {authAPI} from "features/auth/auth.api"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {appActions} from "app/app.slice"
import {createAppAsyncThunk} from "common/utils/create-app-async-thunk"
import {thunkTryCatch} from "common/utils/thunk-try-catch"


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

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  'auth/login',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { dispatch } = thunkAPI
      const res = await authAPI.login(arg)
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      }
    }, false)
  })

const logout = createAppAsyncThunk<void>(
  'auth/logout',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { dispatch } = thunkAPI
      const res = await authAPI.logout()
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      }
    }, false)
  })

export const authActions = slice.actions
export const authReducer = slice.reducer
export const authThunks = {
  login,
  logout
}

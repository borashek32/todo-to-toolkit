import {LoginParamsType} from "features/auth/auth.types"
import {authAPI} from "features/auth/auth.api"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {appActions} from "app/app.slice"
import {createAppAsyncThunk} from "common/utils/create-app-async-thunk"
import {thunkTryCatch} from "common/utils/thunk-try-catch"
import {isAxiosError} from "axios"


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
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      await authAPI.login(arg)
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))

      return { isLoggedIn: true } // Explicitly return the resolved value
    } catch (err) {
      if (isAxiosError(err)) {
        const error = err.response ? err.response.data.error : err.message
        dispatch(appActions.setAppError({ error }))
      // } else {
      //   dispatch(appActions.setAppError({ error: `Native error ${err.message}` }))
      }
      return rejectWithValue({ err })
    }
  }
)

const _login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  'auth/login',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { dispatch } = thunkAPI
      const res = await authAPI.login(arg)
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      } else {
        dispatch(appActions.setAppError({ error: 'please' }))
      }
    })
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
    })
  })

export const authActions = slice.actions
export const authReducer = slice.reducer
export const authThunks = {
  login,
  logout
}

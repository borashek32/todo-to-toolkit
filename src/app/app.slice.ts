import {Dispatch} from "redux"
import {authActions} from "features/auth/auth.slice"
import {authAPI} from "features/auth/auth.api"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RequestStatusType} from "app/app.types"
import {createAppAsyncThunk} from "common/utils/create-app-async-thunk"
import {thunkTryCatch} from "common/utils/thunk-try-catch"


const slice = createSlice({
  name: 'app',
  initialState: {
    status: "idle",
    error: null as string | null,
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

const initializeApp = createAppAsyncThunk(
  'app/initialize',
  async (_, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { dispatch } = thunkAPI
      authAPI.me().then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
        }
        dispatch(appActions.setAppIsInitialized({isInitialized: true}))
      })
    })
  })

const _initializeApp = () => (dispatch: Dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
    }
    dispatch(appActions.setAppIsInitialized({isInitialized: true}))
  })
}

export const appActions = slice.actions
export const appReducer = slice.reducer
export const appThunks = {
  initializeApp
}
import {BaseThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk"
import { appActions } from "app/app.slice"
import {AppDispatch, AppRootStateType} from "app/store"
import {AxiosError, isAxiosError} from "axios"

/**
 Wrapper function for Redux Toolkit's createAsyncThunk.
 Handles errors and dispatches actions accordingly.
 @param {BaseThunkAPI<RootState, any, AppDispatch, unknown>} thunkAPI - The Thunk API object provided by Redux Toolkit.
 @param {Function} logic - The asynchronous logic function to be executed.
 @param {boolean} [showGlobalError=false] - Flag indicating whether to show a global error message.
 @returns {Promise<any>} - A promise representing the result of the logic function or a rejected value with error information.
 */

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatch, unknown>,
  logic: Function,
  showGlobalError: boolean = false
) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    appActions.setAppStatus({ status: 'succeeded' })
    return await logic()
  } catch (e) {
    // usual code: Error - native js error. for typing
    const err = e as Error | AxiosError<{ error: string }>
    if (isAxiosError(err)) {
      const error = err.response ? err.response.data.error : err.message
      dispatch(appActions.setAppError({ error }))
    } else {
      dispatch(appActions.setAppError({ error: `Native error ${err.message}` }))
    }
    return rejectWithValue({ e, showGlobalError })
  }
}

/**
 The thunkTryCatch function is a utility that can be used to wrap asynchronous logic in Redux Toolkit's createAsyncThunk.
 It helps handle errors, dispatch loading actions, and set error states in the Redux store.
 @async
 @function
 @name thunkTryCatch
 @param {BaseThunkAPI<RootState, any, AppDispatch, unknown>} thunkAPI - The Thunk API object provided by Redux Toolkit.
 @param {Function} logic - The asynchronous logic function to be executed.
 @param {boolean} [showGlobalError=false] - Flag indicating whether to show a global error message.
 @returns {Promise<any>} - A promise representing the result of the logic function or a rejected value with error information.
 */
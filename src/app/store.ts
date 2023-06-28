import {tasksReducer} from "features/todolists/Todolist/tasks.slice"
import {todolistsReducer} from "features/todolists/todolists.slice"
import {AnyAction, combineReducers} from "redux"
import {ThunkAction, ThunkDispatch} from "redux-thunk"
import {appReducer} from "app/app.slice"
import {authReducer} from "features/auth/auth.slice"
import {configureStore} from "@reduxjs/toolkit"


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store

import { tasksReducer } from "features/todolists/Todolist/tasks-reducer"
import { todolistsReducer } from "features/todolists/todolists-reducer"
import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux"
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk"
import { authSlice } from "features/auth/auth.slice"
import {appReducer} from "app/app.slice"


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authSlice,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store

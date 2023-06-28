import {AppRootStateType} from "app/store"

const selectStatus = (state: AppRootStateType) => state.app.status
const selectAppError = (state: AppRootStateType) => state.app.error
const selectAppIsInitialized = (state: AppRootStateType) => state.app.isInitialized

export {
  selectAppError,
  selectStatus,
  selectAppIsInitialized
}

import {AppRootStateType} from "app/store"

const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn

export {
  selectIsLoggedIn
}
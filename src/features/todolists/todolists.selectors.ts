import {AppRootStateType} from "app/store"

const selectTodolists = (state: AppRootStateType) => state.todolists

export {
  selectTodolists
}
import {AppRootStateType} from "app/store"


const selectTasks = (state: AppRootStateType) => state.tasks

export {
  selectTasks
}
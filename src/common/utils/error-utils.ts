import { ResponseType } from "common/types/common.types"
import { Dispatch } from "redux"
import {appActions} from "app/app.slice"

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch
) => {
  if (data.messages.length) {
    console.log('data.messages.length')
    dispatch(appActions.setAppError({ error: data.messages[0] }))
  } else {
    console.log('error: "Some error occurred"')
    dispatch(appActions.setAppError({ error: "Some error occurred" }))
  }
  console.log('status: "failed"')
  dispatch(appActions.setAppStatus({ status: "failed" }))
}

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch
) => {
  dispatch(appActions.setAppError({ error: error.message ? error.message : "Some error occurred" }))
  dispatch(appActions.setAppStatus({ status: "failed" }))
}

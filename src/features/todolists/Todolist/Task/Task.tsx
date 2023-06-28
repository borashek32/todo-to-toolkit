import React, { ChangeEvent, useCallback } from "react"
import { Checkbox, IconButton } from "@mui/material"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { Delete } from "@mui/icons-material"
import {TaskType} from "features/todolists/Todolist/tasks.types"
import {TaskStatuses} from "common/enums/common.enums"
import {tasksThunks} from "features/todolists/Todolist/tasks.slice"
import {useAppDispatch} from "common/hooks/use-app-dispatch"


type TaskPropsType = {
  task: TaskType
  todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {

  const dispatch = useAppDispatch()

  const removeTask = useCallback(() => {
    dispatch(tasksThunks.removeTask({ taskId: props.task.id, todolistId: props.todolistId }))
  }, [props.task.id, props.todolistId])

  const changeStatus = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
    const newIsDoneValue = e.currentTarget.checked
    dispatch(tasksThunks.updateTask({ todolistId: props.todolistId, domainModel: { status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New }, taskId: props.task.id}))
  }, [props.task.id, props.todolistId])

  const changeTaskTitle = useCallback( (newTitle: string) => {
    dispatch(tasksThunks.updateTask({ todolistId: props.todolistId, domainModel: { title: newTitle }, taskId: props.task.id}))
  }, [props.task.id, props.todolistId])


  return (
    <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <Checkbox checked={props.task.status === TaskStatuses.Completed} color="primary" onChange={changeStatus} />
      <EditableSpan value={props.task.title} onChange={changeTaskTitle} />
      <IconButton onClick={removeTask}>
        <Delete />
      </IconButton>
    </div>
  )
})

import React, {useCallback, useEffect} from "react"
import {AddItemForm} from "common/components/AddItemForm/AddItemForm"
import {EditableSpan} from "common/components/EditableSpan/EditableSpan"
import {Task} from "./Task/Task"
import {useAppDispatch} from "common/hooks/use-app-dispatch"
import {Button, IconButton} from "@mui/material"
import {Delete} from "@mui/icons-material"
import {FilterValuesType, TodolistDomainType} from "features/todolists/todolists.types"
import {TaskType} from "features/todolists/Todolist/tasks.types"
import {tasksThunks} from "features/todolists/Todolist/tasks.slice"
import {TaskStatuses} from "common/enums/common.enums"
import {todolistsActions, todolistsThunks} from "features/todolists/todolists.slice"


type PropsType = {
  todolist: TodolistDomainType
  tasks: Array<TaskType>
  demo?: boolean
}

export const Todolist = React.memo(function ({ demo = false, ...props }: PropsType) {

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (demo) {
      return
    }
    dispatch(tasksThunks.fetchTasks(props.todolist.id))
  }, [])

  const addTask = useCallback((newValue: string) => {
    dispatch(tasksThunks.addTask({ title: newValue, todolistId: props.todolist.id }))
  }, [props.todolist.id])

  const removeTodolist = useCallback(() => {
    dispatch(todolistsThunks.removeTodolist(props.todolist.id))
  }, [])

  const changeTodolistTitle = useCallback((title: string) => {
    dispatch(todolistsThunks.changeTodolistTitle({ id: props.todolist.id, title }))
  }, [props.todolist.id])

  const changeFilter = useCallback((value: FilterValuesType) => {
    dispatch(todolistsActions.changeTodolistFilter({ id: props.todolist.id, filter: value}))
  }, [props.todolist.id])

  let tasksForTodolist = props.tasks

  if (props.todolist.filter === "active") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New)
  }
  if (props.todolist.filter === "completed") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed)
  }

  return (
    <div>
      <h3>
        <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"} />
      <div>
        {tasksForTodolist.map((t) => (
          <Task
            key={t.id}
            task={t}
            todolistId={props.todolist.id}
          />
        ))}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <Button
          variant={props.todolist.filter === "all" ? "outlined" : "text"}
          onClick={() => changeFilter('all')}
          color={"inherit"}
        >
          All
        </Button>
        <Button
          variant={props.todolist.filter === "active" ? "outlined" : "text"}
          onClick={() => changeFilter('active')}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={props.todolist.filter === "completed" ? "outlined" : "text"}
          onClick={() => changeFilter('completed')}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  )
})

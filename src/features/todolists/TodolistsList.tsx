import React, {useCallback, useEffect} from "react"
import {Grid, Paper} from "@mui/material"
import {AddItemForm} from "common/components/AddItemForm/AddItemForm"
import {Todolist} from "./Todolist/Todolist"
import {Navigate} from "react-router-dom"
import {useAppDispatch} from "common/hooks/use-app-dispatch"
import {useAppSelector} from "common/hooks/use-app-selector"
import {selectTasks} from "features/todolists/Todolist/tasks.selectors"
import {selectIsLoggedIn} from "features/auth/auth.selectors"
import {selectTodolists} from "features/todolists/todolists.selectors"
import {todolistsThunks} from "features/todolists/todolists.slice"


type PropsType = {
  demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {

  const todolists = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
    dispatch(todolistsThunks.fetchTodolists())
  }, [])



  const addTodolist = useCallback((title: string) => {
      dispatch(todolistsThunks.addTodolist(title))
    },
    [dispatch]
  )

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id]

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  demo={demo}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

import React, {useCallback, useEffect} from "react"
import "./App.css"
import {TodolistsList} from "features/todolists/TodolistsList"
import {ErrorSnackbar} from "common/components/ErrorSnackbar/ErrorSnackbar"
import {useDispatch} from "react-redux"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Login} from "features/auth/Login"
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material"
import {Menu} from "@mui/icons-material"
import {authThunks} from "features/auth/auth.slice"
import {appThunks} from "app/app.slice"
import {useAppSelector} from "common/hooks/use-app-selector"
import {selectAppIsInitialized, selectStatus} from "app/app.selectors"
import {selectIsLoggedIn} from "features/auth/auth.selectors"

type PropsType = {
  demo?: boolean
}

function App({ demo = false }: PropsType) {

  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const isInitialized = useAppSelector(selectAppIsInitialized)

  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(appThunks.initializeApp())
  }, [])

  const logoutHandler = useCallback(() => {
    dispatch(authThunks.logout())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">News</Typography>
            {isLoggedIn && (
              <Button color="inherit" onClick={logoutHandler}>
                Log out
              </Button>
            )}
          </Toolbar>
          {status === "loading" && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodolistsList demo={demo} />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App

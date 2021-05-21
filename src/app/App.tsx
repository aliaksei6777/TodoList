import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {logoutTC} from "../features/Login/auth-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    },[])

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    },[])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                </AppBar>
                {status === "loading" && <LinearProgress color="secondary" />}
                <Container fixed>
                    <Switch>
                        <Route exact path={'/'} render={ () => <TodolistsList demo={demo}/> }/>
                        <Route path={'/login'} render={ () => <Login/> }/>
                        <Route path={ '/404' } render={ () => <h1 style={{textAlign: 'center',fontSize: '50px'}}>404: PAGE NOT FOUND</h1> }/>
                        <Redirect from={'*'} to={'/404'}/>
                    </Switch>
                </Container>
                <ErrorSnackbar/>
            </div>
        </BrowserRouter>
    );
}

export default App;

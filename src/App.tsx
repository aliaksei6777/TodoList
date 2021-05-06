import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistTC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, fetchTodolistTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType,
} from "./state/todolists-reducer";
import {addTaskTC, removeTaskTC, TaskStateType, updateTaskTC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Todolist} from "./components/TodoList";
import {TaskStatuses } from "./api/todolist-api";


function App() {

    useEffect(() => {
        dispatch(fetchTodolistTC())
    },[])

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTask = useCallback((id: string, title: string) => {
        dispatch(addTaskTC(id, title))},[dispatch])

    const removeTask = useCallback((id: string, taskID: string) => {
        dispatch(removeTaskTC(id, taskID))},[dispatch])

    const changeTaskStatus = useCallback((id: string, taskID: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(id, taskID, {status}))},[dispatch])

    const changeTaskTitle = useCallback((id: string, taskID: string, newTitle: string) => {
        dispatch(updateTaskTC(id, taskID, {title: newTitle}))},[dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    },[dispatch])
    const changeTodoListFilter = useCallback((id: string, newFilterValue: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(id, newFilterValue))
    },[dispatch])
    const removeTodoList = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    },[dispatch])
    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodoListTitleAC(id, newTitle))
    },[dispatch])

    const todolistComponents = todolists.map(tl => {
        return <Grid item key={tl.id}>
            <Paper style={{padding: "10px"}}>
                <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasks[tl.id]}
                    filter={tl.filter}
                    removeTask={removeTask}
                    changeTodoListFilter={changeTodoListFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                />
            </Paper>
        </Grid>
    })
    // UI:
    // CRUD:
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <div>
                        <h3>add new todolist</h3>
                        <div><AddItemForm addItem={addTodoList}/></div>
                    </div>
                </Grid>
                <Grid container spacing={3}>
                    {todolistComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

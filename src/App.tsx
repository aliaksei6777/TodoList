import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Todolist} from "./components/TodoList";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {

    const todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTask = useCallback((id: string, title: string) => {
        dispatch(addTaskAC(id, title))
    },[dispatch])
    const removeTask = useCallback((id: string, taskID: string) => {
        dispatch(removeTaskAC(id, taskID))
    },[dispatch])
    const changeTaskStatus = useCallback((id: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(id, taskID, isDone))
    },[dispatch])
    const changeTaskTitle = useCallback((id: string, taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(id, taskID, newTitle))
    },[dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    },[dispatch])
    const changeTodoListFilter = useCallback((id: string, newFilterValue: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(id, newFilterValue))
    },[dispatch])
    const removeTodoList = useCallback((id: string) => {
        dispatch(removeTodoListAC(id))
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

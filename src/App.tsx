import React, {useReducer} from 'react';
import './App.css';
import Todolist from "./components/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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

    function addTask(id: string, title: string) {
        dispatch(addTaskAC(id, title))
    }
    function removeTask(id: string, taskID: string) {
        dispatch(removeTaskAC(id, taskID))
    }
    function changeTaskStatus(id: string, taskID: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(id, taskID, isDone))
    }
    function changeTaskTitle(id: string, taskID: string, newTitle: string) {
        dispatch(changeTaskTitleAC(id, taskID, newTitle))
    }

    function addTodoList(title: string) {
        dispatch(addTodoListAC(title))
    }
    function changeTodoListFilter(id: string, newFilterValue: FilterValuesType) {
        dispatch(changeTodoListFilterAC(id, newFilterValue))
    }
    function removeTodoList(id: string) {
        dispatch(removeTodoListAC(id))
    }
    function changeTodoListTitle(id: string, newTitle: string) {
        dispatch(changeTodoListTitleAC(id, newTitle))
    }

    const todolistComponents = todolists.map(tl => {
        let tasksForTodoList = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
        }
        if (tl.filter === "completed") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
        }
        return <Grid item>
            <Paper style={{padding: "10px"}}>
                <Todolist
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
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

import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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
    // BLL:
    const todoListID1 = v1()
    const todoListID2 = v1()
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Salt", isDone: false},
            {id: v1(), title: "Sugar", isDone: true},
            {id: v1(), title: "Fish", isDone: false},
        ]
    })

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }
    function removeTask(taskID: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const filteredTasks = todoListTasks.filter(t => t.id !== taskID) // true
        tasks[todoListID] = filteredTasks
        setTasks({...tasks})
    }
    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const todolist: TodoListType = {id: newTodoListID, title, filter: "all"}
        setTodoLists([...todoLists, todolist])
        setTasks({...tasks, [newTodoListID]: []})
    }
    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todolist = todoLists.find(tl => tl.id === todoListID)
        if (todolist) {
            todolist.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }
    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    function changeTodoListTitle(newTitle: string, todoListID: string) {
        let todolist = todoLists.find(tl => tl.id === todoListID)
        if (todolist) {
            todolist.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    const todolisComponents = todoLists.map(tl => {
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
                    {todolisComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

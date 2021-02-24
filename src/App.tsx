import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/TodoList";
import {v1} from "uuid";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: true},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(taskID: string) {
        const filteredTasks = tasks.filter(t => t.id !== taskID) // true
        setTasks(filteredTasks)
        console.log(tasks)
    }
    function changeTodoListFilter(newFilterValue: FilterValuesType){
        setFilter(newFilterValue)
    }
    function addTask(title: string){
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }
    function changeTaskStatus(taskID: string, isDone: boolean) {
        const task = tasks.find(t => t.id === taskID)
        if(task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    // function isDoneChangeHandler(id: string) {
    //     const changedTasks = tasks.map(t => {if (t.id === id) {t.isDone = !t.isDone} return t })
    //     setTasks(changedTask)
    // }

    let tasksForTodoList = tasks
    if(filter === "active"){
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if(filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodoList}
                filter={filter}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                // isDoneChangeHandler={isDoneChangeHandler}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;

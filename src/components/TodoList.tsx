import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "../App";


type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus:(taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList:(todoListID: string) => void
}


function Todolist(props: TodoListPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string|null>(null)

    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        return (
            <li className={t.isDone ? "is-done" : ""}>
                <input onChange={changeTaskStatus} type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>)
    })
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const addTask = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
        props.addTask(trimTitle, props.id)
        setTitle("")} else {
            setError("Title is required!")
        }
    }
    const removeTodoList = () => props.removeTodoList(props.id)

    const onAllClickHandler = () => {props.changeTodoListFilter('all', props.id)}
    const onActiveClickHandler = () => {props.changeTodoListFilter('active', props.id)}
    const onCompletedClickHandler = () => {props.changeTodoListFilter('completed', props.id)}

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}>x</button></h3>
            <div>
                <input className={error ? "error" : ""}
                       value={title}
                       onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressAddTask}/>
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === "all" ? "selected" : ""}  onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "selected" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "selected" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;
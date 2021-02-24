import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "../App";


type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    addTask: (title: string) => void
    // isDoneChangeHandler: (id: string) => void
    changeTaskStatus:(taskID: string, isDone: boolean) => void
}


function Todolist(props: TodoListPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string|null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
        props.addTask(trimTitle)
        setTitle("")} else {
            setError("Title is required!")
        }
    }
    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)
        // const isDoneChangeHandler = () => props.isDoneChangeHandler(t.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
        return (
            <li className={t.isDone ? "is-done" : ""}>
                <input onChange={changeTaskStatus} type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>)
    })

    const onAllClickHandler = () => {props.changeTodoListFilter('all')}
    const onActiveClickHandler = () => {props.changeTodoListFilter('active')}
    const onCompletedClickHandler = () => {props.changeTodoListFilter('completed')}

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? "error" : ""}
                       value={title}
                       onChange={onChangeHandler}
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
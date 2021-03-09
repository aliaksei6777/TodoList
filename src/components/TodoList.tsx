import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}

function Todolist(props: TodoListPropsType) {

    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.id)
        }
        return (
            <li className={t.isDone ? "is-done" : ""}>
                <input onChange={changeTaskStatus} type="checkbox" checked={t.isDone} />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>x</button>
            </li>)
    })
    const removeTodoList = () => props.removeTodoList(props.id)
    const onAllClickHandler = () => {props.changeTodoListFilter('all', props.id)}
    const onActiveClickHandler = () => {props.changeTodoListFilter('active', props.id)}
    const onCompletedClickHandler = () => {props.changeTodoListFilter('completed', props.id)}
    const addTask = (title: string) => props.addTask(title, props.id)
    const changeTodolistTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }

    return (
        <div className={'task'}>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <button onClick={removeTodoList}>x</button></h3>
            <AddItemForm addItem={addTask}/>
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
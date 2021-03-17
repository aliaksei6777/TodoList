import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, ListItemText} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
            <div key={t.id}>
                <Checkbox onChange={changeTaskStatus} checked={t.isDone} />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </div>)
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
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton></h3>
            <AddItemForm addItem={addTask}/>
            {/*<ul style={{listStyle: "none", paddingLeft: "0"}}>*/}
            <ul>{tasks}</ul>
            <div>
                <Button onClick={onAllClickHandler}
                        size={"small"}
                        variant={props.filter === "all" ? "contained" : "text"}
                >All</Button>
                <Button onClick={onActiveClickHandler}
                        size={"small"}
                        variant={props.filter === "active" ? "contained" : "text"}
                        color={"primary"}
                >Active</Button>
                <Button onClick={onCompletedClickHandler}
                        size={"small"}
                        variant={props.filter === "completed" ? "contained" : "text"}
                        color={"secondary"}
                >Completed</Button>
            </div>
        </div>
    );
}

export default Todolist;
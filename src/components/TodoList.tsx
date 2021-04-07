import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {FilterValuesType, TaskType} from "../App";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string, taskID: string) => void
    changeTodoListFilter: (id: string, newFilterValue: FilterValuesType) => void
    addTask: (id: string, title: string) => void
    changeTaskStatus:(id: string, taskID: string, isDone: boolean) => void
    removeTodoList:(id: string) => void
    changeTaskTitle: (id: string, taskID: string, newTitle: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

function Todolist(props: TodoListPropsType) {

    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(props.id,t.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.id, t.id, e.currentTarget.checked )
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(props.id, t.id, newTitle)
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
    const onAllClickHandler = () => {props.changeTodoListFilter(props.id,'all' )}
    const onActiveClickHandler = () => {props.changeTodoListFilter(props.id,'active' )}
    const onCompletedClickHandler = () => {props.changeTodoListFilter(props.id,'completed' )}
    const addTask = (title: string) => props.addTask(props.id,title)
    const changeTodolistTitle = (title: string) => {
        props.changeTodoListTitle(props.id,title)
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
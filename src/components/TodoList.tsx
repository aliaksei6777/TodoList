import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {FilterValuesType, TaskType} from "../App";

import {Task} from "./Task";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    changeTodoListFilter: (id: string, newFilterValue: FilterValuesType) => void
    addTask: (id: string, title: string) => void
    removeTodoList:(id: string) => void
    changeTaskTitle: (id: string, taskID: string, newTitle: string) => void
    changeTaskStatus:(id: string, taskID: string, isDone: boolean) => void
    removeTask: (id: string, taskID: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo((props: TodoListPropsType) => {
    // let todolist = useSelector<AppRootStateType,TodoListType>(state => state.todolists.filter(todo => todo.id === props.id)[0])
    // const dispatch = useDispatch()
    // let ownTasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    let tasksForTodoList = props.tasks
    if (props.filter === "active") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
    }

    const tasks = tasksForTodoList.map(t =>
       <Task key={t.id} task={t} id={props.id} changeTaskTitle={props.changeTaskTitle}
             changeTaskStatus={props.changeTaskStatus} removeTask={props.removeTask}/>
    )

    const addTask = useCallback((title: string) => props.addTask(props.id,title),[props.addTask,props.id])
    const removeTodoList = () => props.removeTodoList(props.id)
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id,title)
    },[props.changeTodoListTitle, props.id])
    const onAllClickHandler = useCallback(() => {
        props.changeTodoListFilter(props.id,'all' )},[props.changeTodoListFilter,props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeTodoListFilter(props.id,'active' )},[props.changeTodoListFilter,props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeTodoListFilter(props.id,'completed' )},[props.changeTodoListFilter,props.id])

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton></h3>
            <AddItemForm addItem={addTask}/>
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
})
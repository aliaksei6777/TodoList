import React, {useCallback, useEffect} from "react";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {RequestStatusType} from "../../../app/app-reducer";

type TodoListPropsType = {
    todolist: TodolistDomainType
    entityStatus: RequestStatusType
    tasks: Array<TaskType>
    changeTodoListFilter: (id: string, newFilterValue: FilterValuesType) => void
    addTask: (id: string, title: string) => void
    removeTodoList: (id: string) => void
    changeTaskTitle: (id: string, taskID: string, newTitle: string) => void
    changeTaskStatus: (id: string, taskID: string, status: TaskStatuses) => void
    removeTask: (id: string, taskID: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: TodoListPropsType) => {

    let tasksForTodoList = props.tasks
    if (props.todolist.filter === "active") {
        tasksForTodoList = tasksForTodoList.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(t => t.status === TaskStatuses.Completed)
    }

    const tasks = tasksForTodoList.map(t =>
        <Task key={t.id} task={t} todoListId={props.todolist.id} changeTaskTitle={props.changeTaskTitle}
              changeTaskStatus={props.changeTaskStatus} removeTask={props.removeTask}
              entityStatus={props.entityStatus}/>
    )

    const addTask = useCallback((title: string) => props.addTask(props.todolist.id, title), [props.addTask, props.todolist.id])
    const removeTodoList = () => {
        props.removeTodoList(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
            props.changeTodoListTitle(props.todolist.id, title)
        },
        [props.changeTodoListTitle, props.todolist.id])

    const onAllClickHandler = useCallback(() => {
            props.changeTodoListFilter(props.todolist.id, 'all')
        },
        [props.changeTodoListFilter, props.todolist.id])

    const onActiveClickHandler = useCallback(() => {
            props.changeTodoListFilter(props.todolist.id, 'active')
        },
        [props.changeTodoListFilter, props.todolist.id])

    const onCompletedClickHandler = useCallback(() => {
        props.changeTodoListFilter(props.todolist.id, 'completed')
    }, [props.changeTodoListFilter, props.todolist.id])

    return (
        <div style={{padding: '10px', position: 'relative'}}>
            <h3>
                <EditableSpan title={props.todolist.title} changeTitle={changeTodolistTitle}
                              entityStatus={props.entityStatus}/>
                <IconButton onClick={removeTodoList}
                            style={{position: 'absolute', right: '2px', top: '2px'}}
                            size={"small"}
                            disabled={props.entityStatus === 'loading'}
                >
                    <Delete/>
                </IconButton></h3>
            <AddItemForm addItem={addTask} entityStatus={props.entityStatus}/>
            <div>
                {tasks}
                {!tasksForTodoList.length && <div style={{padding: '10px', color: 'grey'}}>No task</div>}
            </div>
            <div>
                <Button onClick={onAllClickHandler}
                        size={"small"}
                        variant={props.todolist.filter === "all" ? "contained" : "text"}
                >All</Button>
                <Button onClick={onActiveClickHandler}
                        size={"small"}
                        variant={props.todolist.filter === "active" ? "contained" : "text"}
                        color={"primary"}
                >Active</Button>
                <Button onClick={onCompletedClickHandler}
                        size={"small"}
                        variant={props.todolist.filter === "completed" ? "contained" : "text"}
                        color={"secondary"}
                >Completed</Button>
            </div>
        </div>
    );
})

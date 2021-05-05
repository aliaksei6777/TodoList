import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

import {Task} from "./Task";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {FilterValuesType} from "../state/todolists-reducer";

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    changeTodoListFilter: (id: string, newFilterValue: FilterValuesType) => void
    addTask: (id: string, title: string) => void
    removeTodoList:(id: string) => void
    changeTaskTitle: (id: string, taskID: string, newTitle: string) => void
    changeTaskStatus:(id: string, taskID: string, status: TaskStatuses) => void
    removeTask: (id: string, taskID: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo((props: TodoListPropsType) => {
    // let todolist = useSelector<AppRootStateType,TodoListType>(state => state.todolists.filter(todo => todo.id === props.id)[0])
    // const dispatch = useDispatch()
    // let ownTasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    let tasksForTodoList = props.tasks
    if (props.filter === "active") {
        tasksForTodoList = tasksForTodoList.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(t => t.status === TaskStatuses.Completed)
    }

    const tasks = tasksForTodoList.map(t =>
       <Task key={t.taskId} task={t} todoListId={props.todoListId} changeTaskTitle={props.changeTaskTitle}
             changeTaskStatus={props.changeTaskStatus} removeTask={props.removeTask}/>
    )

    const addTask = useCallback((title: string) => props.addTask(props.todoListId,title),[props.addTask,props.todoListId])
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.todoListId,title)
    },[props.changeTodoListTitle, props.todoListId])
    const onAllClickHandler = useCallback(() => {
        props.changeTodoListFilter(props.todoListId,'all' )},[props.changeTodoListFilter,props.todoListId])
    const onActiveClickHandler = useCallback(() => {
        props.changeTodoListFilter(props.todoListId,'active' )},[props.changeTodoListFilter,props.todoListId])
    const onCompletedClickHandler = useCallback(() => {
        props.changeTodoListFilter(props.todoListId,'completed' )},[props.changeTodoListFilter,props.todoListId])

    return (
        <div style={{padding: '10px', position: 'relative'}}>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodoList}
                            style={{position: 'absolute', right: '2px', top: '2px'}}
                            size={"small"}
                >
                    <Delete/>
                </IconButton></h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasks}
                {!tasksForTodoList.length && <div style={{padding: '10px', color: 'grey'}}>No task</div>}
            </div>
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

import React, {useCallback, useEffect} from "react";
import {addTodolistTC,
    changeTodoListFilterAC,
    changeTodolistTitleTC,
    fetchTodolistTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {addTaskTC, removeTaskTC, TaskStateType, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./TodoList/TodoList";
import {Redirect} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn){
            return
        }
        dispatch(fetchTodolistTC())
    }, [])


    const addTask = useCallback((id: string, title: string) => {
        dispatch(addTaskTC(id, title))
    }, [dispatch])

    const removeTask = useCallback((id: string, taskID: string) => {
        dispatch(removeTaskTC(id, taskID))
    }, [dispatch])

    const changeTaskStatus = useCallback((id: string, taskID: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(id, taskID, {status}))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, taskID: string, newTitle: string) => {
        dispatch(updateTaskTC(id, taskID, {title: newTitle}))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const changeTodoListFilter = useCallback((id: string, newFilterValue: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(id, newFilterValue))
    }, [dispatch])

    const removeTodoList = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [dispatch])

    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(id, newTitle))
    }, [dispatch])

    if (!isLoggedIn){
        return <Redirect to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <div>
                    <h3>add new todolist</h3>
                    <div><AddItemForm addItem={addTodoList}/></div>
                </div>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(tl => {
                    return <Grid item key={tl.id}>
                        <Paper style={{padding: "10px"}}>
                            <Todolist
                                key={tl.id}
                                todolist={tl}
                                tasks={tasks[tl.id]}
                                entityStatus={tl.entityStatus}
                                removeTask={removeTask}
                                changeTodoListFilter={changeTodoListFilter}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                removeTodoList={removeTodoList}
                                changeTaskTitle={changeTaskTitle}
                                changeTodoListTitle={changeTodoListTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </>
    )
}
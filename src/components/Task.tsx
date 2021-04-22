import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../App";


export type TaskPropsType = {
    task: TaskType
    id: string
    changeTaskTitle: (id: string, taskID: string, newTitle: string) => void
    changeTaskStatus:(id: string, taskID: string, isDone: boolean) => void
    removeTask: (id: string, taskID: string) => void
}

export const Task:React.FC<TaskPropsType> = React.memo(({task,id,changeTaskTitle,changeTaskStatus,removeTask}) => {
    console.log("Task")
    const onRemoveTaskClickHandler = useCallback(() => removeTask(id,task.id),[removeTask,task.id,id])
    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        changeTaskStatus(id, task.id, e.currentTarget.checked ),[changeTaskStatus,task.id,id])
    const changeTitle = useCallback((newTitle: string) => {
        changeTaskTitle(id, task.id, newTitle)},[changeTaskTitle,task.id,id])
    return (
        <div key={task.id}>
            <Checkbox onChange={changeTaskStatusHandler} checked={task.isDone} />
            <EditableSpan title={task.title} changeTitle={changeTitle}/>
            <IconButton onClick={onRemoveTaskClickHandler}>
                <Delete/>
            </IconButton>
        </div>)
})



import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {RequestStatusType} from "../../../../app/app-reducer";


export type TaskPropsType = {
    task: TaskType
    todoListId: string
    changeTaskTitle: (id: string, taskID: string, newTitle: string) => void
    changeTaskStatus:(id: string, taskID: string, status: TaskStatuses) => void
    removeTask: (id: string, taskID: string) => void
    entityStatus?: RequestStatusType
}

export const Task:React.FC<TaskPropsType> = React.memo(({task,todoListId,changeTaskTitle,
                                                            changeTaskStatus,removeTask, entityStatus}) => {
    console.log("Task")
    const onRemoveTaskClickHandler = useCallback(() => removeTask(todoListId,task.id),
        [removeTask,task.id,todoListId])
    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        changeTaskStatus(todoListId, task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
        ,[changeTaskStatus,task.id,todoListId])
    const changeTitle = useCallback((newTitle: string) => {
        changeTaskTitle(todoListId, task.id, newTitle)},[changeTaskTitle,task.id,todoListId])
    return (
        <div key={task.id} style={{position: 'relative'}}>
            <Checkbox onChange={changeTaskStatusHandler} checked={task.status === TaskStatuses.Completed} />
            <EditableSpan title={task.title} changeTitle={changeTitle} entityStatus={entityStatus}/>
            <IconButton onClick={onRemoveTaskClickHandler} style={{ position: 'absolute', right: '5px'} }>
                <Delete/>
            </IconButton>
        </div>)
})



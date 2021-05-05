import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";

import {Task, TaskPropsType} from "./Task";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

export default {
    title: 'TodoList/Task',
    component: Task,
} as Meta;

const changeTaskStatus = action('Status changed inside Task')
const changeTaskTitle = action('Title changed inside Task')
const removeTask = action('Remove button inside Task')

const Template: Story<TaskPropsType> = (args:TaskPropsType) => <Task {...args} />;

const baseArgs = {
    changeTaskStatus: changeTaskStatus,
    changeTaskTitle: changeTaskTitle,
    removeTask: removeTask
}

export const TaskstatusExample = Template.bind({});
TaskstatusExample.args = {
    ...baseArgs,
    task: {taskId: '1', status: TaskStatuses.Completed ,title: 'JS',todoListId: '1', addedDate: "", 
        deadline: "", description:"", startDate: "", order: 0, priority: TaskPriorities.Low},
    todoListId: '1'
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {taskId: '2', status: TaskStatuses.New, title: 'HTML',todoListId: '2', addedDate: "",
        deadline: "", description:"", startDate: "", order: 0, priority: TaskPriorities.Low},
    todoListId: '2'
};


//old storybook

export const TaskBaseExample = () => {
    return <>
        <Task task={{
            taskId: '1', status: TaskStatuses.Completed, title: 'JS', todoListId: '1', addedDate: "",
            deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low
        }}
              todoListId={'1'}
              changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus}
              removeTask={removeTask}/>
        <Task task={{
            taskId: '2', status: TaskStatuses.New, title: 'TS', todoListId: '2', addedDate: "",
            deadline: "", description: "", startDate: "", order: 0, priority: TaskPriorities.Low
        }}
              todoListId={'2'}
              changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus}
              removeTask={removeTask}/>
    </>
}
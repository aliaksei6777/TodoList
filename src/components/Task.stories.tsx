import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";

import {Task, TaskPropsType} from "./Task";

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

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: true ,title: 'JS'},
    id: '1'
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '2', isDone: false, title: 'HTML'},
    id: '2'
};


//old storybook

export const TaskBaseExample = () => {
    return <>
        <Task task={{id: '1', isDone: true ,title: 'JS'}}
              id={'1'}
              changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus}
              removeTask={removeTask}/>
        <Task task={{id: '2', isDone: false ,title: 'TS'}}
              id={'2'}
              changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus}
              removeTask={removeTask}/>
    </>
}
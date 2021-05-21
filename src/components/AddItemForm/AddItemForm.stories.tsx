import React from 'react';
import {Meta, Story} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";



export default {
    title: 'TodoList/AddItemFormExample',
    component: AddItemForm
} as Meta;

const Template: Story<AddItemFormPropsType> = (args:AddItemFormPropsType) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem: action('Button inside form clicked')
};



//old storybook

const callback = action('Button inside form clicked')

export const AddItemFormDisableExample = () => {
    return <>
        <AddItemForm addItem={callback} entityStatus={"loading"}/>
    </>
}
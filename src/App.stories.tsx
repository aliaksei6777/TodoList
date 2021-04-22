import React from 'react';
import {Meta, Story} from '@storybook/react';
import App from "./App";
import {ReduxStoreProviderDecorator} from "./state/ReduxStoreProviderDecorator";


export default {
    title: 'TodoList/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = () => <App />

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};


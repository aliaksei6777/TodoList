import React from 'react';
import {Meta, Story} from '@storybook/react';
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";


export default {
    title: 'TodoList/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = () => <App demo={true} />

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};

// export const AppBaseExample = (props: any) => {
//     return (<App demo={true}/>)
// }
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tabs } from './Tabs';
import { action } from '@storybook/addon-actions';


export default {
    title: 'shared/Tabs',
    component: Tabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    value:'first',
    tabs:[
        {value:'first', content:'first con'},
         {value:'second', content:'second con'},
          {value:'third', content:'third con'},
    ],
    onTabClick:action('onTabClick ')

};


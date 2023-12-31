import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Card } from './Card';
import { Text } from '../Text/Text';
import { TextAlign } from 'shared/ui/Text/Text';

export default {
  title: 'shared/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <Text title='some text' text='some text' align={TextAlign.CENTER} />,
};

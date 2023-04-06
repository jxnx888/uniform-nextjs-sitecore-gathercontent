import React from 'react';

import Button from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Common/button',
  component: Button,
  argTypes: {
    type: {
      control: {
        type: "select",
        options: ['default', 'primary', 'ghost', 'dashed', 'link', 'text', undefined]
      },
      description:'Can be set to primary ghost dashed link text default',
      defaultValue: { summary: 'primary' }
    },
    content:{
      description: 'button Text',
      defaultValue: { summary: 'Button' }
    },
    onClick:{
      description: 'Set the handler to handle click event',
      defaultValue: { summary: '(event) => void' }
    },
    disabled:{
      description: 'Disabled state of button',
      defaultValue: { summary: false }
    },
    danger:{
      description: 'Set the danger status of button',
      defaultValue: { summary: false }
    },
    loading:{
      description: 'Set the loading status of button',
      defaultValue: { summary: false }
    }
  }
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: any) => <Button {...args} />;

export const Default = Template.bind({});
// @ts-ignore
Default.args = {
  type: 'default',
  content: 'Button',
  onClick: (e: string) => {
    alert('button Clicked')
  },
  disabled: false,
  danger: false,
  loading: false
};
export const primary = Template.bind({});
// @ts-ignore
primary.args = {
  type: 'primary',
  content: 'Button',
  onClick: (e: string) => {
    alert('button Clicked')
  },
  disabled: false,
  danger: false,
  loading: false
};
export const ghost = Template.bind({});
// @ts-ignore
ghost.args = {
  type: 'ghost',
  content: 'Button',
  onClick: (e: string) => {
    alert('button Clicked')
  },
  disabled: false,
  danger: false,
  loading: false
};
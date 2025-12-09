import type { Meta, StoryObj } from '@storybook/react';
import Score from './Score';

const meta = {
  title: 'Core/Score',
  component: Score,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The score value to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Score>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '8.5',
  },
};

export const HighScore: Story = {
  args: {
    value: '9.8',
  },
};

export const LowScore: Story = {
  args: {
    value: '3.2',
  },
};

export const NotAvailable: Story = {
  args: {
    value: 'N/A',
  },
};

export const NoValue: Story = {
  args: {},
};
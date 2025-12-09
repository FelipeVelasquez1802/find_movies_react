import type { Meta, StoryObj } from '@storybook/react';
import Chip from './Chip';

const meta = {
  title: 'Core/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content of the chip',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Action',
  },
};

export const Drama: Story = {
  args: {
    text: 'Drama',
  },
};

export const Comedy: Story = {
  args: {
    text: 'Comedy',
  },
};

export const LongText: Story = {
  args: {
    text: 'Science Fiction & Fantasy',
  },
};
import type { Meta, StoryObj } from '@storybook/react';
import ErrorState from './ErrorState';

const meta = {
  title: 'Shared/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The error title',
    },
    message: {
      control: 'text',
      description: 'The error message',
    },
    buttonText: {
      control: 'text',
      description: 'The button text',
    },
    variant: {
      control: 'select',
      options: ['page', 'section'],
      description: 'The variant of the error state',
    },
    onButtonClick: {
      description: 'Callback when button is clicked',
    },
  },
  args: {
    onButtonClick: () => console.log('Button clicked'),
  },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SectionVariant: Story = {
  args: {
    variant: 'section',
  },
};

export const PageVariant: Story = {
  args: {
    variant: 'page',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const CustomContent: Story = {
  args: {
    title: 'Network Error',
    message: 'Unable to connect to the server. Please check your internet connection.',
    buttonText: 'Try Again',
    variant: 'section',
  },
};

export const CustomContentPage: Story = {
  args: {
    title: '404 Not Found',
    message: 'The page you are looking for does not exist.',
    buttonText: 'Go Home',
    variant: 'page',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
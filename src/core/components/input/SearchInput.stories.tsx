import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SearchInput from './SearchInput';

const meta = {
  title: 'Core/Input/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    search: {
      control: 'text',
      description: 'The search input value',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    onChangeSearch: {
      description: 'Callback when search value changes',
    },
    onFocus: {
      description: 'Callback when input is focused',
    },
  },
  args: {
    onChangeSearch: (value: string) => console.log('Search changed:', value),
    onFocus: () => console.log('Input focused'),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    search: '',
    placeholder: 'Search movies...',
  },
};

export const WithValue: Story = {
  args: {
    search: 'The Matrix',
    placeholder: 'Search movies...',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    search: '',
    placeholder: 'Search for your favorite movies and TV shows...',
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [search, setSearch] = useState('');
    return (
      <SearchInput
        {...args}
        search={search}
        onChangeSearch={(value) => {
          setSearch(value);
          args.onChangeSearch?.(value);
        }}
      />
    );
  },
  args: {
    search: '',
    placeholder: 'Try typing something...',
  },
};
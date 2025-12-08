import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
    it('renders with empty search value', () => {
        const handleChange = vi.fn();
        render(<SearchInput search="" onChangeSearch={handleChange} />);

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('');
    });

    it('renders with initial search value', () => {
        const handleChange = vi.fn();
        render(<SearchInput search="test query" onChangeSearch={handleChange} />);

        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('test query');
    });

    it('displays custom placeholder', () => {
        const handleChange = vi.fn();
        render(<SearchInput search="" onChangeSearch={handleChange} placeholder="Search movies..." />);

        expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument();
    });

    it('calls onChangeSearch when typing', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();

        render(<SearchInput search="" onChangeSearch={handleChange} />);

        const input = screen.getByRole('textbox');
        await user.type(input, 'a');

        expect(handleChange).toHaveBeenCalledWith('a');
    });

    it('calls onFocus when input is focused', async () => {
        const handleChange = vi.fn();
        const handleFocus = vi.fn();
        const user = userEvent.setup();

        render(<SearchInput search="" onChangeSearch={handleChange} onFocus={handleFocus} />);

        const input = screen.getByRole('textbox');
        await user.click(input);

        expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('shows clear button when search has value', () => {
        const handleChange = vi.fn();
        const { container } = render(<SearchInput search="test" onChangeSearch={handleChange} />);

        const clearButton = container.querySelector('svg[class*="lucide-x"]');
        expect(clearButton).toBeInTheDocument();
    });

    it('hides clear button when search is empty', () => {
        const handleChange = vi.fn();
        const { container } = render(<SearchInput search="" onChangeSearch={handleChange} />);

        const clearButton = container.querySelector('svg[class*="lucide-x"]');
        expect(clearButton).not.toBeInTheDocument();
    });

    it('clears search when clear button is clicked', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();
        const { container } = render(<SearchInput search="test query" onChangeSearch={handleChange} />);

        const clearButton = container.querySelector('svg[class*="lucide-x"]');
        if (clearButton) {
            await user.click(clearButton);
            expect(handleChange).toHaveBeenCalledWith('');
        }
    });

    it('renders search icon', () => {
        const handleChange = vi.fn();
        const { container } = render(<SearchInput search="" onChangeSearch={handleChange} />);

        const searchIcon = container.querySelector('svg[class*="lucide-search"]');
        expect(searchIcon).toBeInTheDocument();
    });

    it('applies focus-within styles to container', () => {
        const handleChange = vi.fn();
        const { container } = render(<SearchInput search="" onChangeSearch={handleChange} />);

        const wrapper = container.querySelector('.focus-within\\:ring-2');
        expect(wrapper).toBeInTheDocument();
    });
});
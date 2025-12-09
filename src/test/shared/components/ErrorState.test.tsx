import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorState from '@/shared/components/ErrorState';

describe('ErrorState', () => {
    it('renders with default props', () => {
        render(<ErrorState />);

        expect(screen.getByText('Oops....')).toBeInTheDocument();
        expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument();
    });

    it('renders with custom props', () => {
        render(
            <ErrorState
                title="Custom Error"
                message="Custom message"
                buttonText="Try Again"
            />
        );

        expect(screen.getByText('Custom Error')).toBeInTheDocument();
        expect(screen.getByText('Custom message')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });

    it('applies page variant styles', () => {
        const { container } = render(<ErrorState variant="page" />);

        const title = screen.getByText('Oops....');
        expect(title).toHaveClass('text-white', 'text-4xl');

        const wrapper = container.querySelector('.flex-1');
        expect(wrapper).toBeInTheDocument();
    });

    it('applies section variant styles', () => {
        const { container } = render(<ErrorState variant="section" />);

        const title = screen.getByText('Oops....');
        expect(title).toHaveClass('text-gray-900', 'text-2xl');

        const wrapper = container.querySelector('.py-20');
        expect(wrapper).toBeInTheDocument();
    });

    it('calls onButtonClick when button is clicked', async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(<ErrorState onButtonClick={handleClick} />);

        const button = screen.getByRole('button', { name: /refresh/i });
        await user.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders error image icon', () => {
        render(<ErrorState />);

        const img = screen.getByAltText('Connection error');
        expect(img).toBeInTheDocument();
        expect(img).toHaveClass('w-60');
    });

    it('renders larger image for page variant', () => {
        render(<ErrorState variant="page" />);

        const img = screen.getByAltText('Connection error');
        expect(img).toHaveClass('w-80');
    });
});
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Chip from '@/core/components/Chip';

describe('Chip', () => {
    it('renders with provided text', () => {
        render(<Chip text="Action" />);

        expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('applies correct styling classes', () => {
        const { container } = render(<Chip text="Drama" />);

        const span = container.querySelector('span');
        expect(span).toHaveClass(
            'px-3',
            'py-1',
            'bg-gray-dark',
            'text-white',
            'text-sm',
            'rounded-full'
        );
    });

    it('renders multiple chips independently', () => {
        const { rerender } = render(<Chip text="Action" />);
        expect(screen.getByText('Action')).toBeInTheDocument();

        rerender(<Chip text="Comedy" />);
        expect(screen.getByText('Comedy')).toBeInTheDocument();
    });
});
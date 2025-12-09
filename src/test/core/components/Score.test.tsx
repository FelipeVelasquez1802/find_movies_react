import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Score from '@/core/components/Score';

describe('Score', () => {
    it('renders with default value N/A', () => {
        render(<Score />);

        expect(screen.getByText('⭐')).toBeInTheDocument();
        expect(screen.getByText('N/A')).toBeInTheDocument();
    });

    it('renders with custom value', () => {
        render(<Score value="8.5" />);

        expect(screen.getByText('8.5')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<Score value="7.5" className="custom-class" />);

        const scoreDiv = container.querySelector('.custom-class');
        expect(scoreDiv).toBeInTheDocument();
        expect(scoreDiv).toHaveClass('custom-class');
    });

    it('has correct default styling classes', () => {
        const { container } = render(<Score />);

        const scoreDiv = container.firstChild;
        expect(scoreDiv).toHaveClass('flex', 'gap-2', 'bg-black', 'text-white', 'w-fit', 'p-4');
    });
});
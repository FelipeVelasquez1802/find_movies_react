import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeaderMovieDetail from '@/pages/movies/detail/components/HeaderMovieDetail';

describe('HeaderMovieDetail', () => {
    const defaultProps = {
        type: 'MOVIE',
        title: 'The Matrix',
        score: '8.7',
        voteCount: 25000,
        year: 1999,
    };

    it('renders all required information', () => {
        render(<HeaderMovieDetail {...defaultProps} />);

        expect(screen.getByText('MOVIE')).toBeInTheDocument();
        expect(screen.getByText('The Matrix')).toBeInTheDocument();
        expect(screen.getByText(/8.7/)).toBeInTheDocument();
        expect(screen.getByText('1999')).toBeInTheDocument();
    });

    it('formats vote count with thousands separator', () => {
        render(<HeaderMovieDetail {...defaultProps} />);

        expect(screen.getByText('25,000')).toBeInTheDocument();
    });

    it('displays ratings text', () => {
        render(<HeaderMovieDetail {...defaultProps} />);

        expect(screen.getByText('ratings')).toBeInTheDocument();
    });

    it('displays duration when provided', () => {
        render(<HeaderMovieDetail {...defaultProps} duration="2h 30m" />);

        expect(screen.getByText('2h 30m')).toBeInTheDocument();
        expect(screen.getByText('•')).toBeInTheDocument();
    });

    it('does not display duration separator when duration is not provided', () => {
        render(<HeaderMovieDetail {...defaultProps} />);

        expect(screen.queryByText('•')).not.toBeInTheDocument();
    });

    it('renders with string year', () => {
        render(<HeaderMovieDetail {...defaultProps} year="2024" />);

        expect(screen.getByText('2024')).toBeInTheDocument();
    });

    it('applies correct styling classes', () => {
        const { container } = render(<HeaderMovieDetail {...defaultProps} />);

        const header = container.querySelector('.bg-linear-to-r');
        expect(header).toBeInTheDocument();
    });

    it('displays type with primary color', () => {
        const { container } = render(<HeaderMovieDetail {...defaultProps} />);

        const typeElement = screen.getByText('MOVIE');
        expect(typeElement).toHaveClass('text-primary');
    });

    it('formats large vote counts correctly', () => {
        render(<HeaderMovieDetail {...defaultProps} voteCount={1234567} />);

        expect(screen.getByText('1,234,567')).toBeInTheDocument();
    });
});
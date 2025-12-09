import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContentMovieDetail from '@/pages/movies/detail/components/ContentMovieDetail';
import type { Genre, CastMember } from '@/modules/movies/models/entity';

describe('ContentMovieDetail', () => {
    const mockGenres: Genre[] = [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Sci-Fi' },
    ];

    const mockStars: CastMember[] = [
        { id: 1, name: 'Keanu Reeves', character: 'Neo', profilePath: null, order: 0 },
        { id: 2, name: 'Laurence Fishburne', character: 'Morpheus', profilePath: null, order: 1 },
        { id: 3, name: 'Carrie-Anne Moss', character: 'Trinity', profilePath: null, order: 2 },
        { id: 4, name: 'Hugo Weaving', character: 'Agent Smith', profilePath: null, order: 3 },
    ];

    const defaultProps = {
        imagePath: '/path/to/poster.jpg',
        title: 'The Matrix',
        genres: mockGenres,
        description: 'A computer hacker learns from mysterious rebels about the true nature of his reality.',
    };

    it('renders movie poster with correct alt text', () => {
        render(<ContentMovieDetail {...defaultProps} />);

        const img = screen.getByAltText('The Matrix');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/path/to/poster.jpg');
    });

    it('renders description', () => {
        render(<ContentMovieDetail {...defaultProps} />);

        expect(screen.getByText(/A computer hacker learns/)).toBeInTheDocument();
    });

    it('renders genre chips', () => {
        render(<ContentMovieDetail {...defaultProps} />);

        expect(screen.getByText('Action')).toBeInTheDocument();
        expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
    });

    it('does not render genres section when genres array is empty', () => {
        render(<ContentMovieDetail {...defaultProps} genres={[]} />);

        expect(screen.queryByText('Action')).not.toBeInTheDocument();
    });

    it('renders director when provided', () => {
        render(<ContentMovieDetail {...defaultProps} director="Lana Wachowski" />);

        expect(screen.getByText('Director:')).toBeInTheDocument();
        expect(screen.getByText('Lana Wachowski')).toBeInTheDocument();
    });

    it('does not render director when not provided', () => {
        render(<ContentMovieDetail {...defaultProps} />);

        expect(screen.queryByText('Director:')).not.toBeInTheDocument();
    });

    it('renders screenplay when provided', () => {
        render(<ContentMovieDetail {...defaultProps} screenplay="Lana Wachowski, Lilly Wachowski" />);

        expect(screen.getByText('Screenplay:')).toBeInTheDocument();
        expect(screen.getByText('Lana Wachowski, Lilly Wachowski')).toBeInTheDocument();
    });

    it('does not render screenplay when not provided', () => {
        render(<ContentMovieDetail {...defaultProps} />);

        expect(screen.queryByText('Screenplay:')).not.toBeInTheDocument();
    });

    it('renders stars (max 3) when provided', () => {
        render(<ContentMovieDetail {...defaultProps} stars={mockStars} />);

        expect(screen.getByText('Stars:')).toBeInTheDocument();
        expect(screen.getByText('Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss')).toBeInTheDocument();
    });

    it('does not include 4th star in display', () => {
        render(<ContentMovieDetail {...defaultProps} stars={mockStars} />);

        const starsText = screen.getByText(/Keanu Reeves/);
        expect(starsText.textContent).not.toContain('Hugo Weaving');
    });

    it('does not render stars when not provided', () => {
        render(<ContentMovieDetail {...defaultProps} />);

        expect(screen.queryByText('Stars:')).not.toBeInTheDocument();
    });

    it('renders countries when provided', () => {
        render(<ContentMovieDetail {...defaultProps} countries={['United States', 'Australia']} />);

        expect(screen.getByText('Countries of Origin:')).toBeInTheDocument();
        expect(screen.getByText('United States, Australia')).toBeInTheDocument();
    });

    it('does not render countries when not provided', () => {
        render(<ContentMovieDetail {...defaultProps} />);

        expect(screen.queryByText('Countries of Origin:')).not.toBeInTheDocument();
    });

    it('renders formatted release date when provided', () => {
        render(<ContentMovieDetail {...defaultProps} releaseDate="1999-03-31" />);

        expect(screen.getByText('Release Date:')).toBeInTheDocument();
        expect(screen.getByText(/March (30|31), 1999/)).toBeInTheDocument();
    });

    it('does not render release date when not provided', () => {
        render(<ContentMovieDetail {...defaultProps} />);

        expect(screen.queryByText('Release Date:')).not.toBeInTheDocument();
    });

    it('renders all optional fields when all are provided', () => {
        render(
            <ContentMovieDetail
                {...defaultProps}
                director="Lana Wachowski"
                screenplay="Lana Wachowski, Lilly Wachowski"
                stars={mockStars}
                countries={['United States']}
                releaseDate="1999-03-31"
            />
        );

        expect(screen.getByText('Director:')).toBeInTheDocument();
        expect(screen.getByText('Screenplay:')).toBeInTheDocument();
        expect(screen.getByText('Stars:')).toBeInTheDocument();
        expect(screen.getByText('Countries of Origin:')).toBeInTheDocument();
        expect(screen.getByText('Release Date:')).toBeInTheDocument();
    });
});
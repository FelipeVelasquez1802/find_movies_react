import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MediaCard from './MediaCard';
import type { BaseMedia } from '@/modules/movies/models/entity';

describe('MediaCard', () => {
    const mockMedia: BaseMedia = {
        id: 1,
        title: 'Test Movie',
        posterPath: '/test-poster.jpg',
        voteAverage: 8.5,
        releaseDate: '2024-01-01',
        mediaType: 'movie',
    };

    it('renders movie title', () => {
        render(<MediaCard media={mockMedia} />);

        expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });

    it('renders movie poster with correct alt text', () => {
        render(<MediaCard media={mockMedia} />);

        const img = screen.getByAltText('Test Movie');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', expect.stringContaining('/test-poster.jpg'));
    });

    it('displays placeholder image when posterPath is null', () => {
        const mediaWithoutPoster = { ...mockMedia, posterPath: null };
        render(<MediaCard media={mediaWithoutPoster} />);

        const img = screen.getByAltText('Test Movie');
        expect(img).toHaveAttribute('src', 'https://via.placeholder.com/342x513?text=No+Image');
    });

    it('displays score when voteAverage is greater than 0', () => {
        render(<MediaCard media={mockMedia} />);

        expect(screen.getByText('8.5')).toBeInTheDocument();
    });

    it('displays N/A score when voteAverage is 0', () => {
        const mediaWithZeroScore = { ...mockMedia, voteAverage: 0 };
        render(<MediaCard media={mediaWithZeroScore} />);

        expect(screen.getByText('N/A')).toBeInTheDocument();
    });

    it('calls onClick when card is clicked', async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(<MediaCard media={mockMedia} onClick={handleClick} />);

        const card = screen.getByText('Test Movie').closest('div')?.parentElement;
        if (card) {
            await user.click(card);
            expect(handleClick).toHaveBeenCalledTimes(1);
        }
    });

    it('has correct width class', () => {
        const { container } = render(<MediaCard media={mockMedia} />);

        const card = container.firstChild;
        expect(card).toHaveClass('w-48');
    });

    it('applies hover transform effect', () => {
        const { container } = render(<MediaCard media={mockMedia} />);

        const imageContainer = container.querySelector('.hover\\:-translate-y-2');
        expect(imageContainer).toBeInTheDocument();
    });

    it('image has lazy loading attribute', () => {
        render(<MediaCard media={mockMedia} />);

        const img = screen.getByAltText('Test Movie');
        expect(img).toHaveAttribute('loading', 'lazy');
    });
});
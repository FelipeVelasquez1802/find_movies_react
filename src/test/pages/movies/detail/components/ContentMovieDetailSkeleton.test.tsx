import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ContentMovieDetailSkeleton from '@/pages/movies/detail/components/ContentMovieDetailSkeleton';

describe('ContentMovieDetailSkeleton', () => {
    it('renders skeleton structure', () => {
        const { container } = render(<ContentMovieDetailSkeleton />);

        expect(container.firstChild).toBeInTheDocument();
    });

    it('has animate-pulse class for animation', () => {
        const { container } = render(<ContentMovieDetailSkeleton />);

        const skeleton = container.querySelector('.animate-pulse');
        expect(skeleton).toBeInTheDocument();
    });

    it('renders poster placeholder with correct dimensions', () => {
        const { container } = render(<ContentMovieDetailSkeleton />);

        const posterPlaceholder = container.querySelector('.w-64.h-96.bg-gray-700.rounded-lg');
        expect(posterPlaceholder).toBeInTheDocument();
    });

    it('renders genre chip placeholders', () => {
        const { container } = render(<ContentMovieDetailSkeleton />);

        const genrePlaceholders = container.querySelectorAll('.h-8.bg-gray-700.rounded-full');
        expect(genrePlaceholders.length).toBeGreaterThanOrEqual(3);
    });

    it('renders description placeholders', () => {
        const { container } = render(<ContentMovieDetailSkeleton />);

        const descriptionPlaceholders = container.querySelectorAll('.h-4.bg-gray-700.rounded.w-full, .h-4.bg-gray-700.rounded.w-3\\/4');
        expect(descriptionPlaceholders.length).toBeGreaterThanOrEqual(3);
    });

    it('renders metadata placeholders', () => {
        const { container } = render(<ContentMovieDetailSkeleton />);

        const metadataPlaceholders = container.querySelectorAll('.h-5.bg-gray-700.rounded');
        expect(metadataPlaceholders.length).toBeGreaterThanOrEqual(5);
    });

    it('has correct layout structure', () => {
        const { container } = render(<ContentMovieDetailSkeleton />);

        const flexRow = container.querySelector('.flex.flex-row.gap-8');
        expect(flexRow).toBeInTheDocument();
    });

    it('has correct padding', () => {
        const { container } = render(<ContentMovieDetailSkeleton />);

        const content = container.querySelector('.px-24.py-12');
        expect(content).toBeInTheDocument();
    });

    it('poster placeholder has shrink-0 class', () => {
        const { container } = render(<ContentMovieDetailSkeleton />);

        const posterPlaceholder = container.querySelector('.shrink-0');
        expect(posterPlaceholder).toBeInTheDocument();
    });
});
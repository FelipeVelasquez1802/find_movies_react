import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import HeaderMovieDetailSkeleton from '@/pages/movies/detail/components/HeaderMovieDetailSkeleton';

describe('HeaderMovieDetailSkeleton', () => {
    it('renders skeleton structure', () => {
        const { container } = render(<HeaderMovieDetailSkeleton />);

        expect(container.firstChild).toBeInTheDocument();
    });

    it('has animate-pulse class for animation', () => {
        const { container } = render(<HeaderMovieDetailSkeleton />);

        const skeleton = container.querySelector('.animate-pulse');
        expect(skeleton).toBeInTheDocument();
    });

    it('renders type placeholder', () => {
        const { container } = render(<HeaderMovieDetailSkeleton />);

        const typePlaceholder = container.querySelector('.h-6.w-20.bg-gray-700.rounded');
        expect(typePlaceholder).toBeInTheDocument();
    });

    it('renders title placeholder', () => {
        const { container } = render(<HeaderMovieDetailSkeleton />);

        const titlePlaceholder = container.querySelector('.h-10.w-96.bg-gray-700.rounded');
        expect(titlePlaceholder).toBeInTheDocument();
    });

    it('renders score placeholder', () => {
        const { container } = render(<HeaderMovieDetailSkeleton />);

        const scorePlaceholder = container.querySelector('.h-10.w-16.bg-gray-700.rounded');
        expect(scorePlaceholder).toBeInTheDocument();
    });

    it('renders vote count placeholders', () => {
        const { container } = render(<HeaderMovieDetailSkeleton />);

        const voteCountPlaceholders = container.querySelectorAll('.h-4.w-16.bg-gray-700.rounded, .h-3.w-12.bg-gray-700.rounded');
        expect(voteCountPlaceholders.length).toBeGreaterThanOrEqual(2);
    });

    it('renders year and duration placeholders', () => {
        const { container } = render(<HeaderMovieDetailSkeleton />);

        const metadataPlaceholders = container.querySelectorAll('.h-5.bg-gray-700.rounded');
        expect(metadataPlaceholders.length).toBeGreaterThanOrEqual(2);
    });

    it('has correct background gradient', () => {
        const { container } = render(<HeaderMovieDetailSkeleton />);

        const header = container.querySelector('.bg-linear-to-r.from-gray-dark.via-black.to-gray-dark');
        expect(header).toBeInTheDocument();
    });

    it('has correct padding', () => {
        const { container } = render(<HeaderMovieDetailSkeleton />);

        const header = container.querySelector('.px-24.py-12');
        expect(header).toBeInTheDocument();
    });
});
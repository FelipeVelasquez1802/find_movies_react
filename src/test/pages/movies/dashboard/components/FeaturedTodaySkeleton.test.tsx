import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import FeaturedTodaySkeleton from '@/pages/movies/dashboard/components/FeaturedTodaySkeleton';

describe('FeaturedTodaySkeleton', () => {
    it('renders skeleton structure', () => {
        const { container } = render(<FeaturedTodaySkeleton />);

        expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('renders title placeholder with animation', () => {
        const { container } = render(<FeaturedTodaySkeleton />);

        const titlePlaceholder = container.querySelector('.h-8.w-48.bg-gray-700.rounded.mb-4.animate-pulse');
        expect(titlePlaceholder).toBeInTheDocument();
    });

    it('renders two tab placeholders', () => {
        const { container } = render(<FeaturedTodaySkeleton />);

        const tabPlaceholders = container.querySelectorAll('.h-10.w-24.bg-gray-700.rounded.animate-pulse');
        expect(tabPlaceholders).toHaveLength(2);
    });

    it('renders 6 MediaCardSkeleton components', () => {
        const { container } = render(<FeaturedTodaySkeleton />);

        const cardSkeletons = container.querySelectorAll('.w-48.animate-pulse');
        expect(cardSkeletons.length).toBeGreaterThanOrEqual(6);
    });

    it('has correct section padding', () => {
        const { container } = render(<FeaturedTodaySkeleton />);

        const section = container.querySelector('section');
        expect(section).toHaveClass('px-8', 'py-6');
    });

    it('has overflow-hidden on cards container', () => {
        const { container } = render(<FeaturedTodaySkeleton />);

        const cardsContainer = container.querySelector('.overflow-hidden');
        expect(cardsContainer).toBeInTheDocument();
    });
});
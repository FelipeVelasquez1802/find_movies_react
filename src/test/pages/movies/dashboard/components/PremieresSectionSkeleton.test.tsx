import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import PremieresSectionSkeleton from '@/pages/movies/dashboard/components/PremieresSectionSkeleton';

describe('PremieresSectionSkeleton', () => {
    it('renders skeleton structure', () => {
        const { container } = render(<PremieresSectionSkeleton />);

        expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('renders title placeholder with animation', () => {
        const { container } = render(<PremieresSectionSkeleton />);

        const titlePlaceholder = container.querySelector('.h-8.w-64.bg-gray-700.rounded.mb-4.animate-pulse');
        expect(titlePlaceholder).toBeInTheDocument();
    });

    it('renders 6 MediaCardSkeleton components', () => {
        const { container } = render(<PremieresSectionSkeleton />);

        const cardSkeletons = container.querySelectorAll('.w-48.animate-pulse');
        expect(cardSkeletons.length).toBeGreaterThanOrEqual(6);
    });

    it('has correct section padding', () => {
        const { container } = render(<PremieresSectionSkeleton />);

        const section = container.querySelector('section');
        expect(section).toHaveClass('px-8', 'py-6');
    });

    it('has overflow-hidden on cards container', () => {
        const { container } = render(<PremieresSectionSkeleton />);

        const cardsContainer = container.querySelector('.overflow-hidden');
        expect(cardsContainer).toBeInTheDocument();
    });

    it('has gap-4 spacing between cards', () => {
        const { container } = render(<PremieresSectionSkeleton />);

        const cardsContainer = container.querySelector('.gap-4');
        expect(cardsContainer).toBeInTheDocument();
    });
});
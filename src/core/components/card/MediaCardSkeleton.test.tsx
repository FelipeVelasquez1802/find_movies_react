import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import MediaCardSkeleton from './MediaCardSkeleton';

describe('MediaCardSkeleton', () => {
    it('renders skeleton structure', () => {
        const { container } = render(<MediaCardSkeleton />);

        expect(container.firstChild).toBeInTheDocument();
    });

    it('has animate-pulse class for animation', () => {
        const { container } = render(<MediaCardSkeleton />);

        const skeleton = container.firstChild;
        expect(skeleton).toHaveClass('animate-pulse');
    });

    it('has correct width class matching MediaCard', () => {
        const { container } = render(<MediaCardSkeleton />);

        const skeleton = container.firstChild;
        expect(skeleton).toHaveClass('w-48');
    });

    it('has gray background colors for skeleton effect', () => {
        const { container } = render(<MediaCardSkeleton />);

        const imageContainer = container.querySelector('.bg-gray-700');
        expect(imageContainer).toBeInTheDocument();

        const imagePlaceholder = container.querySelector('.bg-gray-600');
        expect(imagePlaceholder).toBeInTheDocument();
    });

    it('has correct dimensions matching MediaCard', () => {
        const { container } = render(<MediaCardSkeleton />);

        const imagePlaceholder = container.querySelector('.w-48.h-72');
        expect(imagePlaceholder).toBeInTheDocument();
    });

    it('includes title placeholder', () => {
        const { container } = render(<MediaCardSkeleton />);

        const titlePlaceholder = container.querySelector('.h-4.bg-gray-700.rounded');
        expect(titlePlaceholder).toBeInTheDocument();
    });
});
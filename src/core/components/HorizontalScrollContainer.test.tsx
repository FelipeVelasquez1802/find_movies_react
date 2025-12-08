import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HorizontalScrollContainer from './HorizontalScrollContainer';

describe('HorizontalScrollContainer', () => {
    it('renders children correctly', () => {
        render(
            <HorizontalScrollContainer>
                <div>Child 1</div>
                <div>Child 2</div>
                <div>Child 3</div>
            </HorizontalScrollContainer>
        );

        expect(screen.getByText('Child 1')).toBeInTheDocument();
        expect(screen.getByText('Child 2')).toBeInTheDocument();
        expect(screen.getByText('Child 3')).toBeInTheDocument();
    });

    it('renders left scroll button', () => {
        render(
            <HorizontalScrollContainer>
                <div>Content</div>
            </HorizontalScrollContainer>
        );

        const leftButton = screen.getByLabelText('Scroll left');
        expect(leftButton).toBeInTheDocument();
    });

    it('renders right scroll button', () => {
        render(
            <HorizontalScrollContainer>
                <div>Content</div>
            </HorizontalScrollContainer>
        );

        const rightButton = screen.getByLabelText('Scroll right');
        expect(rightButton).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(
            <HorizontalScrollContainer className="custom-class">
                <div>Content</div>
            </HorizontalScrollContainer>
        );

        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass('custom-class');
    });

    it('scroll buttons have correct styling classes', () => {
        render(
            <HorizontalScrollContainer>
                <div>Content</div>
            </HorizontalScrollContainer>
        );

        const leftButton = screen.getByLabelText('Scroll left');
        const rightButton = screen.getByLabelText('Scroll right');

        expect(leftButton).toHaveClass('border-2', 'border-white');
        expect(rightButton).toHaveClass('border-2', 'border-white');
    });

    it('calls scrollTo when left button is clicked', async () => {
        const user = userEvent.setup();
        const mockScrollTo = vi.fn();

        render(
            <HorizontalScrollContainer>
                <div>Content</div>
            </HorizontalScrollContainer>
        );

        const scrollContainer = screen.getByText('Content').parentElement;
        if (scrollContainer) {
            scrollContainer.scrollTo = mockScrollTo;
        }

        const leftButton = screen.getByLabelText('Scroll left');
        await user.click(leftButton);

        expect(mockScrollTo).toHaveBeenCalled();
    });

    it('calls scrollTo when right button is clicked', async () => {
        const user = userEvent.setup();
        const mockScrollTo = vi.fn();

        render(
            <HorizontalScrollContainer>
                <div>Content</div>
            </HorizontalScrollContainer>
        );

        const scrollContainer = screen.getByText('Content').parentElement;
        if (scrollContainer) {
            scrollContainer.scrollTo = mockScrollTo;
        }

        const rightButton = screen.getByLabelText('Scroll right');
        await user.click(rightButton);

        expect(mockScrollTo).toHaveBeenCalled();
    });

    it('has overflow-x-auto class on scroll container', () => {
        const { container } = render(
            <HorizontalScrollContainer>
                <div>Content</div>
            </HorizontalScrollContainer>
        );

        const scrollContainer = container.querySelector('.overflow-x-auto');
        expect(scrollContainer).toBeInTheDocument();
    });

    it('has smooth scroll behavior', () => {
        const { container } = render(
            <HorizontalScrollContainer>
                <div>Content</div>
            </HorizontalScrollContainer>
        );

        const scrollContainer = container.querySelector('.scroll-smooth');
        expect(scrollContainer).toBeInTheDocument();
    });
});
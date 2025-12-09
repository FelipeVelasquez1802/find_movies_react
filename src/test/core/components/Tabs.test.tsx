import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tabs, { type Tab } from '@/core/components/Tabs';

describe('Tabs', () => {
    const mockTabs: Tab[] = [
        { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
        { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
        { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
    ];

    it('renders all tab labels', () => {
        const handleTabChange = vi.fn();
        render(<Tabs tabs={mockTabs} activeTab="tab1" onTabChange={handleTabChange} />);

        expect(screen.getByText('Tab 1')).toBeInTheDocument();
        expect(screen.getByText('Tab 2')).toBeInTheDocument();
        expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('displays content of active tab', () => {
        const handleTabChange = vi.fn();
        render(<Tabs tabs={mockTabs} activeTab="tab1" onTabChange={handleTabChange} />);

        expect(screen.getByText('Content 1')).toBeInTheDocument();
        expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
        expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });

    it('calls onTabChange when a tab is clicked', async () => {
        const handleTabChange = vi.fn();
        const user = userEvent.setup();

        render(<Tabs tabs={mockTabs} activeTab="tab1" onTabChange={handleTabChange} />);

        const tab2Button = screen.getByText('Tab 2');
        await user.click(tab2Button);

        expect(handleTabChange).toHaveBeenCalledWith('tab2');
        expect(handleTabChange).toHaveBeenCalledTimes(1);
    });

    it('applies active styles to active tab', () => {
        const handleTabChange = vi.fn();
        render(<Tabs tabs={mockTabs} activeTab="tab2" onTabChange={handleTabChange} />);

        const tab2Button = screen.getByText('Tab 2');
        expect(tab2Button).toHaveClass('text-white');
    });

    it('applies inactive styles to non-active tabs', () => {
        const handleTabChange = vi.fn();
        render(<Tabs tabs={mockTabs} activeTab="tab1" onTabChange={handleTabChange} />);

        const tab2Button = screen.getByText('Tab 2');
        expect(tab2Button).toHaveClass('text-gray-600');
    });

    it('applies custom className', () => {
        const handleTabChange = vi.fn();
        const { container } = render(
            <Tabs tabs={mockTabs} activeTab="tab1" onTabChange={handleTabChange} className="custom-tabs" />
        );

        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass('custom-tabs');
    });

    it('updates content when activeTab changes', () => {
        const handleTabChange = vi.fn();
        const { rerender } = render(<Tabs tabs={mockTabs} activeTab="tab1" onTabChange={handleTabChange} />);

        expect(screen.getByText('Content 1')).toBeInTheDocument();

        rerender(<Tabs tabs={mockTabs} activeTab="tab2" onTabChange={handleTabChange} />);

        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
});
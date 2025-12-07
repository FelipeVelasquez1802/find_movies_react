import { type ReactNode, useRef } from 'react';

interface HorizontalScrollContainerProps {
    children: ReactNode;
    className?: string;
}

const HorizontalScrollContainer = ({ children, className = '' }: HorizontalScrollContainerProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 800;
            const newScrollPosition =
                direction === 'left'
                    ? scrollRef.current.scrollLeft - scrollAmount
                    : scrollRef.current.scrollLeft + scrollAmount;

            scrollRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className={`relative group ${className}`}>
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 border-2 border-white text-white p-3 rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Scroll left"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-1 py-4"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {children}
            </div>

            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 border-2 border-white text-white p-3 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Scroll right"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </div>
    );
};

export default HorizontalScrollContainer;
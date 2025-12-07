import { useState } from 'react';
import { usePopularMovies, usePopularTVShows } from '@/modules/movies/queries';
import type { BaseMedia, TVShow } from '@/modules/movies/models/entity';
import Tabs, { type Tab } from '@/core/components/Tabs';
import MediaCard from '@/core/components/card/MediaCard';
import HorizontalScrollContainer from '@/core/components/HorizontalScrollContainer';

interface FeaturedTodayProps {
    onMediaClick?: (media: BaseMedia) => void;
}

// Helper function to convert TVShow to BaseMedia format
const tvShowToBaseMedia = (tvShow: TVShow): BaseMedia => ({
    ...tvShow,
    releaseDate: tvShow.firstAirDate,
});

const FeaturedToday = ({ onMediaClick }: FeaturedTodayProps) => {
    const [activeTab, setActiveTab] = useState('movies');

    // Fetch popular movies and TV shows
    const { data: moviesData, isLoading: moviesLoading, isError: moviesError } = usePopularMovies(1);
    const { data: tvData, isLoading: tvLoading, isError: tvError } = usePopularTVShows(1);

    const renderContent = (
        items: BaseMedia[] | undefined,
        isLoading: boolean,
        isError: boolean
    ) => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center py-20">
                    <div className="flex items-center gap-3 text-gray-600">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        <span>Loading...</span>
                    </div>
                </div>
            );
        }

        if (isError) {
            return (
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">Error loading content</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            );
        }

        if (!items || items.length === 0) {
            return (
                <div className="flex items-center justify-center py-20">
                    <p className="text-gray-600">No content available</p>
                </div>
            );
        }

        return (
            <HorizontalScrollContainer>
                {items.map((item) => (
                    <MediaCard
                        key={`${item.mediaType}-${item.id}`}
                        media={item}
                        onClick={() => onMediaClick?.(item)}
                    />
                ))}
            </HorizontalScrollContainer>
        );
    };

    const tabs: Tab[] = [
        {
            id: 'movies',
            label: 'Movies',
            content: renderContent(
                moviesData?.movies,
                moviesLoading,
                moviesError
            ),
        },
        {
            id: 'series',
            label: 'Series',
            content: renderContent(
                tvData?.shows.map(tvShowToBaseMedia),
                tvLoading,
                tvError
            ),
        },
    ];

    return (
        <section className="px-8 py-6">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">Featured Today</h2>
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </section>
    );
};

export default FeaturedToday;
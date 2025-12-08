import {useState} from 'react';
import {usePopularMovies, usePopularTVShows} from '@/modules/movies/queries';
import type {BaseMedia, TVShow} from '@/modules/movies/models/entity';
import Tabs, {type Tab} from '@/core/components/Tabs.tsx';
import MediaCard from '@/core/components/card/MediaCard.tsx';
import HorizontalScrollContainer from '@/core/components/HorizontalScrollContainer.tsx';
import {ErrorState} from '@/shared/components';
import FeaturedTodaySkeleton from './FeaturedTodaySkeleton';

interface FeaturedTodayProps {
    onMediaClick?: (media: BaseMedia) => void;
}

const tvShowToBaseMedia = (tvShow: TVShow): BaseMedia => ({
    ...tvShow,
    releaseDate: tvShow.firstAirDate,
});

const FeaturedToday = ({ onMediaClick }: FeaturedTodayProps) => {
    const [activeTab, setActiveTab] = useState('movies');

    const { data: moviesData, isLoading: moviesLoading, isError: moviesError } = usePopularMovies(1);
    const { data: tvData, isLoading: tvLoading, isError: tvError } = usePopularTVShows(1);

    if (moviesLoading && tvLoading) {
        return <FeaturedTodaySkeleton />;
    }

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
            return <ErrorState variant="section" />;
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
            <h2 className="text-2xl font-bold text-primary mb-4">
                Featured Today
            </h2>
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </section>
    );
};

export default FeaturedToday;
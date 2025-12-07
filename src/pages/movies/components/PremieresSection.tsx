import { useDiscoverMovies } from '@/modules/movies/queries';
import type { BaseMedia } from '@/modules/movies/models/entity';
import MediaCard from '@/core/components/card/MediaCard';
import HorizontalScrollContainer from '@/core/components/HorizontalScrollContainer';

interface PremieresSectionProps {
    year?: number;
    onMediaClick?: (media: BaseMedia) => void;
}

const PremieresSection = ({ year = 2023, onMediaClick }: PremieresSectionProps) => {
    const { data, isLoading, isError } = useDiscoverMovies(year, 1);

    if (isLoading) {
        return (
            <section className="px-8 py-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Premieres and Announcements {year}
                </h2>
                <div className="flex items-center justify-center py-20">
                    <div className="flex items-center gap-3 text-gray-600">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        <span>Loading...</span>
                    </div>
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="px-8 py-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Premieres and Announcements {year}
                </h2>
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">Error loading premieres</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (!data?.movies || data.movies.length === 0) {
        return (
            <section className="px-8 py-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Premieres and Announcements {year}
                </h2>
                <div className="flex items-center justify-center py-20">
                    <p className="text-gray-600">No premieres available for {year}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="px-8 py-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-primary">
                    Premieres and Announcements {year}
                </h2>
                <span className="text-sm text-gray-600">
                    {data.movies.length} movies
                </span>
            </div>

            <HorizontalScrollContainer>
                {data.movies.map((movie) => (
                    <MediaCard
                        key={`movie-${movie.id}`}
                        media={movie}
                        onClick={() => onMediaClick?.(movie)}
                    />
                ))}
            </HorizontalScrollContainer>
        </section>
    );
};

export default PremieresSection;
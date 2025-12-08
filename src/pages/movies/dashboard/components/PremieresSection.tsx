import { useDiscoverMovies } from '@/modules/movies/queries';
import type { BaseMedia } from '@/modules/movies/models/entity';
import MediaCard from '@/core/components/card/MediaCard.tsx';
import HorizontalScrollContainer from '@/core/components/HorizontalScrollContainer.tsx';
import {ErrorState} from '@/shared/components';
import PremieresSectionSkeleton from './PremieresSectionSkeleton';

interface PremieresSectionProps {
    year?: number;
    onMediaClick?: (media: BaseMedia) => void;
}

const PremieresSection = ({ year = 2023, onMediaClick }: PremieresSectionProps) => {
    const { data, isLoading, isError } = useDiscoverMovies(year, 1);

    if (isLoading) {
        return <PremieresSectionSkeleton />;
    }

    if (isError) {
        return (
            <section className="px-8 py-6">
                <h2 className="text-2xl font-bold text-primary mb-4">
                    Premieres and Announcements {year}
                </h2>
                <ErrorState variant="section" />
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
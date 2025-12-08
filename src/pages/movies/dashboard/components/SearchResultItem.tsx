import type { BaseMedia } from '@/modules/movies/models/entity';
import { getPosterUrl } from '@/core/config/tmdbConfig.ts';

interface SearchResultItemProps {
    media: BaseMedia;
    onClick?: () => void;
}

const SearchResultItem = ({ media, onClick }: SearchResultItemProps) => {
    const posterUrl = media.posterPath
        ? getPosterUrl(media.posterPath)
        : 'https://via.placeholder.com/92x138?text=No+Image';

    const year = media.releaseDate ? new Date(media.releaseDate).getFullYear() : 'N/A';
    const mediaTypeLabel = media.mediaType === 'movie' ? 'Movie' : 'TV Show';

    return (
        <div
            onClick={onClick}
            className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition-colors"
        >
            <img
                src={posterUrl}
                alt={media.title}
                className="w-12 h-18 object-cover rounded"
            />

            <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-gray-900 truncate">
                    {media.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>{year}</span>
                    <span>•</span>
                    <span className="capitalize">{mediaTypeLabel}</span>
                    {media.voteAverage > 0 && (
                        <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                ⭐ {media.voteAverage.toFixed(1)}
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResultItem;
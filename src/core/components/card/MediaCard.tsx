import type { BaseMedia } from '@/modules/movies/models/entity';
import { getPosterUrl } from '@/core/config/tmdbConfig';

interface MediaCardProps {
    media: BaseMedia;
    onClick?: () => void;
}

const MediaCard = ({ media, onClick }: MediaCardProps) => {
    const posterUrl = media.posterPath
        ? getPosterUrl(media.posterPath)
        : 'https://via.placeholder.com/342x513?text=No+Image';

    const year = media.releaseDate ? new Date(media.releaseDate).getFullYear() : 'N/A';

    return (
        <div
            onClick={onClick}
            className="flex-shrink-0 w-48 cursor-pointer transition-transform hover:scale-105 duration-200"
        >
            {/* Poster */}
            <div className="relative overflow-hidden rounded-lg shadow-md bg-gray-200">
                <img
                    src={posterUrl}
                    alt={media.title}
                    className="w-full h-72 object-cover"
                    loading="lazy"
                />

                {/* Rating Badge */}
                {media.voteAverage > 0 && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                        <span>⭐</span>
                        <span>{media.voteAverage.toFixed(1)}</span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="mt-2">
                <h3 className="font-semibold text-sm text-gray-900 truncate" title={media.title}>
                    {media.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1">{year}</p>
            </div>
        </div>
    );
};

export default MediaCard;
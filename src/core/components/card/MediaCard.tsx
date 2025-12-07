import type {BaseMedia} from '@/modules/movies/models/entity';
import {getPosterUrl} from '@/core/config/tmdbConfig';
import Score from "@/core/components/Score.tsx";

interface MediaCardProps {
    media: BaseMedia;
    onClick?: () => void;
}

const MediaCard = ({ media, onClick }: MediaCardProps) => {
    const posterUrl = media.posterPath
        ? getPosterUrl(media.posterPath)
        : 'https://via.placeholder.com/342x513?text=No+Image';

    const movieScore = media.voteAverage > 0 ? media.voteAverage.toFixed(1) : undefined;

    return (
        <div
            onClick={onClick}
            className="flex flex-col justify-center gap-2 shrink-0"
        >
            <div className="relative overflow-hidden rounded-lg border shadow-md  hover:scale-105 duration-200">
                <img
                    src={posterUrl}
                    alt={media.title}
                    className="w-full h-72 object-cover"
                    loading="lazy"
                />

                <Score
                    value={movieScore}
                    className={"absolute bottom-0"}
                />
            </div>

            <div className="mt-2">
                <h3 className="font-semibold text-sm text-white text-center truncate" title={media.title}>
                    {media.title}
                </h3>
            </div>
        </div>
    );
};

export default MediaCard;
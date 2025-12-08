import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetail, useTVShowDetail } from '@/modules/movies/queries';
import type { MovieDetail, TVShowDetail } from '@/modules/movies/models/entity';

export const useMediaDetailController = () => {
    const { type, id } = useParams<{ type: string; id: string }>();
    const navigate = useNavigate();

    const mediaId = parseInt(id || '0', 10);
    const isMovie = type === 'movie';

    const movieQuery = useMovieDetail(mediaId);
    const tvQuery = useTVShowDetail(mediaId);

    const isLoading = isMovie ? movieQuery.isLoading : tvQuery.isLoading;
    const isError = isMovie ? movieQuery.isError : tvQuery.isError;
    const data: MovieDetail | TVShowDetail | undefined = isMovie ? movieQuery.data : tvQuery.data;

    const handleBackClick = (): void => {
        navigate('/');
    };

    const getYear = (): string | number => {
        if (!data) return 'N/A';
        const releaseDate = 'releaseDate' in data ? data.releaseDate : ('firstAirDate' in data ? data.firstAirDate : '');
        return releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
    };

    const getRuntime = (): number | null => {
        return data && 'runtime' in data ? data.runtime : null;
    };

    const getNumberOfSeasons = (): number | null => {
        return data && 'numberOfSeasons' in data ? data.numberOfSeasons : null;
    };

    return {
        isLoading,
        isError,
        data,
        isMovie,
        handleBackClick,
        getYear,
        getRuntime,
        getNumberOfSeasons,
    };
};
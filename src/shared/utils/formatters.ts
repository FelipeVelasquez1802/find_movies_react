import type { MovieDetail, TVShowDetail } from '@/modules/movies/models/entity';

export const formatDuration = (runtime?: number): string | undefined => {
    if (!runtime) return undefined;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
};

export const getMediaReleaseDate = (
    data: MovieDetail | TVShowDetail
): string | undefined => {
    if ('releaseDate' in data) {
        return data.releaseDate;
    }
    if ('firstAirDate' in data) {
        return data.firstAirDate;
    }
    return undefined;
};
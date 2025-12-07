// Domain Entities (camelCase)

export type MediaType = 'movie' | 'tv';

export interface BaseMedia {
    id: number;
    mediaType: MediaType;
    title: string;
    originalTitle: string;
    overview: string;
    posterPath: string | null;
    backdropPath: string | null;
    releaseDate: string;
    voteAverage: number;
    voteCount: number;
    popularity: number;
    genreIds: number[];
}

export interface Movie extends BaseMedia {
    mediaType: 'movie';
}

export interface MovieDetail extends Movie {
    runtime: number | null;
    budget: number;
    revenue: number;
    status: string;
    tagline: string | null;
    homepage: string | null;
    genres: Genre[];
    director: string | null;
    cast: CastMember[];
}

export interface TVShow extends Omit<BaseMedia, 'releaseDate'> {
    mediaType: 'tv';
    firstAirDate: string;
}

export interface TVShowDetail extends TVShow {
    numberOfSeasons: number;
    numberOfEpisodes: number;
    episodeRuntime: number[];
    status: string;
    tagline: string | null;
    homepage: string | null;
    genres: Genre[];
    creators: string[];
    cast: CastMember[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface CastMember {
    id: number;
    name: string;
    character: string;
    profilePath: string | null;
    order: number;
}

// Search and Filter Params
export interface MoviesSearchParams {
    query?: string;
    page?: number;
    genre?: number;
}

export interface MediaSearchParams {
    query: string;
    page?: number;
}

export interface DiscoverParams {
    page?: number;
    year?: number;
    genreId?: number;
    sortBy?: 'popularity.desc' | 'vote_average.desc' | 'release_date.desc';
}
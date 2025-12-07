import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { tmdbRepository } from '../services/tmdb.repository';
import type { Movie, MovieDetail, TVShow, TVShowDetail, BaseMedia } from '../models/entity';

// Query Keys
export const MOVIE_QUERY_KEYS = {
    popularMovies: (page: number) => ['movies', 'popular', page] as const,
    topRatedMovies: (page: number) => ['movies', 'topRated', page] as const,
    nowPlayingMovies: (page: number) => ['movies', 'nowPlaying', page] as const,
    discoverMovies: (year?: number, page?: number) => ['movies', 'discover', year, page] as const,
    movieDetail: (id: number) => ['movies', 'detail', id] as const,

    popularTVShows: (page: number) => ['tv', 'popular', page] as const,
    topRatedTVShows: (page: number) => ['tv', 'topRated', page] as const,
    onTheAirTVShows: (page: number) => ['tv', 'onTheAir', page] as const,
    discoverTVShows: (year?: number, page?: number) => ['tv', 'discover', year, page] as const,
    tvShowDetail: (id: number) => ['tv', 'detail', id] as const,

    searchMulti: (query: string, page: number) => ['search', 'multi', query, page] as const,
};

// ===== MOVIE QUERIES =====

/**
 * Get popular movies
 */
export const usePopularMovies = (page: number = 1): UseQueryResult<{ movies: Movie[]; totalPages: number }, Error> => {
    return useQuery({
        queryKey: MOVIE_QUERY_KEYS.popularMovies(page),
        queryFn: () => tmdbRepository.getPopularMovies(page),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
};

/**
 * Get top rated movies
 */
export const useTopRatedMovies = (page: number = 1): UseQueryResult<{ movies: Movie[]; totalPages: number }, Error> => {
    return useQuery({
        queryKey: MOVIE_QUERY_KEYS.topRatedMovies(page),
        queryFn: () => tmdbRepository.getTopRatedMovies(page),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

/**
 * Get now playing movies (for "Premieres" section)
 */
export const useNowPlayingMovies = (page: number = 1): UseQueryResult<{ movies: Movie[]; totalPages: number }, Error> => {
    return useQuery({
        queryKey: MOVIE_QUERY_KEYS.nowPlayingMovies(page),
        queryFn: () => tmdbRepository.getNowPlayingMovies(page),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

/**
 * Discover movies by year (for "Premieres 2023" section)
 */
export const useDiscoverMovies = (year?: number, page: number = 1): UseQueryResult<{ movies: Movie[]; totalPages: number }, Error> => {
    return useQuery({
        queryKey: MOVIE_QUERY_KEYS.discoverMovies(year, page),
        queryFn: () => tmdbRepository.discoverMovies({ year, page }),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

/**
 * Get movie details by ID
 */
export const useMovieDetail = (movieId: number): UseQueryResult<MovieDetail, Error> => {
    return useQuery({
        queryKey: MOVIE_QUERY_KEYS.movieDetail(movieId),
        queryFn: () => tmdbRepository.getMovieDetail(movieId),
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
    });
};

// ===== TV SHOW QUERIES =====

/**
 * Get popular TV shows
 */
export const usePopularTVShows = (page: number = 1): UseQueryResult<{ shows: TVShow[]; totalPages: number }, Error> => {
    return useQuery({
        queryKey: MOVIE_QUERY_KEYS.popularTVShows(page),
        queryFn: () => tmdbRepository.getPopularTVShows(page),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

/**
 * Get top rated TV shows
 */
export const useTopRatedTVShows = (page: number = 1): UseQueryResult<{ shows: TVShow[]; totalPages: number }, Error> => {
    return useQuery({
        queryKey: MOVIE_QUERY_KEYS.topRatedTVShows(page),
        queryFn: () => tmdbRepository.getTopRatedTVShows(page),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

/**
 * Get on the air TV shows
 */
export const useOnTheAirTVShows = (page: number = 1): UseQueryResult<{ shows: TVShow[]; totalPages: number }, Error> => {
    return useQuery({
        queryKey: MOVIE_QUERY_KEYS.onTheAirTVShows(page),
        queryFn: () => tmdbRepository.getOnTheAirTVShows(page),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

/**
 * Discover TV shows by year
 */
export const useDiscoverTVShows = (year?: number, page: number = 1): UseQueryResult<{ shows: TVShow[]; totalPages: number }, Error> => {
    return useQuery({
        queryKey: MOVIE_QUERY_KEYS.discoverTVShows(year, page),
        queryFn: () => tmdbRepository.discoverTVShows({ year, page }),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

/**
 * Get TV show details by ID
 */
export const useTVShowDetail = (tvId: number): UseQueryResult<TVShowDetail, Error> => {
    return useQuery({
        queryKey: MOVIE_QUERY_KEYS.tvShowDetail(tvId),
        queryFn: () => tmdbRepository.getTVShowDetail(tvId),
        staleTime: 10 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
};

// ===== SEARCH QUERIES =====

/**
 * Multi-search (movies and TV shows) - For search bar
 * Returns max 5 results as per requirements
 */
export const useSearchMulti = (query: string, page: number = 1): UseQueryResult<{ results: BaseMedia[]; totalPages: number }, Error> => {
    return useQuery({
        queryKey: MOVIE_QUERY_KEYS.searchMulti(query, page),
        queryFn: () => tmdbRepository.searchMulti({ query, page }),
        enabled: query.length > 0, // Only search when there's a query
        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
};
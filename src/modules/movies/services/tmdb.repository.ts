import { tmdbClient } from '@/core/config/tmdbConfig';
import type {
    MovieDTO,
    MovieDetailDTO,
    TVShowDTO,
    TVShowDetailDTO,
    PaginatedResponseDTO,
    SearchResultDTO,
} from '../models/dto/TMDBMovieDTO';
import type {
    Movie,
    MovieDetail,
    TVShow,
    TVShowDetail,
    BaseMedia,
    MediaSearchParams,
    DiscoverParams,
} from '../models/entity/Movie';
import { MovieMapper } from './mappers/movieMapper';

// TMDB Repository - Real API Implementation
export class TMDBRepository {
    // ===== MOVIES =====

    /**
     * Get popular movies
     */
    async getPopularMovies(page: number = 1): Promise<{ movies: Movie[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<MovieDTO>>('/movie/popular', {
            params: { page },
        });

        return {
            movies: MovieMapper.movieListToDomain(response.data.results),
            totalPages: response.data.total_pages,
        };
    }

    /**
     * Get top rated movies
     */
    async getTopRatedMovies(page: number = 1): Promise<{ movies: Movie[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<MovieDTO>>('/movie/top_rated', {
            params: { page },
        });

        return {
            movies: MovieMapper.movieListToDomain(response.data.results),
            totalPages: response.data.total_pages,
        };
    }

    /**
     * Get now playing movies (estrenos)
     */
    async getNowPlayingMovies(page: number = 1): Promise<{ movies: Movie[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<MovieDTO>>('/movie/now_playing', {
            params: { page },
        });

        return {
            movies: MovieMapper.movieListToDomain(response.data.results),
            totalPages: response.data.total_pages,
        };
    }

    /**
     * Discover movies with filters (for Premieres 2023)
     */
    async discoverMovies(params: DiscoverParams): Promise<{ movies: Movie[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<MovieDTO>>('/discover/movie', {
            params: {
                page: params.page || 1,
                primary_release_year: params.year,
                with_genres: params.genreId,
                sort_by: params.sortBy || 'popularity.desc',
            },
        });

        return {
            movies: MovieMapper.movieListToDomain(response.data.results),
            totalPages: response.data.total_pages,
        };
    }

    /**
     * Get movie details by ID
     */
    async getMovieDetail(movieId: number): Promise<MovieDetail> {
        const response = await tmdbClient.get<MovieDetailDTO>(`/movie/${movieId}`, {
            params: {
                append_to_response: 'credits', // Include cast and crew
            },
        });

        return MovieMapper.movieDetailToDomain(response.data);
    }

    // ===== TV SHOWS =====

    /**
     * Get popular TV shows
     */
    async getPopularTVShows(page: number = 1): Promise<{ shows: TVShow[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<TVShowDTO>>('/tv/popular', {
            params: { page },
        });

        return {
            shows: MovieMapper.tvListToDomain(response.data.results),
            totalPages: response.data.total_pages,
        };
    }

    /**
     * Get top rated TV shows
     */
    async getTopRatedTVShows(page: number = 1): Promise<{ shows: TVShow[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<TVShowDTO>>('/tv/top_rated', {
            params: { page },
        });

        return {
            shows: MovieMapper.tvListToDomain(response.data.results),
            totalPages: response.data.total_pages,
        };
    }

    /**
     * Get on the air TV shows
     */
    async getOnTheAirTVShows(page: number = 1): Promise<{ shows: TVShow[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<TVShowDTO>>('/tv/on_the_air', {
            params: { page },
        });

        return {
            shows: MovieMapper.tvListToDomain(response.data.results),
            totalPages: response.data.total_pages,
        };
    }

    /**
     * Discover TV shows with filters
     */
    async discoverTVShows(params: DiscoverParams): Promise<{ shows: TVShow[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<TVShowDTO>>('/discover/tv', {
            params: {
                page: params.page || 1,
                first_air_date_year: params.year,
                with_genres: params.genreId,
                sort_by: params.sortBy || 'popularity.desc',
            },
        });

        return {
            shows: MovieMapper.tvListToDomain(response.data.results),
            totalPages: response.data.total_pages,
        };
    }

    /**
     * Get TV show details by ID
     */
    async getTVShowDetail(tvId: number): Promise<TVShowDetail> {
        const response = await tmdbClient.get<TVShowDetailDTO>(`/tv/${tvId}`, {
            params: {
                append_to_response: 'credits', // Include cast and crew
            },
        });

        return MovieMapper.tvDetailToDomain(response.data);
    }

    // ===== SEARCH (Multi-search) =====

    /**
     * Search movies and TV shows (multi-search)
     */
    async searchMulti(params: MediaSearchParams): Promise<{ results: BaseMedia[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<SearchResultDTO>>('/search/multi', {
            params: {
                query: params.query,
                page: params.page || 1,
            },
        });

        // Filter only movies and TV shows (exclude person results)
        const filteredResults = response.data.results.filter(
            (result: SearchResultDTO) => result.media_type === 'movie' || result.media_type === 'tv'
        );

        return {
            results: MovieMapper.searchListToDomain(filteredResults),
            totalPages: response.data.total_pages,
        };
    }

    /**
     * Search only movies
     */
    async searchMovies(params: MediaSearchParams): Promise<{ movies: Movie[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<MovieDTO>>('/search/movie', {
            params: {
                query: params.query,
                page: params.page || 1,
            },
        });

        return {
            movies: MovieMapper.movieListToDomain(response.data.results),
            totalPages: response.data.total_pages,
        };
    }

    /**
     * Search only TV shows
     */
    async searchTVShows(params: MediaSearchParams): Promise<{ shows: TVShow[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<TVShowDTO>>('/search/tv', {
            params: {
                query: params.query,
                page: params.page || 1,
            },
        });

        return {
            shows: MovieMapper.tvListToDomain(response.data.results),
            totalPages: response.data.total_pages,
        };
    }
}

// Singleton instance
export const tmdbRepository = new TMDBRepository();
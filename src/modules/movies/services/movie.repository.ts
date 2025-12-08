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
import type { IMovieRepository } from './IMovieRepository';

export class MovieRepository implements IMovieRepository {
    async getPopularMovies(page: number = 1): Promise<{ movies: Movie[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<MovieDTO>>('/movie/popular', {
            params: { page },
        });

        return {
            movies: MovieMapper.movieListToDomain(response.data.results),
            totalPages: response.data.total_pages,
        };
    }

    async getTopRatedMovies(page: number = 1): Promise<{ movies: Movie[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<MovieDTO>>('/movie/top_rated', {
            params: { page },
        });

        return {
            movies: MovieMapper.movieListToDomain(response.data.results),
            totalPages: response.data.total_pages,
        };
    }

    async getNowPlayingMovies(page: number = 1): Promise<{ movies: Movie[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<MovieDTO>>('/movie/now_playing', {
            params: { page },
        });

        return {
            movies: MovieMapper.movieListToDomain(response.data.results),
            totalPages: response.data.total_pages,
        };
    }

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

    async getMovieDetail(movieId: number): Promise<MovieDetail> {
        const response = await tmdbClient.get<MovieDetailDTO>(`/movie/${movieId}`, {
            params: {
                append_to_response: 'credits',
            },
        });

        return MovieMapper.movieDetailToDomain(response.data);
    }

    async getPopularTVShows(page: number = 1): Promise<{ shows: TVShow[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<TVShowDTO>>('/tv/popular', {
            params: { page },
        });

        return {
            shows: MovieMapper.tvListToDomain(response.data.results),
            totalPages: response.data.total_pages,
        };
    }

    async getTopRatedTVShows(page: number = 1): Promise<{ shows: TVShow[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<TVShowDTO>>('/tv/top_rated', {
            params: { page },
        });

        return {
            shows: MovieMapper.tvListToDomain(response.data.results),
            totalPages: response.data.total_pages,
        };
    }

    async getOnTheAirTVShows(page: number = 1): Promise<{ shows: TVShow[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<TVShowDTO>>('/tv/on_the_air', {
            params: { page },
        });

        return {
            shows: MovieMapper.tvListToDomain(response.data.results),
            totalPages: response.data.total_pages,
        };
    }

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

    async getTVShowDetail(tvId: number): Promise<TVShowDetail> {
        const response = await tmdbClient.get<TVShowDetailDTO>(`/tv/${tvId}`, {
            params: {
                append_to_response: 'credits',
            },
        });

        return MovieMapper.tvDetailToDomain(response.data);
    }

    async searchMulti(params: MediaSearchParams): Promise<{ results: BaseMedia[]; totalPages: number }> {
        const response = await tmdbClient.get<PaginatedResponseDTO<SearchResultDTO>>('/search/multi', {
            params: {
                query: params.query,
                page: params.page || 1,
            },
        });

        const filteredResults = response.data.results.filter(
            (result: SearchResultDTO) => result.media_type === 'movie' || result.media_type === 'tv'
        );

        return {
            results: MovieMapper.searchListToDomain(filteredResults),
            totalPages: response.data.total_pages,
        };
    }

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
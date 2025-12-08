import type {
    Movie,
    MovieDetail,
    TVShow,
    TVShowDetail,
    BaseMedia,
    MediaSearchParams,
    DiscoverParams,
} from '../models/entity/Movie';

export interface IMovieRepository {
    getPopularMovies(page?: number): Promise<{ movies: Movie[]; totalPages: number }>;
    getTopRatedMovies(page?: number): Promise<{ movies: Movie[]; totalPages: number }>;
    getNowPlayingMovies(page?: number): Promise<{ movies: Movie[]; totalPages: number }>;
    discoverMovies(params: DiscoverParams): Promise<{ movies: Movie[]; totalPages: number }>;
    getMovieDetail(movieId: number): Promise<MovieDetail>;

    getPopularTVShows(page?: number): Promise<{ shows: TVShow[]; totalPages: number }>;
    getTopRatedTVShows(page?: number): Promise<{ shows: TVShow[]; totalPages: number }>;
    getOnTheAirTVShows(page?: number): Promise<{ shows: TVShow[]; totalPages: number }>;
    discoverTVShows(params: DiscoverParams): Promise<{ shows: TVShow[]; totalPages: number }>;
    getTVShowDetail(tvId: number): Promise<TVShowDetail>;

    searchMulti(params: MediaSearchParams): Promise<{ results: BaseMedia[]; totalPages: number }>;
    searchMovies(params: MediaSearchParams): Promise<{ movies: Movie[]; totalPages: number }>;
    searchTVShows(params: MediaSearchParams): Promise<{ shows: TVShow[]; totalPages: number }>;
}
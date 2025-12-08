import type { IMovieRepository } from '@modules/movies';
import { MovieRepository } from '@modules/movies';

class MovieServiceContainer {
    private static instance: MovieServiceContainer;
    private _movieRepository: IMovieRepository;

    private constructor() {
        this._movieRepository = new MovieRepository();
    }

    static getInstance(): MovieServiceContainer {
        if (!MovieServiceContainer.instance) {
            MovieServiceContainer.instance = new MovieServiceContainer();
        }
        return MovieServiceContainer.instance;
    }

    get movieRepository(): IMovieRepository {
        return this._movieRepository;
    }

    setMovieRepository(repository: IMovieRepository): void {
        this._movieRepository = repository;
    }
}

export const movieServiceContainer = MovieServiceContainer.getInstance();
export const movieRepository = movieServiceContainer.movieRepository;
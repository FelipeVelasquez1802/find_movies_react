// Data Transfer Object - API Response format
export interface MovieDTO {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
}

export interface MoviesResponseDTO {
    page: number;
    results: MovieDTO[];
    total_pages: number;
    total_results: number;
}
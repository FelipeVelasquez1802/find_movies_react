// API Response DTOs (snake_case format from TMDB API)

export interface MovieDTO {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
    adult: boolean;
    original_language: string;
    video: boolean;
}

export interface MovieDetailDTO extends MovieDTO {
    runtime: number | null;
    budget: number;
    revenue: number;
    status: string;
    tagline: string | null;
    homepage: string | null;
    genres: GenreDTO[];
    production_companies: ProductionCompanyDTO[];
    production_countries: CountryDTO[];
    spoken_languages: LanguageDTO[];
    credits?: CreditsDTO;
}

export interface TVShowDTO {
    id: number;
    name: string;
    original_name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
    origin_country: string[];
    original_language: string;
}

export interface TVShowDetailDTO extends TVShowDTO {
    number_of_seasons: number;
    number_of_episodes: number;
    episode_run_time: number[];
    status: string;
    tagline: string | null;
    homepage: string | null;
    genres: GenreDTO[];
    created_by: CreatorDTO[];
    networks: NetworkDTO[];
    production_companies: ProductionCompanyDTO[];
    seasons: SeasonDTO[];
    credits?: CreditsDTO;
}

export interface GenreDTO {
    id: number;
    name: string;
}

export interface ProductionCompanyDTO {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface CountryDTO {
    iso_3166_1: string;
    name: string;
}

export interface LanguageDTO {
    iso_639_1: string;
    name: string;
    english_name: string;
}

export interface CreatorDTO {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
}

export interface NetworkDTO {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface SeasonDTO {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
}

export interface CreditsDTO {
    cast: CastDTO[];
    crew: CrewDTO[];
}

export interface CastDTO {
    id: number;
    cast_id: number;
    credit_id: string;
    character: string;
    name: string;
    profile_path: string | null;
    order: number;
}

export interface CrewDTO {
    id: number;
    credit_id: string;
    department: string;
    job: string;
    name: string;
    profile_path: string | null;
}

// Pagination Response
export interface PaginatedResponseDTO<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

// Search Response (includes media_type)
export interface SearchResultDTO {
    id: number;
    media_type: 'movie' | 'tv';
    title?: string;        // For movies
    name?: string;         // For TV shows
    original_title?: string;
    original_name?: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date?: string; // For movies
    first_air_date?: string; // For TV
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
}
import type {
    CastDTO,
    GenreDTO,
    MovieDetailDTO,
    MovieDTO,
    SearchResultDTO,
    TVShowDetailDTO,
    TVShowDTO,
} from '@/modules/movies/models/dto';
import type {BaseMedia, CastMember, Movie, MovieDetail, TVShow, TVShowDetail,} from '../../models/entity/Movie';

export class MovieMapper {
    static movieToDomain(dto: MovieDTO): Movie {
        return {
            id: dto.id,
            mediaType: 'movie',
            title: dto.title,
            originalTitle: dto.original_title,
            overview: dto.overview,
            posterPath: dto.poster_path,
            backdropPath: dto.backdrop_path,
            releaseDate: dto.release_date,
            voteAverage: dto.vote_average,
            voteCount: dto.vote_count,
            popularity: dto.popularity,
            genreIds: dto.genre_ids,
        };
    }

    static movieDetailToDomain(dto: MovieDetailDTO): MovieDetail {
        const director = dto.credits?.crew.find(member => member.job === 'Director')?.name || null;
        const cast: CastMember[] = dto.credits?.cast.slice(0, 10).map((member: CastDTO) => ({
            id: member.id,
            name: member.name,
            character: member.character,
            profilePath: member.profile_path,
            order: member.order,
        })) || [];

        return {
            ...this.movieToDomain(dto),
            runtime: dto.runtime,
            budget: dto.budget,
            revenue: dto.revenue,
            status: dto.status,
            tagline: dto.tagline,
            homepage: dto.homepage,
            genres: dto.genres.map((g: GenreDTO) => ({id: g.id, name: g.name})),
            director,
            cast,
        };
    }

    static tvToDomain(dto: TVShowDTO): TVShow {
        return {
            id: dto.id,
            mediaType: 'tv',
            title: dto.name,
            originalTitle: dto.original_name,
            overview: dto.overview,
            posterPath: dto.poster_path,
            backdropPath: dto.backdrop_path,
            firstAirDate: dto.first_air_date,
            voteAverage: dto.vote_average,
            voteCount: dto.vote_count,
            popularity: dto.popularity,
            genreIds: dto.genre_ids,
        };
    }

    static tvDetailToDomain(dto: TVShowDetailDTO): TVShowDetail {
        const creators = dto.created_by.map((c: { name: string }) => c.name);
        const cast: CastMember[] = dto.credits?.cast.slice(0, 10).map((member: CastDTO) => ({
            id: member.id,
            name: member.name,
            character: member.character,
            profilePath: member.profile_path,
            order: member.order,
        })) || [];

        return {
            ...this.tvToDomain(dto),
            numberOfSeasons: dto.number_of_seasons,
            numberOfEpisodes: dto.number_of_episodes,
            episodeRuntime: dto.episode_run_time,
            status: dto.status,
            tagline: dto.tagline,
            homepage: dto.homepage,
            genres: dto.genres.map((g: GenreDTO) => ({id: g.id, name: g.name})),
            creators,
            cast,
        };
    }

    static searchResultToDomain(dto: SearchResultDTO): BaseMedia {
        if (dto.media_type === 'movie') {
            return {
                id: dto.id,
                mediaType: 'movie',
                title: dto.title || '',
                originalTitle: dto.original_title || '',
                overview: dto.overview,
                posterPath: dto.poster_path,
                backdropPath: dto.backdrop_path,
                releaseDate: dto.release_date || '',
                voteAverage: dto.vote_average,
                voteCount: dto.vote_count,
                popularity: dto.popularity,
                genreIds: dto.genre_ids,
            };
        } else {
            return {
                id: dto.id,
                mediaType: 'tv',
                title: dto.name || '',
                originalTitle: dto.original_name || '',
                overview: dto.overview,
                posterPath: dto.poster_path,
                backdropPath: dto.backdrop_path,
                releaseDate: dto.first_air_date || '',
                voteAverage: dto.vote_average,
                voteCount: dto.vote_count,
                popularity: dto.popularity,
                genreIds: dto.genre_ids,
            };
        }
    }

    static movieListToDomain(dtos: MovieDTO[]): Movie[] {
        return dtos.map(this.movieToDomain);
    }

    static tvListToDomain(dtos: TVShowDTO[]): TVShow[] {
        return dtos.map(this.tvToDomain);
    }

    static searchListToDomain(dtos: SearchResultDTO[]): BaseMedia[] {
        return dtos.map(this.searchResultToDomain);
    }
}
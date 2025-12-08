import Chip from "@/core/components/Chip.tsx";
import type {Genre, CastMember} from "@/modules/movies/models/entity";

interface ContentMovieDetail {
    imagePath: string;
    title: string;
    genres: Genre[];
    description: string;
    director?: string;
    screenplay?: string;
    stars?: CastMember[];
    countries?: string[];
    releaseDate?: string;
}

const ContentMovieDetail = (
    {imagePath, title, genres, description, director, screenplay, stars, countries, releaseDate}: ContentMovieDetail
) => {
    const hasGenres = genres && genres.length > 0;
    const hasStars = stars && stars.length > 0;
    const hasCountries = countries && countries.length > 0;

    return (
        <div className="flex flex-row gap-8 px-24 py-12">
            <img
                src={imagePath}
                alt={title}
                className="w-64 h-max rounded-lg shadow-2xl"
            />
            <div className="flex flex-col gap-8">
                {hasGenres && (
                    <div className="flex flex-row gap-4">
                        {genres.map((genre) => (
                            <Chip key={genre.id} text={genre.name}/>
                        ))}
                    </div>
                )}
                <p className="text-white">{description}</p>

                <div className="flex flex-col gap-4">
                    {director && (
                        <p className="flex gap-2 text-white">
                            <span className="text-gray-500">Director:</span>
                            {director}
                        </p>
                    )}

                    {screenplay && (
                        <p className="flex gap-2 text-white">
                            <span className="text-gray-500">Screenplay:</span>
                            {screenplay}
                        </p>
                    )}

                    {hasStars && (
                        <p className="flex gap-2 text-white">
                            <span className="text-gray-500">Stars:</span>
                            {stars.slice(0, 3).map(star => star.name).join(', ')}
                        </p>
                    )}

                    {hasCountries && (
                        <p className="flex gap-2 text-white">
                            <span className="text-gray-500">Countries of Origin:</span>
                            {countries.join(', ')}
                        </p>
                    )}

                    {releaseDate && (
                        <p className="flex gap-2 text-white">
                            <span className="text-gray-500">Release Date:</span>
                            {new Date(releaseDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ContentMovieDetail
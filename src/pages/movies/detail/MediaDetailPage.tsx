import {getPosterUrl} from '@/core/config/tmdbConfig.ts';
import {useMediaDetailController} from "@/pages/movies/detail/controllers";
import HeaderMovieDetail from "@/pages/movies/detail/components/HeaderMovieDetail.tsx";
import ContentMovieDetail from "@/pages/movies/detail/components/ContentMovieDetail.tsx";
import SearchHeader from "@/pages/movies/dashboard/components/SearchHeader.tsx";
import {useNavigate} from "react-router-dom";
import type {BaseMedia} from "@/modules/movies";

const MediaDetailPage = () => {
    const navigate = useNavigate();
    const {
        isLoading,
        isError,
        data,
        isMovie,
        handleBackClick,
        getYear,
        getRuntime,
    } = useMediaDetailController();

    const handleMediaClick = (media: BaseMedia): void => {
        navigate(`/${media.mediaType}/${media.id}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="flex items-center gap-3 text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    <span className="text-lg">Loading...</span>
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-xl mb-4">Error loading details</p>
                    <button
                        onClick={handleBackClick}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go Back Home
                    </button>
                </div>
            </div>
        );
    }

    const posterUrl = data.posterPath
        ? getPosterUrl(data.posterPath)
        : 'https://via.placeholder.com/342x513?text=No+Image';

    const year = getYear();
    const runtime = getRuntime();

    const formatDuration = (): string | undefined => {
        if (runtime) {
            const hours = Math.floor(runtime / 60);
            const minutes = runtime % 60;
            return `${hours}h ${minutes}m`;
        }
        return undefined;
    };

    const getReleaseDate = (): string | undefined => {
        if ("releaseDate" in data) {
            return data.releaseDate;
        } else if ("firstAirDate" in data) {
            return data.firstAirDate;
        }
        return undefined;
    };

    return (
        <div className="flex flex-col min-h-screen">
            <SearchHeader onResultClick={handleMediaClick} />
            <HeaderMovieDetail
                type={isMovie ? "MOVIE" : "TV SHOW"}
                title={data.title.toUpperCase()}
                score={data.voteAverage.toFixed(1)}
                voteCount={data.voteCount}
                year={year}
                duration={formatDuration()}
            />
            <ContentMovieDetail
                imagePath={posterUrl}
                title={data.title}
                genres={data.genres.sort((a, b) => a.name.localeCompare(b.name))}
                description={data.overview}
                director={"director" in data ? data.director || undefined : undefined}
                screenplay={"screenplay" in data ? data.screenplay || undefined : undefined}
                stars={data.cast.length > 0 ? data.cast : undefined}
                countries={"productionCountries" in data ? data.productionCountries : undefined}
                releaseDate={getReleaseDate()}
            />
        </div>
    );
};

export default MediaDetailPage;
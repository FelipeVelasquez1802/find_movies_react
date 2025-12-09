import {getPosterUrl} from '@/core/config/tmdbConfig.ts';
import {useMediaDetailController} from "@/pages/movies/detail/controllers";
import HeaderMovieDetail from "@/pages/movies/detail/components/HeaderMovieDetail.tsx";
import ContentMovieDetail from "@/pages/movies/detail/components/ContentMovieDetail.tsx";
import HeaderMovieDetailSkeleton from "@/pages/movies/detail/components/HeaderMovieDetailSkeleton.tsx";
import ContentMovieDetailSkeleton from "@/pages/movies/detail/components/ContentMovieDetailSkeleton.tsx";
import SearchHeader from "@/pages/movies/dashboard/components/SearchHeader.tsx";
import {ErrorState} from "@/shared/components";
import {formatDuration, getMediaReleaseDate} from "@/shared/utils";
import {useNavigate} from "react-router-dom";
import type {BaseMedia} from "@/modules/movies";

const MediaDetailPage = () => {
    const navigate = useNavigate();
    const {
        isLoading,
        isError,
        data,
        isMovie,
        getYear,
        getRuntime,
    } = useMediaDetailController();

    const handleMediaClick = (media: BaseMedia): void => {
        navigate(`/${media.mediaType}/${media.id}`);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen">
                <SearchHeader onResultClick={handleMediaClick} />
                <HeaderMovieDetailSkeleton />
                <ContentMovieDetailSkeleton />
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex flex-col min-h-screen">
                <SearchHeader onResultClick={handleMediaClick}/>
                <ErrorState variant="page"/>
            </div>
        );
    }

    const posterUrl = getPosterUrl(data.posterPath);
    const year = getYear();
    const runtime = getRuntime();
    const duration = formatDuration(runtime);
    const releaseDate = getMediaReleaseDate(data);

    return (
        <div className="flex flex-col min-h-screen">
            <SearchHeader onResultClick={handleMediaClick} />
            <HeaderMovieDetail
                type={isMovie ? "MOVIE" : "TV SHOW"}
                title={data.title.toUpperCase()}
                score={data.voteAverage.toFixed(1)}
                voteCount={data.voteCount}
                year={year}
                duration={duration}
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
                releaseDate={releaseDate}
            />
        </div>
    );
};

export default MediaDetailPage;
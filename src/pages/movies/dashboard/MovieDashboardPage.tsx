import SearchHeader from '@/pages/movies/dashboard/components/SearchHeader.tsx';
import ContentDashboard from '@/pages/movies/dashboard/components/ContentDashboard.tsx';
import { useMovieDashboardController } from './controllers';

const MovieDashboardPage = () => {
    const { handleMediaClick } = useMovieDashboardController();

    return (
        <div className="flex flex-col min-h-screen">
            <SearchHeader onResultClick={handleMediaClick} />
            <ContentDashboard onMediaClick={handleMediaClick} />
        </div>
    );
};

export default MovieDashboardPage;
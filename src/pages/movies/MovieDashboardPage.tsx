import SearchHeader from './components/SearchHeader';
import ContentDashboard from './components/ContentDashboard';
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
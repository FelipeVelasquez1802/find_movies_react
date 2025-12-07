import SearchHeader from './components/SearchHeader';
import ContentDashboard from './components/ContentDashboard';
import { useMovieDashboardController } from './controllers';

/**
 * MovieDashboard Page (View Layer)
 *
 * Main dashboard displaying:
 * - Search functionality
 * - Featured Today section (Movies/Series tabs)
 * - Premieres section
 *
 * Business logic is handled by useMovieDashboardController
 */
const MovieDashboard = () => {
    const { handleMediaClick } = useMovieDashboardController();

    return (
        <div className="flex flex-col min-h-screen">
            <SearchHeader onResultClick={handleMediaClick} />
            <ContentDashboard onMediaClick={handleMediaClick} />
        </div>
    );
};

export default MovieDashboard;
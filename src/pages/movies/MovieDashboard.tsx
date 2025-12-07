import { useNavigate } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import ContentDashboard from './components/ContentDashboard';
import type { BaseMedia } from '@/modules/movies/models/entity';

const MovieDashboard = () => {
    const navigate = useNavigate();

    const handleMediaClick = (media: BaseMedia) => {
        // Navigate to detail page with media type and id
        navigate(`/${media.mediaType}/${media.id}`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <SearchHeader onResultClick={handleMediaClick} />
            <ContentDashboard onMediaClick={handleMediaClick} />
        </div>
    );
};

export default MovieDashboard;
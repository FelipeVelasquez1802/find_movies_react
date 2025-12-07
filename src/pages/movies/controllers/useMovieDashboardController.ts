import { useNavigate } from 'react-router-dom';
import type { BaseMedia } from '@/modules/movies/models/entity';

/**
 * Controller for MovieDashboard page
 * Handles business logic and navigation
 */
export const useMovieDashboardController = () => {
    const navigate = useNavigate();

    /**
     * Handle media click - Navigate to detail page
     */
    const handleMediaClick = (media: BaseMedia): void => {
        navigate(`/${media.mediaType}/${media.id}`);
    };

    return {
        handleMediaClick,
    };
};
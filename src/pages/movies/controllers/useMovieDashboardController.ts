import { useNavigate } from 'react-router-dom';
import type { BaseMedia } from '@/modules/movies/models/entity';

export const useMovieDashboardController = () => {
    const navigate = useNavigate();

    const handleMediaClick = (media: BaseMedia): void => {
        navigate(`/${media.mediaType}/${media.id}`);
    };

    return {
        handleMediaClick,
    };
};
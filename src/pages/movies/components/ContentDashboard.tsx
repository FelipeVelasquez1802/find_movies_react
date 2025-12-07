import FeaturedToday from './FeaturedToday';
import PremieresSection from './PremieresSection';
import type { BaseMedia } from '@/modules/movies/models/entity';

interface ContentDashboardProps {
    onMediaClick?: (media: BaseMedia) => void;
}

const ContentDashboard = ({ onMediaClick }: ContentDashboardProps) => {
    return (
        <main className="flex-1 pb-8">
            <FeaturedToday onMediaClick={onMediaClick} />
            <PremieresSection year={2025} onMediaClick={onMediaClick} />
        </main>
    );
};

export default ContentDashboard;
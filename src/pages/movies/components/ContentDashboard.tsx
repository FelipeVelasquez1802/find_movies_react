import FeaturedToday from './FeaturedToday';
import PremieresSection from './PremieresSection';
import type { BaseMedia } from '@/modules/movies/models/entity';

interface ContentDashboardProps {
    onMediaClick?: (media: BaseMedia) => void;
}

const ContentDashboard = ({ onMediaClick }: ContentDashboardProps) => {
    return (
        <main className="flex-1 pb-8">
            {/* Featured Today Section */}
            <FeaturedToday onMediaClick={onMediaClick} />

            {/* Premieres and Announcements 2023 Section */}
            <PremieresSection year={2023} onMediaClick={onMediaClick} />

            {/* TODO: Add more sections if needed */}
            {/* - Top Rated */}
            {/* - Trending This Week */}
            {/* - By Genre */}
        </main>
    );
};

export default ContentDashboard;
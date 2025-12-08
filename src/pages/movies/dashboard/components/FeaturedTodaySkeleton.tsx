import MediaCardSkeleton from '@/core/components/card/MediaCardSkeleton';

const FeaturedTodaySkeleton = () => {
    return (
        <section className="px-8 py-6">
            <div className="h-8 w-48 bg-gray-700 rounded mb-4 animate-pulse"></div>

            <div className="flex gap-2 mb-4">
                <div className="h-10 w-24 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-10 w-24 bg-gray-700 rounded animate-pulse"></div>
            </div>

            <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 6 }).map((_, index) => (
                    <MediaCardSkeleton key={index} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedTodaySkeleton;
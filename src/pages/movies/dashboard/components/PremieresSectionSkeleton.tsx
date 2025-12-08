import MediaCardSkeleton from '@/core/components/card/MediaCardSkeleton';

const PremieresSectionSkeleton = () => {
    return (
        <section className="px-8 py-6">
            <div className="h-8 w-64 bg-gray-700 rounded mb-4 animate-pulse"></div>

            <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 6 }).map((_, index) => (
                    <MediaCardSkeleton key={index} />
                ))}
            </div>
        </section>
    );
};

export default PremieresSectionSkeleton;
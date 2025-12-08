const ContentMovieDetailSkeleton = () => {
    return (
        <div className="flex flex-row gap-8 px-24 py-12 animate-pulse">
            <div className="w-64 h-96 bg-gray-700 rounded-lg shrink-0"></div>

            <div className="flex flex-col gap-8 flex-1">
                <div className="flex flex-row gap-4">
                    <div className="h-8 w-20 bg-gray-700 rounded-full"></div>
                    <div className="h-8 w-24 bg-gray-700 rounded-full"></div>
                    <div className="h-8 w-20 bg-gray-700 rounded-full"></div>
                </div>

                <div className="space-y-3">
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="h-5 bg-gray-700 rounded w-48"></div>
                    <div className="h-5 bg-gray-700 rounded w-56"></div>
                    <div className="h-5 bg-gray-700 rounded w-64"></div>
                    <div className="h-5 bg-gray-700 rounded w-52"></div>
                    <div className="h-5 bg-gray-700 rounded w-44"></div>
                </div>
            </div>
        </div>
    );
};

export default ContentMovieDetailSkeleton;
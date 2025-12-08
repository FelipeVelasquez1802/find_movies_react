const MediaCardSkeleton = () => {
    return (
        <div className="flex flex-col justify-center gap-2 shrink-0 w-48 animate-pulse">
            <div className="relative overflow-hidden rounded-lg border shadow-md bg-gray-700">
                <div className="w-48 h-72 bg-gray-600"></div>
                <div className="absolute bottom-0 left-0 bg-gray-800 px-2 py-1 rounded-tr-lg">
                    <div className="w-8 h-4 bg-gray-600 rounded"></div>
                </div>
            </div>

            <div className="mt-2">
                <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
            </div>
        </div>
    );
};

export default MediaCardSkeleton;
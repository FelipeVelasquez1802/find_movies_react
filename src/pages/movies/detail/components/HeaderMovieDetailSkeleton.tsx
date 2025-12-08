const HeaderMovieDetailSkeleton = () => {
    return (
        <div className="flex flex-col gap-2 px-24 py-12 bg-linear-to-r from-gray-dark via-black to-gray-dark animate-pulse">
            <div className="h-6 w-20 bg-gray-700 rounded mb-2"></div>

            <div className="flex items-center justify-between">
                <div className="h-10 w-96 bg-gray-700 rounded"></div>
                <div className="flex items-center gap-2">
                    <div className="h-10 w-16 bg-gray-700 rounded"></div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="h-4 w-16 bg-gray-700 rounded"></div>
                        <div className="h-3 w-12 bg-gray-700 rounded"></div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="h-5 w-16 bg-gray-700 rounded"></div>
                <div className="h-5 w-20 bg-gray-700 rounded"></div>
            </div>
        </div>
    );
};

export default HeaderMovieDetailSkeleton;
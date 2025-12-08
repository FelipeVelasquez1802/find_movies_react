interface HeaderMovieDetailProp {
    type: string,
    title: string,
    score: string,
    voteCount: number,
    year: string | number,
    duration?: string,
}

const HeaderMovieDetail = (
    {type, title, score, voteCount, year, duration}: HeaderMovieDetailProp
) => {
    const formattedVoteCount = voteCount.toLocaleString();

    return (
        <div className="flex flex-col gap-2 px-24 py-12 bg-linear-to-r from-gray-dark via-black to-gray-dark">
            <h2 className="text-primary">{type}</h2>
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold mb-2">{title}</h1>
                <div className="flex items-center gap-2">
                    <span className="text-white text-3xl font-bold">⭐ {score}</span>
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400 text-md">{formattedVoteCount}</span>
                        <span className="text-gray-400 text-sm">ratings</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4 text-white">
                <span>{year}</span>
                {duration && (
                    <>
                        <span>•</span>
                        <span>{duration}</span>
                    </>
                )}
            </div>
        </div>
    )
}

export default HeaderMovieDetail
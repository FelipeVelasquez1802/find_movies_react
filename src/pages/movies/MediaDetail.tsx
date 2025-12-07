import { getBackdropUrl, getPosterUrl, getProfileUrl } from '@/core/config/tmdbConfig';
import { useMediaDetailController } from './controllers';

/**
 * MediaDetail Page (View Layer)
 *
 * Displays detailed information about a movie or TV show:
 * - Backdrop and poster images
 * - Title, tagline, rating, year, runtime/seasons
 * - Genres, overview, director/creators
 * - Cast with photos
 * - Additional info (budget, revenue, status)
 *
 * Business logic is handled by useMediaDetailController
 */
const MediaDetail = () => {
    const {
        isLoading,
        isError,
        data,
        handleBackClick,
        getYear,
        getRuntime,
        getNumberOfSeasons,
    } = useMediaDetailController();

    // Loading State
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="flex items-center gap-3 text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    <span className="text-lg">Loading...</span>
                </div>
            </div>
        );
    }

    // Error State
    if (isError || !data) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-xl mb-4">Error loading details</p>
                    <button
                        onClick={handleBackClick}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go Back Home
                    </button>
                </div>
            </div>
        );
    }

    const backdropUrl = data.backdropPath
        ? getBackdropUrl(data.backdropPath)
        : null;

    const posterUrl = data.posterPath
        ? getPosterUrl(data.posterPath)
        : 'https://via.placeholder.com/342x513?text=No+Image';

    // Get computed values from controller
    const year = getYear();
    const runtime = getRuntime();
    const numberOfSeasons = getNumberOfSeasons();

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Back Button */}
            <div className="absolute top-4 left-4 z-20">
                <button
                    onClick={handleBackClick}
                    className="px-4 py-2 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
            </div>

            {/* Backdrop Image */}
            {backdropUrl && (
                <div className="relative h-96 overflow-hidden">
                    <img
                        src={backdropUrl}
                        alt={data.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                </div>
            )}

            {/* Content */}
            <div className="container mx-auto px-8 -mt-32 relative z-10">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Poster */}
                    <div className="flex-shrink-0">
                        <img
                            src={posterUrl}
                            alt={data.title}
                            className="w-64 rounded-lg shadow-2xl"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold mb-2">{data.title}</h1>

                        {data.tagline && (
                            <p className="text-gray-400 italic mb-4">{data.tagline}</p>
                        )}

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 mb-6 text-sm">
                            <span className="flex items-center gap-1">
                                ⭐ {data.voteAverage.toFixed(1)}
                            </span>
                            <span>•</span>
                            <span>{year}</span>
                            {runtime && (
                                <>
                                    <span>•</span>
                                    <span>{runtime} min</span>
                                </>
                            )}
                            {numberOfSeasons && (
                                <>
                                    <span>•</span>
                                    <span>{numberOfSeasons} Season{numberOfSeasons > 1 ? 's' : ''}</span>
                                </>
                            )}
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {data.genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        {/* Overview */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Overview</h2>
                            <p className="text-gray-300 leading-relaxed">{data.overview}</p>
                        </div>

                        {/* Director or Creators */}
                        {'director' in data && data.director && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Director</h3>
                                <p className="text-gray-300">{data.director}</p>
                            </div>
                        )}

                        {'creators' in data && data.creators && data.creators.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Created By</h3>
                                <p className="text-gray-300">{data.creators.join(', ')}</p>
                            </div>
                        )}

                        {/* Cast */}
                        {data.cast && data.cast.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-4">Cast</h2>
                                <div className="flex gap-4 overflow-x-auto pb-4">
                                    {data.cast.map((member) => (
                                        <div key={member.id} className="flex-shrink-0 w-32 text-center">
                                            <img
                                                src={
                                                    member.profilePath
                                                        ? getProfileUrl(member.profilePath)
                                                        : 'https://via.placeholder.com/185x278?text=No+Image'
                                                }
                                                alt={member.name}
                                                className="w-32 h-48 object-cover rounded-lg mb-2"
                                            />
                                            <p className="font-semibold text-sm">{member.name}</p>
                                            <p className="text-xs text-gray-400">{member.character}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Additional Info */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-400">Status:</span>
                                <span className="ml-2">{data.status}</span>
                            </div>
                            {'budget' in data && data.budget > 0 && (
                                <div>
                                    <span className="text-gray-400">Budget:</span>
                                    <span className="ml-2">${data.budget.toLocaleString()}</span>
                                </div>
                            )}
                            {'revenue' in data && data.revenue > 0 && (
                                <div>
                                    <span className="text-gray-400">Revenue:</span>
                                    <span className="ml-2">${data.revenue.toLocaleString()}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Spacing */}
            <div className="h-20" />
        </div>
    );
};

export default MediaDetail;
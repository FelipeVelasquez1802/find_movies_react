import type { BaseMedia } from '@/modules/movies/models/entity';
import SearchResultItem from './SearchResultItem.tsx';

interface SearchResultsProps {
    results: BaseMedia[];
    isLoading: boolean;
    isError: boolean;
    query: string;
    onResultClick: (media: BaseMedia) => void;
}

const SearchResults = ({ results, isLoading, isError, query, onResultClick }: SearchResultsProps) => {
    if (!query.trim()) {
        return null;
    }

    return (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
            {isLoading && (
                <div className="p-4 text-center text-gray-600">
                    <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                        <span>Searching...</span>
                    </div>
                </div>
            )}

            {isError && !isLoading && (
                <div className="p-4 text-center text-red-600">
                    <p>Error loading results. Please try again.</p>
                </div>
            )}

            {!isLoading && !isError && results.length === 0 && (
                <div className="p-4 text-center text-gray-600">
                    <p>No results found for "{query}"</p>
                </div>
            )}

            {!isLoading && !isError && results.length > 0 && (
                <div className="divide-y divide-gray-200">
                    {results.slice(0, 5).map((media) => (
                        <SearchResultItem
                            key={`${media.mediaType}-${media.id}`}
                            media={media}
                            onClick={() => onResultClick(media)}
                        />
                    ))}
                    {results.length > 5 && (
                        <div className="p-3 text-center text-xs text-gray-500">
                            Showing 5 of {results.length} results
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
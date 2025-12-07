import findMoviesLogo from '../../../assets/find-movies-icon.svg';
import { useState, useRef, useEffect } from 'react';
import { useDebounce } from '@/core/hooks';
import { useSearchMulti } from '@/modules/movies/queries';
import type { BaseMedia } from '@/modules/movies/models/entity';
import SearchResults from './SearchResults';

interface SearchHeaderProps {
    onResultClick?: (media: BaseMedia) => void;
}

const SearchHeader = ({ onResultClick }: SearchHeaderProps) => {
    const [search, setSearch] = useState('');
    const [showResults, setShowResults] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    // Debounce search term to avoid too many API calls
    const debouncedSearch = useDebounce(search, 300);

    // Fetch search results using the debounced search term
    const { data, isLoading, isError } = useSearchMulti(debouncedSearch, 1);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (value: string) => {
        setSearch(value);
        setShowResults(true);
    };

    const handleResultClick = (media: BaseMedia) => {
        setShowResults(false);
        setSearch('');
        onResultClick?.(media);
    };

    return (
        <div className="flex justify-around px-16 py-8 shadow-sm">
            {/* Logo */}
            <div className="flex w-1/3 justify-center items-center p-2">
                <img
                    src={findMoviesLogo}
                    alt="FindMovies icon"
                    className="w-8 h-8"
                />
                <h1 className="px-2 text-xl font-semibold text-gray-800">FindMovies</h1>
            </div>

            {/* Search Input with Results Dropdown */}
            <div className="flex w-2/3 relative" ref={searchContainerRef}>
                <div className="w-full relative">
                    <input
                        type="text"
                        placeholder="Search movies and TV shows..."
                        onChange={(event) => handleInputChange(event.target.value)}
                        onFocus={() => setShowResults(true)}
                        value={search}
                        className="bg-white w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    {/* Search Results Dropdown */}
                    {showResults && (
                        <SearchResults
                            results={data?.results || []}
                            isLoading={isLoading}
                            isError={isError}
                            query={debouncedSearch}
                            onResultClick={handleResultClick}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchHeader;
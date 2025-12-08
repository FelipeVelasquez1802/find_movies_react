import findMoviesLogo from '../../../../assets/find-movies-icon.svg';
import {useEffect, useRef, useState} from 'react';
import {useDebounce} from '@/core/hooks';
import {useSearchMulti} from '@/modules/movies/queries';
import type {BaseMedia} from '@/modules/movies/models/entity';
import SearchResults from './SearchResults.tsx';
import SearchInput from "@/core/components/input/SearchInput.tsx";

interface SearchHeaderProps {
    onResultClick?: (media: BaseMedia) => void;
}

const SearchHeader = ({ onResultClick }: SearchHeaderProps) => {
    const [search, setSearch] = useState('');
    const [showResults, setShowResults] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    const debouncedSearch = useDebounce(search, 300);

    const { data, isLoading, isError } = useSearchMulti(debouncedSearch, 1);

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
            <div className="flex w-1/3 justify-center items-center p-2">
                <img
                    src={findMoviesLogo}
                    alt="FindMovies icon"
                    className="w-8 h-8"
                />
                <h1 className="px-2 text-2xl">FindMovies</h1>
            </div>

            <div className="flex w-2/3 relative" ref={searchContainerRef}>
                <div className="w-full relative">

                    <SearchInput
                        search={search}
                        onChangeSearch={handleInputChange}
                        placeholder="Search FindMovies"
                        onFocus={() => setShowResults(true)}
                    />

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
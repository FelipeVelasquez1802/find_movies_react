import {Search, X} from "lucide-react";

interface SearchInputProps {
    search: string
    onChangeSearch: (value: string) => void
    placeholder?: string,
    onFocus?: () => void
}

const SearchInput = (
    {
        search,
        onChangeSearch,
        placeholder,
        onFocus,
    }: SearchInputProps
) => {
    return (
        <div
            className="bg-white flex flex-row items-center gap-2 px-2 py-3 rounded-md border focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
        >
            <Search
                color="gray"
            />
            <input
                placeholder={placeholder}
                value={search}
                onChange={(e) => onChangeSearch(e.target.value)}
                onFocus={onFocus}
                className="bg-white flex-1 focus:outline-none"
            />

            {search !== '' && (
                <X
                    onClick={() => {
                        onChangeSearch('')
                    }}
                />
            )}
        </div>
    )
}

export default SearchInput
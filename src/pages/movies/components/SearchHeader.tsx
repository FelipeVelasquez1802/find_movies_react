import findMoviesLogo from '../../../assets/find-movies-icon.svg'
import {useState} from "react";

const SearchHeader = () => {
    const [search, setSearch] = useState('');
    return (
        <div className="flex justify-around px-16 py-8">
            <div className="flex w-1/3 justify-center p-2">
                <img
                    src={findMoviesLogo}
                    alt={"icon"}
                />
                <h1 className="px-2">FindMovies</h1>
            </div>
            <div className="flex w-2/3 rounded-md overflow-hidden">
                <input
                    placeholder={"Search FindMovies"}
                    onChange={(event) => {
                        setSearch(event.target.value)
                    }}
                    value={search}
                    className="bg-white w-full"
                />
            </div>
        </div>
    )
}

export default SearchHeader
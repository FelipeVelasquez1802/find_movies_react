import SearchHeader from "./components/SearchHeader.tsx";
import ContentDashboard from "./components/ContentDashboard.tsx";

const MovieDashboard = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <SearchHeader/>
                <ContentDashboard/>
            </div>
        </>
    )
}

export default MovieDashboard;
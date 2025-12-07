import './App.css'
import MovieDashboard from "./pages/movies/MovieDashboard.tsx";

function App() {
    // const { data: movies, isLoading, isError, error } = usePopularMovies();
    //
    // if (isLoading) {
    //     return (
    //         <div className="flex justify-center items-center min-h-screen">
    //             <div className="text-xl text-gray-100">Cargando películas...</div>
    //         </div>
    //     );
    // }
    //
    // if (isError) {
    //     return (
    //         <div className="flex justify-center items-center min-h-screen">
    //             <div className="text-xl text-red-500">
    //                 Error: {error?.message || 'No se pudieron cargar las películas'}
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <>
            <MovieDashboard/>
        </>
    )
}

export default App

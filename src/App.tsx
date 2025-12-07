import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDashboard from './pages/movies/MovieDashboard';
import MediaDetail from './pages/movies/MediaDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MovieDashboard />} />
                <Route path="/:type/:id" element={<MediaDetail />} />
            </Routes>
        </Router>
    );
}

export default App;

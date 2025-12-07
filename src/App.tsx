import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDashboardPage from '@/pages/movies/MovieDashboardPage.tsx';
import MediaDetailPage from '@/pages/movies/MediaDetailPage.tsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MovieDashboardPage />} />
                <Route path="/:type/:id" element={<MediaDetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;

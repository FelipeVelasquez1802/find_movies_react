import axios, { type AxiosInstance, type AxiosError } from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

if (!TMDB_API_KEY) {
    console.error('⚠️ TMDB API Key is missing! Please set VITE_TMDB_API_KEY in .env.local');
}

export const tmdbClient: AxiosInstance = axios.create({
    baseURL: TMDB_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

tmdbClient.interceptors.request.use(
    (config) => {
        config.params = {
            ...config.params,
            api_key: TMDB_API_KEY,
            language: 'es-ES',
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

tmdbClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            console.error('TMDB API Error:', {
                status: error.response.status,
                data: error.response.data,
                url: error.config?.url,
            });

            switch (error.response.status) {
                case 401:
                    throw new Error('API Key inválida. Verifica tu configuración.');
                case 404:
                    throw new Error('Recurso no encontrado.');
                case 429:
                    throw new Error('Demasiadas solicitudes. Intenta de nuevo más tarde.');
                default:
                    throw new Error('Error al conectar con TMDB. Intenta de nuevo.');
            }
        } else if (error.request) {
            console.error('Network Error:', error.request);
            throw new Error('Error de conexión. Verifica tu internet.');
        } else {
            console.error('Error:', error.message);
            throw new Error('Error inesperado. Intenta de nuevo.');
        }
    }
);

export const getImageUrl = (path: string | null, size: 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string => {
    if (!path) return '/placeholder-movie.png';
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getPosterUrl = (path: string | null): string => getImageUrl(path, 'w342');
export const getBackdropUrl = (path: string | null): string => getImageUrl(path, 'w780');
export const getProfileUrl = (path: string | null): string => getImageUrl(path, 'w185');
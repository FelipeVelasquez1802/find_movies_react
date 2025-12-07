# 🎬 FindMovies - Movie & TV Show Discovery App

A modern, responsive web application for discovering movies and TV shows using the TMDB (The Movie Database) API. Built with React, TypeScript, and Vite, featuring a clean architecture and excellent user experience.

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat&logo=tailwind-css)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Architecture](#-architecture)
- [API Integration](#-api-integration)
- [Components](#-components)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)

---

## ✨ Features

### 🔍 Smart Search
- **Real-time search** with debouncing (300ms)
- **Maximum 5 results** displayed in dropdown
- Search across **movies and TV shows**
- **Loading, error, and empty states**
- Click outside to close results

### 🎯 Featured Today Section
- **Tabbed interface** (Movies / Series)
- Display **~20 popular movies**
- Display **~20 popular TV shows**
- **Horizontal scroll** with navigation arrows
- Real-time data from TMDB API

### 🆕 Premieres & Announcements
- Filter movies by year (currently 2025)
- **Horizontal scrollable** list
- **Movie counter** display
- Latest releases and upcoming premieres

### 📄 Detailed View
- **Unique URL** for each movie/TV show (`/:type/:id`)
- Full movie/show information:
  - Backdrop image with gradient overlay
  - Poster image
  - Title, tagline, and rating
  - Year, runtime/seasons
  - Genres
  - Overview/synopsis
  - Director (movies) or Creators (TV shows)
  - **Cast with profile photos**
  - Budget and revenue (movies)
  - Production status
- **Back button** to return home
- Loading and error states

### 🎨 UI/UX
- **Responsive design** (mobile, tablet, desktop)
- **Smooth animations** and transitions
- **Hover effects** on interactive elements
- **Dark theme** for detail pages
- **Skeleton loaders** (spinners)
- **Error handling** with retry buttons

---

## 🛠 Tech Stack

### Core
- **[React 19.2](https://react.dev/)** - UI library
- **[TypeScript 5.6](https://www.typescriptlang.org/)** - Type safety
- **[Vite 7.2](https://vitejs.dev/)** - Build tool & dev server

### State Management & Data Fetching
- **[TanStack Query v5](https://tanstack.com/query)** - Server state management
- **[Axios](https://axios-http.com/)** - HTTP client

### Routing
- **[React Router v6](https://reactrouter.com/)** - Client-side routing

### Styling
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework

### API
- **[TMDB API](https://www.themoviedb.org/documentation/api)** - Movie & TV data

---

## 📂 Project Structure

```
src/
├── core/                           # Core application modules
│   ├── components/                 # Shared/reusable components
│   │   ├── Tabs.tsx               # Generic tabs component
│   │   ├── HorizontalScrollContainer.tsx  # Horizontal scroll with arrows
│   │   └── card/
│   │       └── MediaCard.tsx      # Movie/TV show card
│   ├── config/                     # App configuration
│   │   ├── tmdbConfig.ts          # Axios instance & TMDB client
│   │   └── queryClient.ts         # TanStack Query client
│   └── hooks/                      # Custom React hooks
│       ├── useDebounce.ts         # Debounce hook for search
│       └── index.ts
│
├── modules/                        # Feature modules
│   └── movies/                     # Movies & TV shows module
│       ├── models/                 # Data models
│       │   ├── dto/               # Data Transfer Objects (API format)
│       │   │   ├── TMDBMovieDTO.ts
│       │   │   └── index.ts
│       │   └── entity/            # Domain entities (app format)
│       │       ├── Movie.ts
│       │       └── index.ts
│       ├── services/              # Business logic
│       │   ├── tmdb.repository.ts # TMDB API repository
│       │   └── mappers/
│       │       └── movieMapper.ts # DTO ↔ Entity mappers
│       └── queries/               # TanStack Query hooks
│           ├── movieQueries.ts
│           └── index.ts
│
├── pages/                          # Page components
│   └── movies/
│       ├── MovieDashboardPage.tsx     # Home page
│       ├── MediaDetailPage.tsx        # Detail page
│       └── components/            # Page-specific components
│           ├── SearchHeader.tsx
│           ├── SearchResults.tsx
│           ├── SearchResultItem.tsx
│           ├── ContentDashboard.tsx
│           ├── FeaturedToday.tsx
│           └── PremieresSection.tsx
│
├── App.tsx                        # App routes
├── main.tsx                       # App entry point
└── assets/                        # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x (or yarn/pnpm)
- **TMDB API Key** ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd find_movies_react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Add your TMDB API key** to `.env.local`:
   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser** at `http://localhost:5173`

---

## 🔐 Environment Setup

### Required Variables

Create a `.env.local` file in the root directory:

```env
# TMDB API Configuration
VITE_TMDB_API_KEY=your_actual_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

### Getting a TMDB API Key

1. Create a free account at [TMDB](https://www.themoviedb.org/signup)
2. Go to [Settings > API](https://www.themoviedb.org/settings/api)
3. Request an API key (choose "Developer" option)
4. Copy your API key to `.env.local`

---

## 🏗 Architecture

### Clean Architecture Principles

This project follows **Clean Architecture** and **Feature-First** structure inspired by SEVA architecture:

#### Layers

1. **Core Layer** (`src/core/`)
   - Shared components, hooks, and utilities
   - Framework-agnostic business logic
   - Configuration files

2. **Modules Layer** (`src/modules/`)
   - Feature-based modules (e.g., movies)
   - Each module contains:
     - **Models**: DTOs and Entities
     - **Services**: Business logic and API calls
     - **Queries**: Data fetching hooks

3. **Pages Layer** (`src/pages/`)
   - UI components and page layouts
   - Orchestrates modules and core components

### Design Patterns

- **Repository Pattern**: Abstracts data access (TMDB API)
- **Mapper Pattern**: Converts DTOs ↔ Entities
- **Custom Hooks**: Encapsulates reusable logic
- **Dependency Injection**: Via React context and props

---

## 🌐 API Integration

### TMDB Repository

The `tmdbRepository` provides methods for all TMDB API endpoints:

#### Movies
```typescript
getPopularMovies(page)        // Popular movies
getTopRatedMovies(page)       // Top rated movies
getNowPlayingMovies(page)     // Now playing in theaters
discoverMovies(params)        // Discover with filters (year, genre)
getMovieDetail(id)            // Full movie details with cast
```

#### TV Shows
```typescript
getPopularTVShows(page)       // Popular TV shows
getTopRatedTVShows(page)      // Top rated TV shows
getOnTheAirTVShows(page)      // Currently airing
discoverTVShows(params)       // Discover with filters
getTVShowDetail(id)           // Full TV show details with cast
```

#### Search
```typescript
searchMulti(query, page)      // Search movies and TV shows
searchMovies(query, page)     // Search only movies
searchTVShows(query, page)    // Search only TV shows
```

### TanStack Query Hooks

Pre-configured hooks with caching:

```typescript
// Movies
usePopularMovies(page)
useTopRatedMovies(page)
useNowPlayingMovies(page)
useDiscoverMovies(year, page)
useMovieDetail(movieId)

// TV Shows
usePopularTVShows(page)
useTopRatedTVShows(page)
useOnTheAirTVShows(page)
useDiscoverTVShows(year, page)
useTVShowDetail(tvId)

// Search
useSearchMulti(query, page)
```

**Cache Configuration:**
- Popular content: 5 min stale time, 10 min garbage collection
- Detail pages: 10 min stale time, 30 min garbage collection
- Search results: 2 min stale time, 5 min garbage collection

---

## 🧩 Components

### Core Components

#### `<Tabs />`
Generic tabbed interface component.
```typescript
<Tabs
  tabs={[
    { id: 'movies', label: 'Movies', content: <MovieList /> },
    { id: 'series', label: 'Series', content: <SeriesList /> }
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

#### `<HorizontalScrollContainer />`
Container with horizontal scroll and arrow navigation.
```typescript
<HorizontalScrollContainer>
  {items.map(item => <MediaCard key={item.id} media={item} />)}
</HorizontalScrollContainer>
```

#### `<MediaCard />`
Display card for movies/TV shows.
```typescript
<MediaCard
  media={movie}
  onClick={() => navigate(`/movie/${movie.id}`)}
/>
```

### Custom Hooks

#### `useDebounce(value, delay)`
Debounces a value to reduce API calls.
```typescript
const debouncedSearch = useDebounce(searchTerm, 300);
```

---

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

---

## 🎨 Styling Guidelines

### Tailwind Classes

This project uses **Tailwind CSS 4.0** with a utility-first approach:

- **Colors**: Gray scale for UI, custom colors for branding
- **Spacing**: Consistent spacing scale (4, 6, 8, etc.)
- **Typography**: `font-semibold`, `font-bold` for headings
- **Animations**: `transition-*`, `hover:*`, `animate-spin`

### Responsive Design

- **Mobile-first** approach
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Flexbox and Grid for layouts

---

## 🗺 Roadmap

### Future Enhancements

- [ ] Add user authentication
- [ ] Implement watchlist/favorites
- [ ] Add advanced filters (genre, year range, rating)
- [ ] Implement infinite scroll for lists
- [ ] Add trailers and videos
- [ ] Enhanced skeleton loaders
- [ ] Dark/light theme toggle
- [ ] Multi-language support
- [ ] PWA support (offline mode)

---

## 📖 Documentation

### Additional Docs

- **[API Setup Guide](./API_SETUP.md)** - Detailed TMDB API configuration
- **[TMDB API Docs](https://developers.themoviedb.org/3)** - Official API documentation

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is for educational purposes. Movie data provided by [TMDB](https://www.themoviedb.org/).

---

## 🙏 Acknowledgments

- **[TMDB](https://www.themoviedb.org/)** for providing the amazing API
- **[React Team](https://react.dev/)** for the incredible library
- **[Vite Team](https://vitejs.dev/)** for the lightning-fast build tool
- **[TanStack Query](https://tanstack.com/query)** for powerful data fetching

---

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, and Vite**
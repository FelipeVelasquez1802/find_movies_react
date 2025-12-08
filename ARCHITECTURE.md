# FindMovies - Architecture Documentation

React application for browsing movies and TV shows using TMDB API, built with Feature-First Clean Architecture.

## 🏗️ Architecture Overview

This project follows **Feature-First Clean Architecture** inspired by SEVA architecture, balancing clean architecture principles with developer experience.

```
src/
├── core/                   # Core infrastructure and utilities
│   ├── components/         # Reusable UI components (Tabs, Cards, etc.)
│   ├── config/            # App configuration (API client, TMDB config)
│   ├── hooks/             # Shared custom hooks (useDebounce)
│   └── utils/             # Pure utility functions
├── shared/                # Cross-feature shared resources
│   ├── components/        # Truly reusable components across features
│   ├── hooks/             # Shared hooks across features
│   ├── constants/         # Shared constants
│   └── utils/             # Shared utility functions
├── modules/               # Business modules (feature-bounded contexts)
│   └── movies/            # Movies feature module
│       ├── dependencies/  # 🆕 Dependency injection container
│       │   ├── container.ts      # DI container with singleton pattern
│       │   └── index.ts          # Clean exports
│       ├── models/        # Data models and contracts
│       │   ├── dto/              # Data Transfer Objects (API contracts)
│       │   └── entity/           # Domain entities
│       ├── queries/       # TanStack Query hooks (server state)
│       │   ├── movieQueries.ts   # Query hooks for API calls
│       │   └── index.ts
│       ├── services/      # Business logic implementations
│       │   ├── IMovieRepository.ts      # Repository interface
│       │   ├── movie.repository.ts      # Repository implementation
│       │   ├── mappers/                 # DTO to Entity mappers
│       │   └── index.ts
│       └── index.ts       # Module barrel exports
└── pages/                 # UI pages organized by feature
    └── movies/            # Movies feature pages
        ├── components/    # Page-specific components
        ├── controllers/   # 🆕 Presentation layer controllers
        │   ├── useMovieDashboardController.ts
        │   ├── useMediaDetailController.ts
        │   └── index.ts
        ├── MovieDashboardPage.tsx
        └── MediaDetailPage.tsx
```

## 🎯 Key Architecture Patterns

### 1. Dependency Injection Container

Following SEVA pattern, we use a centralized DI container:

```typescript
// modules/movies/dependencies/container.ts
class MovieServiceContainer {
    private static instance: MovieServiceContainer;
    private _movieRepository: IMovieRepository;

    private constructor() {
        this._movieRepository = new MovieRepository();
    }

    static getInstance(): MovieServiceContainer {
        if (!MovieServiceContainer.instance) {
            MovieServiceContainer.instance = new MovieServiceContainer();
        }
        return MovieServiceContainer.instance;
    }

    get movieRepository(): IMovieRepository {
        return this._movieRepository;
    }

    setMovieRepository(repository: IMovieRepository): void {
        this._movieRepository = repository;
    }
}

export const movieServiceContainer = MovieServiceContainer.getInstance();
export const movieRepository = movieServiceContainer.movieRepository;
```

**Benefits:**
- Single source of truth for dependencies
- Easy to swap implementations (testing, different APIs)
- Testability with mock repositories

### 2. Repository Pattern with Interface

```typescript
// services/IMovieRepository.ts - Contract
export interface IMovieRepository {
    getPopularMovies(page?: number): Promise<{ movies: Movie[]; totalPages: number }>;
    getMovieDetail(movieId: number): Promise<MovieDetail>;
    // ... more methods
}

// services/movie.repository.ts - Implementation
export class MovieRepository implements IMovieRepository {
    async getPopularMovies(page: number = 1) {
        const response = await tmdbClient.get('/movie/popular', { params: { page } });
        return {
            movies: MovieMapper.movieListToDomain(response.data.results),
            totalPages: response.data.total_pages,
        };
    }
}
```

**Benefits:**
- Dependency inversion principle
- Easy to create mock implementations for testing
- Business logic depends on abstractions, not implementations

### 3. Controller Pattern (Presentation Layer)

```typescript
// pages/movies/controllers/useMovieDashboardController.ts
export const useMovieDashboardController = () => {
    const navigate = useNavigate();

    const handleMediaClick = (media: BaseMedia): void => {
        navigate(`/${media.mediaType}/${media.id}`);
    };

    return {
        handleMediaClick,
    };
};

// Usage in page
const MovieDashboardPage = () => {
    const { handleMediaClick } = useMovieDashboardController();

    return (
        <div className="flex flex-col min-h-screen">
            <SearchHeader onResultClick={handleMediaClick} />
            <ContentDashboard onMediaClick={handleMediaClick} />
        </div>
    );
};
```

**Benefits:**
- Separation of business logic from UI
- Testable presentation logic
- Clean components focused on rendering

### 4. Mapper Pattern

```typescript
// services/mappers/movieMapper.ts
export class MovieMapper {
    static movieListToDomain(dtos: MovieDTO[]): Movie[] {
        return dtos.map(dto => ({
            id: dto.id,
            title: dto.title || dto.original_title,
            overview: dto.overview,
            posterPath: dto.poster_path,
            // ... snake_case to camelCase conversion
        }));
    }
}
```

**Benefits:**
- Decouples API contracts from domain models
- Single place to handle API changes
- Clean separation between DTOs and Entities

## 📦 Path Aliases

Configured in `vite.config.ts` and `tsconfig.app.json`:

```typescript
{
  "@core/*": ["src/core/*"],       // Core infrastructure
  "@shared/*": ["src/shared/*"],   // Cross-feature shared resources
  "@modules/*": ["src/modules/*"], // Business modules
  "@pages/*": ["src/pages/*"]      // UI pages
}
```

**Usage:**
```typescript
// ✅ Cross-feature imports (use path aliases)
import { movieRepository } from '@modules/movies/dependencies';
import { useDebounce } from '@core/hooks';

// ✅ Within-feature imports (use relative paths)
import { LoginForm } from './components/LoginForm';
import { useAuth } from './hooks/useAuth';
```

## 🔄 Data Flow

```
User Action
    ↓
Controller (useMovieDashboardController)
    ↓
TanStack Query Hook (usePopularMovies)
    ↓
Repository (movieRepository.getPopularMovies)
    ↓
HTTP Client (tmdbClient)
    ↓
Mapper (MovieMapper.movieListToDomain)
    ↓
Domain Entities (Movie[])
    ↓
Component Render
```

## 🧪 Testing Strategy

### Unit Tests
```typescript
// Test repository with mock HTTP client
describe('MovieRepository', () => {
    it('should fetch popular movies', async () => {
        const mockRepository = new MovieRepository();
        const result = await mockRepository.getPopularMovies(1);
        expect(result.movies).toBeDefined();
    });
});
```

### Integration Tests
```typescript
// Test with DI container
describe('Movie Dashboard', () => {
    beforeEach(() => {
        movieServiceContainer.setMovieRepository(new MockMovieRepository());
    });

    it('should display movies', async () => {
        // Test with mocked repository
    });
});
```

## 🚀 Benefits of This Architecture

1. **Feature Discoverability**: Related code is co-located
2. **Development Velocity**: Less folder navigation, more feature building
3. **Testability**: Easy to mock dependencies and test in isolation
4. **Maintainability**: Clear separation of concerns
5. **Scalability**: Easy to add new features following established patterns
6. **Type Safety**: Full TypeScript coverage with interfaces and types
7. **Flexibility**: Can swap implementations without changing business logic

## 📚 Comparison with Traditional Clean Architecture

### Traditional (Layer-First)
```
src/
├── domain/
│   └── movies/
├── infrastructure/
│   └── movies/
└── presentation/
    └── movies/
```

### Our Approach (Feature-First)
```
src/
├── modules/movies/
│   ├── dependencies/
│   ├── models/
│   ├── queries/
│   └── services/
└── pages/movies/
    ├── components/
    └── controllers/
```

**Why Feature-First?**
- All movie-related code in one place
- Easier for teams to work on different features
- Better developer experience and context
- Still maintains architectural boundaries

## 🔮 Future Enhancements

- [ ] Add more features (TV shows, search, favorites)
- [ ] Implement caching strategies
- [ ] Add E2E tests with Playwright
- [ ] Create mock repository for offline development
- [ ] Add more cross-feature shared components to `@shared/`
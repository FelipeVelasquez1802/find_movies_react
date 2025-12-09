import type { Meta, StoryObj } from '@storybook/react';
import MediaCard from './MediaCard';
import type { BaseMedia } from '@/modules/movies/models/entity';

const meta = {
  title: 'Core/Card/MediaCard',
  component: MediaCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    media: {
      description: 'Media data object',
    },
    onClick: {
      description: 'Callback when card is clicked',
    },
  },
  args: {
    onClick: () => console.log('Card clicked'),
  },
} satisfies Meta<typeof MediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockMovie: BaseMedia = {
  id: 550,
  title: 'Fight Club',
  originalTitle: 'Fight Club',
  posterPath: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
  backdropPath: '/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg',
  overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.',
  releaseDate: '1999-10-15',
  voteAverage: 8.4,
  voteCount: 26280,
  popularity: 64.5,
  genreIds: [18, 53, 35],
  mediaType: 'movie',
};

const mockMovieNoScore: BaseMedia = {
  id: 551,
  title: 'The Matrix',
  originalTitle: 'The Matrix',
  posterPath: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
  backdropPath: '/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg',
  overview: 'Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.',
  releaseDate: '1999-03-31',
  voteAverage: 0,
  voteCount: 0,
  popularity: 50.2,
  genreIds: [28, 878],
  mediaType: 'movie',
};

const mockMovieNoPoster: BaseMedia = {
  id: 552,
  title: 'Unknown Movie',
  originalTitle: 'Unknown Movie',
  posterPath: null,
  backdropPath: null,
  overview: 'A movie with no poster image available.',
  releaseDate: '2024-01-01',
  voteAverage: 7.5,
  voteCount: 1234,
  popularity: 12.3,
  genreIds: [18],
  mediaType: 'movie',
};

const mockTVShow: BaseMedia = {
  id: 1396,
  title: 'Breaking Bad',
  originalTitle: 'Breaking Bad',
  posterPath: '/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg',
  backdropPath: '/9faGSFi5jam6pDWGNd0p8JcJgXQ.jpg',
  overview: 'When Walter White, a chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of two years left to live, he makes a desperate bid to earn enough money to leave his family financially secure.',
  releaseDate: '2008-01-20',
  voteAverage: 9.3,
  voteCount: 12590,
  popularity: 385.3,
  genreIds: [18, 80],
  mediaType: 'tv',
};

export const Movie: Story = {
  args: {
    media: mockMovie,
  },
};

export const MovieWithHighScore: Story = {
  args: {
    media: mockTVShow,
  },
};

export const MovieNoScore: Story = {
  args: {
    media: mockMovieNoScore,
  },
};

export const MovieNoPoster: Story = {
  args: {
    media: mockMovieNoPoster,
  },
};

export const MovieLongTitle: Story = {
  args: {
    media: {
      ...mockMovie,
      title: 'The Lord of the Rings: The Fellowship of the Ring',
    },
  },
};
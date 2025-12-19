// TODO: make functions get real data from the database later on
import type { AniListMedia } from "../../schemas/animeSchemas";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const genreOptions = [
  "Action",
  "Drama",
  "Romance",
  "Sports",
  "Slice of Life",
  "Fantasy",
];

const seasonOptions = ["WINTER", "SPRING", "SUMMER", "FALL"];

const makeAnime = (
  id: number,
  title: string,
  genres: string[],
): AniListMedia => ({
  id,
  title: { english: title },
  episodes: 24,
  coverImage: {
    large:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
    medium:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
  },
  bannerImage: undefined,
  genres,
  description: "Mock payload until API wiring is complete.",
  averageScore: 78,
  status: "FINISHED",
  studios: { nodes: [] },
  characters: { edges: [] },
});

const mockAnimePool: AniListMedia[] = [
  makeAnime(100, "Haikyuu!!", ["Sports", "Drama"]),
  makeAnime(101, "Jujutsu Kaisen", ["Action", "Fantasy"]),
  makeAnime(102, "Toradora!", ["Romance", "Slice of Life"]),
  makeAnime(103, "Made in Abyss", ["Fantasy", "Drama"]),
  makeAnime(104, "Blue Lock", ["Sports"]),
  makeAnime(105, "Skip and Loafer", ["Slice of Life"]),
];

interface CategoryFilters {
  genre?: string;
  season?: string;
}

export async function getAnimeByCategory(
  filters: CategoryFilters,
): Promise<AniListMedia[]> {
  await delay(220);
  const { genre } = filters;
  if (!genre) {
    return mockAnimePool;
  }
  return mockAnimePool.filter((anime) => anime.genres?.includes(genre));
}

export async function getAvailableGenres(): Promise<string[]> {
  await delay(75);
  return genreOptions;
}

export async function getSeasons(): Promise<string[]> {
  await delay(75);
  return seasonOptions;
}


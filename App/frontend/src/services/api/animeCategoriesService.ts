// TODO: make functions get real data from the database later on
import type {
  AniListMedia,
  AnimePaginationResponse,
  ShowcaseResponse,
} from "../../schemas/animeSchemas";
import axios from "axios";
import { backendUrl } from "./fetchAnimes";
import { GenreI } from "../../schemas/genres";
import { SeasonsI } from "../../schemas/seasons";
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
} from "../../pages/AnimeCategoriesPage";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// genreOptions to be sent to the backend
const genreOptions = [
  "Action",
  "Drama",
  "Romance",
  "Sports",
  "Slice of Life",
  "Fantasy",
];

// seasonOptions to be sent to the backend
const seasonOptions = ["WINTER", "SPRING", "SUMMER", "FALL"];

// filler anime info
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

// dummy data
const mockAnimePool: AniListMedia[] = [
  makeAnime(100, "Haikyuu!!", ["Sports", "Drama"]),
  makeAnime(101, "Jujutsu Kaisen", ["Action", "Fantasy"]),
  makeAnime(102, "Toradora!", ["Romance", "Slice of Life"]),
  makeAnime(103, "Made in Abyss", ["Fantasy", "Drama"]),
  makeAnime(104, "Blue Lock", ["Sports"]),
  makeAnime(105, "Skip and Loafer", ["Slice of Life"]),
];

// interface for the filters (same as the backend)
interface CategoryFilters {
  // might make also null as well
  search?: string;
  genres?: string; // takes in an array of genres to send off
  season?: string;
  page?: number;
  perPage?: number;
}

// function to get the anime by category
export async function getAnimeByCategory(
  filters: CategoryFilters,
): Promise<AnimePaginationResponse> {
  try {
    const res = await axios.get<AnimePaginationResponse>(
      `${backendUrl}/anime/categories`,
      {
        // search param affects the type of filtering on the backend route
        params: {
          ...filters,
          page: filters.page ?? DEFAULT_PAGE,
          perPage: filters.perPage ?? DEFAULT_PER_PAGE,
        },
      },
    );

    const page = res.data?.data?.Page;

    if (!page) {
      throw new Error("No page data found in the category fetch response");
    }

    return res.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch category data: ${message}`);
  }
}

export async function getAvailableGenres(): Promise<string[]> {
  // make a request to the backend to get the data for the genres
  // TODO: might make send params to as well to help with getting specific anime genres
  const res = await axios.get<GenreI>(`${backendUrl}/anime/genres`);
  // returns an array of strings for the UI
  return res.data.genres;
}

export async function getSeasons(): Promise<string[]> {
  const res = await axios.get<SeasonsI>(`${backendUrl}/anime/seasons`);
  console.log(res.data.seasons);
  // return seasons
  return res.data?.seasons;
}

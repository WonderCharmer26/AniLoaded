// TODO: make functions get real data from the database later on
import type {
  AniListMedia,
  ShowcaseResponse,
} from "../../schemas/animeSchemas";
import axios from "axios";
import { backendUrl } from "./fetchAnimes";
import { GenreI } from "../../schemas/genres";
import { SeasonsI } from "../../schemas/seasons";

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
  genres?: string[]; // takes in an array of genres to send off
  season?: string;
}

// function to get the anime by category
export async function getAnimeByCategory(
  filters: CategoryFilters,
): Promise<AniListMedia[]> {
  try {
    // might need to make params object that stores the value if the key exists
    // get the genre or season to pass into the api call
    if (filters.genres || filters.season) {
      // defaults will be passed into the request
      const res = await axios.get<ShowcaseResponse>(
        // ShowcaseResponse to make sure that the raw data from the backend is structured properly to be mapped
        `${backendUrl}/anime/categories`,
        {
          // send the genre and the seasons to the backend
          params: filters,
        },
      );
      // get the data and send it
      return res.data.data.Page.media ?? [];
    }
    return [];
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

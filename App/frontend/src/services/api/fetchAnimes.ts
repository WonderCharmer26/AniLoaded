// different functions to fetch the different types of animes from the supabase database

// imports needed
import axios from "axios";
import {
  AniListMedia,
  AnimeInfoPageResponse,
  ShowcaseResponse,
} from "../../schemas/animeSchemas"; // types for AniList response
// use Supabase client to connect to the database

// import env variables to help make the fetch
const backendUrl = import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
  throw new Error(
    "VITE_BACKEND_URL is missing. Please add it to the env file.",
  );
}

if (import.meta.env.DEV) {
  console.debug("Using backend URL", backendUrl);
}

// function to fetch the top animes (top anime from the anime API)
export async function getTrending(): Promise<AniListMedia[]> {
  const res = await axios.get<ShowcaseResponse>(`${backendUrl}/trending`);
  const media = res.data?.data?.Page?.media ?? [];
  return media;
}

// function to get the popular anime from backend api
// NOTE: the promise that I get back is the AniListMedia that I define in the schema
export async function getPopular(): Promise<AniListMedia[]> {
  const res = await axios.get<ShowcaseResponse>(`${backendUrl}/popular`);
  const media = res.data?.data.Page?.media ?? []; // send empty array if no data found
  return media;
}

// function to get the Top Rated Animes from the backend
export async function getTopAnime(): Promise<AniListMedia[]> {
  const res = await axios.get<ShowcaseResponse>(`${backendUrl}/top-anime`);
  const media = res.data?.data.Page?.media ?? []; // return data if not return an empty array
  return media;
}

// Function to get all data for the anime info page
// anime_id: given from frontend to get the anime info for the anime page
// NOTE: MIGHT MAKE CHANGES TO THE ERROR HANDLING IN THE CATCH TO HELP WITH AXIOS WITH ERRORS
export async function getAnimeInfo(anime_id: number): Promise<AniListMedia> {
  if (!Number.isInteger(anime_id) || anime_id <= 0) {
    throw new Error("Invalid anime id. The id must be a positive integer.");
  }

  try {
    const res = await axios.get<AnimeInfoPageResponse>(
      `${backendUrl}/anime/${anime_id}`,
    );
    const animeInfo = res.data.data?.Media;
    if (!animeInfo) {
      throw new Error(`Anime ${anime_id} not found`);
    }
    return animeInfo;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch anime ${anime_id}: ${message}`);
  }
}

// function to get the users own top anime from supabase
export function usersTopAnime() {}

// other anime functions if needed to be added

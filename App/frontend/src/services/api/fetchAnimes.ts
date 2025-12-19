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
const backendUrl = import.meta.env.VITE_BACKEND_URL; //

// check if the env variable is brought over properly
if (import.meta.env.DEV && backendUrl) {
  console.debug("fetching the backendUrl was a success", backendUrl);
} else {
  console.debug(`There was an error getting the backendUrl: ${backendUrl}`);
  throw Error(
    "There was an error getting the backendUrl url from the env file",
  );
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
export async function getAnimeInfo(anime_id: number): Promise<AniListMedia> {
  // check the anime_id to see if valid
  if (Number.isFinite(anime_id)) {
    throw new Error("There was an error with the Anime ID that was sent.");
  }

  const res = await axios.get<AnimeInfoPageResponse>(
    `${backendUrl}/anime/${anime_id}`,
  );
  const animeInfo = res.data.data.Media ?? [];
  return animeInfo;
}

// function to get the users own top anime from supabase
export function usersTopAnime() {}

// other anime functions if needed to be added

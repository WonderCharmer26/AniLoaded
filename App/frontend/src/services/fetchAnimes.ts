// different functions to fetch the different types of animes from the supabase database

// imports needed
import axios from "axios";
import { AniListMedia, TrendingResponse } from "../schemas/animeSchemas"; // types for AniList response
// use Supabase client to connect to the database

// import env variables to help make the fetch
const backendUrl = import.meta.env.VITE_BACKEND_URL!; // WARNING: import might not be working evaluate LSP

// check if the env variable is brought over properly
console.log("backendUrl", backendUrl);

// function to fetch the top animes (top anime from the anime API)
export async function getTrending(): Promise<AniListMedia[]> {
  const res = await axios.get<TrendingResponse>(`${backendUrl}/trending`);
  const media = res.data?.data?.Page?.media ?? [];
  return media;
}

// function to get the users own top anime from supabase
export function usersTopAnime() {}

// other anime functions if needed to be added

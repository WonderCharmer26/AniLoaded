// different functions to fetch the different types of animes from the supabase database

// imports needed
import axios from "axios";
import { media } from "../schemas/animeSchemas"; // handle the data that is fetched from the api
// use Supabase client to connect to the database

// import env variables to help make the fetch
const backendUrl = import.meta.env.VITE_BACKEND_URL!;

console.log("backendUrl", backendUrl);

// fumction to fetch the top animes ( top anime from the anime API)
export async function getTrending(): Promise<media[]> {
  const res = await axios.get<{ data: media[] }>(`${backendUrl}/trending`);
  return res.data.data;
}

// funtion to get the users own top anime from supabase
export function usersTopAnime() {}

// other anime functions if needed to be added

// this page is for the user to search the for the animes that they are interested in
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDisplayTitle } from "../schemas/animeSchemas";
import type { AniListMedia } from "../schemas/animeSchemas";
import {
  getAnimeByCategory,
  getAvailableGenres,
  getSeasons,
} from "../services/api/animeCategoriesService";
import { CategoryFilters } from "../components/CategoryFilters";
import { AnimeCard } from "../components/AnimeCard";

// default genre for when the user loads into the page
const DEFAULT_GENRE: string[] = ["Action"]; // route in the backend will get the param to pass in
const DEFAULT_SEASON: string = "WINTER";

export default function AnimeCategoriesPage() {
  const [params, setParams] = useSearchParams({
    genres: DEFAULT_GENRE,
    season: DEFAULT_SEASON,
  }); // start the search param as the default param to look for

  // handles getting the search params to send into the query functions
  const selectedGenre = params.get("genres") ?? ""; // get the search param from the param that get passed into the url for the genre
  const selectedSeason = params.get("season") ?? ""; // get the search params that get passed into the url for the season

  // displays the genres in the selector
  const { data: genres = [] } = useQuery<string[]>({
    queryKey: ["availableGenres"],
    queryFn: () => getAvailableGenres(),
  });

  // displays the seasons in the selector
  const { data: seasons = [] } = useQuery<string[]>({
    queryKey: ["availableSeasons"],
    queryFn: () => getSeasons(),
  });

  // function to get the specific anime
  const { data: anime = [], isLoading } = useQuery<AniListMedia[]>({
    queryKey: ["animeCategory", selectedGenre, selectedSeason],
    queryFn: () =>
      getAnimeByCategory({ genres: selectedGenre, season: selectedSeason }), // NOTE: make sure that the genre variable is better formed
  });

  const handleFilterChange = (type: "genres" | "season", value: string) => {
    // get the current search params from the url
    const next = new URLSearchParams(params);
    if (!value) {
      // if there is no value delete or clear the filter
      next.delete(type);
    } else {
      // otherwise set the type and the value to be passed into the search params
      next.set(type, value);
    }
    // update the search params to pass into the functions
    setParams(next);
  };

  // only change if the seasons change
  const seasonFilters = useMemo(() => seasons, [seasons]);

  return (
    <div className="px-6 py-10 space-y-10">
      {/* NOTE: might align the title and subtitle in the same row */}
      <section className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold uppercase text-white">Action</h1>
        <p className="max-w-3xl text-slate-300">
          Action is anime that you may like to watch. (will change with when the
          genre changes)
        </p>
      </section>

      <section className="flex justify-end items-center gap-2">
        <CategoryFilters
          genres={genres}
          seasons={seasonFilters}
          selectedGenre={selectedGenre}
          selectedSeason={selectedSeason}
          onSelectGenre={(value) => handleFilterChange("genres", value)}
          onSelectSeason={(value) => handleFilterChange("season", value)}
        />
        {/* <div className="bg-black py-2 px-4 uppercase rounded-lg">Other</div> */}
      </section>

      <section className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4 mb-20">
        {isLoading ? (
          // NOTE: add in a loading skeleton for the anime cards
          <p className="text-slate-400">Loading anime…</p>
        ) : (
          anime.map((item) => <AnimeCard key={item.id} anime={item} />)
        )}
      </section>
    </div>
  );
}

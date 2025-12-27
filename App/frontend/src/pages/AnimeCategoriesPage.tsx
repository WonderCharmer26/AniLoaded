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

// default genre for when the user loads into the page
const DEFAULT_GENRE = "Action"; // route in the backend will get the param to pass in

export default function AnimeCategoriesPage() {
  const [params, setParams] = useSearchParams({ genre: DEFAULT_GENRE }); // start the search param as the default param to look for

  // handles getting the search params to send into the query functions
  const selectedGenre = params.get("genre") ?? DEFAULT_GENRE; // get the search param from the param that get passed into the url for the genre
  const selectedSeason = params.get("season") ?? ""; // get the search params that get passed into the url for the season

  // gets the genre from the backend route
  const { data: genres = [] } = useQuery<string[]>({
    queryKey: ["availableGenres"],
    queryFn: () => getAvailableGenres(),
  });

  const { data: seasons = [] } = useQuery<string[]>({
    queryKey: ["availableSeasons"],
    queryFn: getSeasons,
  });

  const { data: anime = [], isLoading } = useQuery<AniListMedia[]>({
    queryKey: ["animeCategory", selectedGenre, selectedSeason],
    queryFn: () =>
      getAnimeByCategory({ genre: selectedGenre, season: selectedSeason }),
  });

  const handleFilterChange = (type: "genre" | "season", value: string) => {
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
          onSelectGenre={(value) => handleFilterChange("genre", value)}
          onSelectSeason={(value) => handleFilterChange("season", value)}
        />
        {/* <div className="bg-black py-2 px-4 uppercase rounded-lg">Other</div> */}
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-20">
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

// TODO: replace with actual anime card component
function AnimeCard({ anime }: { anime: AniListMedia }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
      <img
        src={anime.coverImage.large}
        alt={getDisplayTitle(anime.title)}
        className="h-64 w-full rounded-xl object-cover"
      />
      <div>
        <h3 className="text-xl font-semibold text-white">
          {getDisplayTitle(anime.title)}
        </h3>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
          {(anime.genres ?? []).slice(0, 3).join(" • ")}
        </p>
      </div>
      <button className="text-left text-sm font-semibold text-emerald-300">
        View details →
      </button>
    </article>
  );
}

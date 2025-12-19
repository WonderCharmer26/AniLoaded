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
  const selectedGenre = params.get("genre") ?? DEFAULT_GENRE; // get the search param from the param that get passed into the url for the genre
  const selectedSeason = params.get("season") ?? ""; // get the search params that get passed into the url for the season

  // gets the genre from the backend route
  const { data: genres = [] } = useQuery<string[]>({
    queryKey: ["availableGenres"],
    queryFn: getAvailableGenres,
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
    const next = new URLSearchParams(params);
    if (!value) {
      next.delete(type);
    } else {
      next.set(type, value);
    }
    setParams(next);
  };

  // only change if the seasons change
  const seasonFilters = useMemo(() => seasons, [seasons]);

  return (
    <div className="px-6 py-10 space-y-10">
      <section className="flex flex-col items-center space-y-4">
        <p className="text-sm tracking-[0.3em] text-emerald-300">DISCOVER</p>
        <h1 className="text-4xl font-bold text-white">Browse by vibe</h1>
        <p className="max-w-3xl text-slate-300">
          Use genre and season filters to jump into curated groupings. When the
          backend is ready these filters will sync to real AniList-powered data
          and respect query params for shareable deep links.
        </p>
      </section>

      <CategoryFilters
        genres={genres}
        seasons={seasonFilters}
        selectedGenre={selectedGenre}
        selectedSeason={selectedSeason}
        onSelectGenre={(value) => handleFilterChange("genre", value)}
        onSelectSeason={(value) => handleFilterChange("season", value)}
      />

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
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

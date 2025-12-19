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

// default genre for when the user loads into the page
const DEFAULT_GENRE = "Action";

export default function AnimeCategoriesPage() {
  const [params, setParams] = useSearchParams({ genre: DEFAULT_GENRE });
  const selectedGenre = params.get("genre") ?? DEFAULT_GENRE;
  const selectedSeason = params.get("season") ?? "";

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

  const seasonFilters = useMemo(() => seasons, [seasons]);

  return (
    <div className="px-6 py-10 space-y-10">
      <section className="space-y-4">
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

function CategoryFilters({
  genres,
  seasons,
  selectedGenre,
  selectedSeason,
  onSelectGenre,
  onSelectSeason,
}: {
  genres: string[];
  seasons: string[];
  selectedGenre: string;
  selectedSeason: string;
  onSelectGenre: (value: string) => void;
  onSelectSeason: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Genres
        </span>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => onSelectGenre(genre)}
              className={`rounded-full px-4 py-1 text-sm font-semibold ${selectedGenre === genre ? "bg-emerald-500 text-white" : "bg-slate-800/80 text-slate-300"}`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Season
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelectSeason("")}
            className={`rounded-full px-4 py-1 text-sm font-semibold ${selectedSeason ? "bg-slate-800/80 text-slate-300" : "bg-emerald-500 text-white"}`}
          >
            All
          </button>
          {seasons.map((season) => (
            <button
              key={season}
              onClick={() => onSelectSeason(season)}
              className={`rounded-full px-4 py-1 text-sm font-semibold ${selectedSeason === season ? "bg-emerald-500 text-white" : "bg-slate-800/80 text-slate-300"}`}
            >
              {season}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

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

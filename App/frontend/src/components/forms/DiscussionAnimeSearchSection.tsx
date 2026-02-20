import { getDisplayTitle } from "@/schemas/animeSchemas";
import type { AniListMedia } from "@/schemas/animeSchemas";
import { getAnimeByCategory } from "@/services/api/animeCategoriesService";
import { DiscussionFormApi } from "@/types/discussionForm";
import { useEffect, useState } from "react";

type DiscussionAnimeSearchSectionProps = {
  form: DiscussionFormApi;
};

type AnimeFieldApi = {
  state: {
    value: number;
    meta: {
      errors?: string[];
    };
  };
  handleBlur: () => void;
  handleChange: (value: number) => void;
};

const SEARCH_DELAY_MS = 300;
const SEARCH_RESULTS_LIMIT = 6;

function AnimeField({ field }: { field: AnimeFieldApi }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AniListMedia[]>([]);
  const [selectedAnimeTitle, setSelectedAnimeTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setResults([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    const timeout = window.setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getAnimeByCategory({
          search: trimmedQuery,
          page: 1,
          perPage: SEARCH_RESULTS_LIMIT,
        });

        if (isCancelled) {
          return;
        }

        setResults(response.data.Page.media ?? []);
      } catch (fetchError) {
        if (isCancelled) {
          return;
        }

        const message =
          fetchError instanceof Error
            ? fetchError.message
            : "Failed to search anime";

        setResults([]);
        setError(message);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }, SEARCH_DELAY_MS);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeout);
    };
  }, [query]);

  const fieldError = field.state.meta.errors?.[0];

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-200" htmlFor="anime-search">
        Anime
      </label>
      <input
        id="anime-search"
        value={query}
        onBlur={field.handleBlur}
        onChange={(event) => {
          if (field.state.value > 0) {
            field.handleChange(0);
            setSelectedAnimeTitle("");
          }
          setQuery(event.target.value);
        }}
        placeholder="Search for an anime"
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-slate-500 focus:outline-none"
      />

      {selectedAnimeTitle ? (
        <div className="flex items-center justify-between rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2">
          <p className="text-sm text-emerald-100">Selected: {selectedAnimeTitle}</p>
          <button
            type="button"
            className="text-xs text-emerald-200 hover:text-white"
            onClick={() => {
              field.handleChange(0);
              setSelectedAnimeTitle("");
              setQuery("");
            }}
          >
            Clear
          </button>
        </div>
      ) : null}

      {isLoading ? <p className="text-xs text-slate-400">Searching...</p> : null}

      {error ? <p className="text-xs text-red-400">{error}</p> : null}

      {!isLoading && query.trim() && !error ? (
        <div className="max-h-64 space-y-2 overflow-y-auto rounded-lg border border-slate-800 bg-slate-900 p-2">
          {results.length ? (
            results.map((anime) => {
              const displayTitle = getDisplayTitle(anime.title) || `Anime #${anime.id}`;

              return (
                <button
                  key={anime.id}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-slate-800"
                  onClick={() => {
                    field.handleChange(anime.id);
                    setSelectedAnimeTitle(displayTitle);
                    setQuery(displayTitle);
                    setResults([]);
                  }}
                >
                  {anime.coverImage?.medium ? (
                    <img
                      src={anime.coverImage.medium}
                      alt={displayTitle}
                      className="h-12 w-8 rounded object-cover"
                    />
                  ) : (
                    <div className="h-12 w-8 rounded bg-slate-700" />
                  )}
                  <span className="text-sm text-slate-100">{displayTitle}</span>
                </button>
              );
            })
          ) : (
            <p className="px-2 py-1 text-sm text-slate-400">No anime found.</p>
          )}
        </div>
      ) : null}

      {fieldError ? <p className="text-sm text-red-400">{fieldError}</p> : null}
    </div>
  );
}

export default function DiscussionAnimeSearchSection({
  form,
}: DiscussionAnimeSearchSectionProps) {
  return (
    <form.Field name="anime_id">
      {(field: AnimeFieldApi) => <AnimeField field={field} />}
    </form.Field>
  );
}

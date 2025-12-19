// interface
type CategoryFiltersProps = {
  genres: string[];
  seasons: string[];
  selectedGenre: string;
  selectedSeason: string;
  onSelectGenre: (value: string) => void;
  onSelectSeason: (value: string) => void;
};

export function CategoryFilters({
  genres,
  seasons,
  selectedGenre,
  selectedSeason,
  onSelectGenre,
  onSelectSeason,
}: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-20 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Genres
        </span>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => onSelectGenre(genre)}
              className={`rounded-full px-4 py-1 text-sm font-semibold ${
                selectedGenre === genre
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800/80 text-slate-300"
              }`}
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
            className={`rounded-full px-4 py-1 text-sm font-semibold ${
              selectedSeason
                ? "bg-slate-800/80 text-slate-300"
                : "bg-emerald-500 text-white"
            }`}
          >
            All
          </button>
          {seasons.map((season) => (
            <button
              key={season}
              onClick={() => onSelectSeason(season)}
              className={`rounded-full px-4 py-1 text-sm font-semibold ${
                selectedSeason === season
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800/80 text-slate-300"
              }`}
            >
              {season}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// helps with tracking the open and close states of the dropdown components
import { useState } from "react";

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
  // global filter open state for the button
  const [isOpen, setIsOpen] = useState(false);

  // controls the openstate of the sections listed below
  const [openSection, setOpenSection] = useState<"genres" | "seasons" | null>(
    // none of the sections should be open by default
    null,
  );

  // handles selecting the different genres
  const handleGenreSelect = (genre: string) => {
    // pass in the genre
    onSelectGenre(genre);
    setIsOpen(false);
    setOpenSection(null);
  };

  // handles selecting the different seasons and then reset the selections
  const handleSeasonSelect = (season: string) => {
    onSelectSeason(season);
    setIsOpen(false);
    setOpenSection(null);
  };

  // toggles the genre or seasons and then makes that section open up
  const toggleSection = (section: "genres" | "seasons") => {
    // set the openSection to the section if there is either genres and seasons
    setOpenSection(openSection === section ? null : section); // return null if there are no sections open
  };

  return (
    // WARNING: MIGHT WORK ON THE DESIGN OF THESE BUTTONS LATER ON TO MAKE SURE THAT THE UI LOOKS BETTER
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg px-4 py-2 text-md z-1 bg-black font-semibold focus-within:border-none transition-colors"
      >
        FILTER <span>▼</span>
      </button>
      {isOpen && (
        <div className="absolute top-full -mt-1.5 left-1/2 transform -translate-x-1/8 w-96 max-w-md rounded-lg bg-black p-4 shadow-lg z-50">
          <div className="space-y-4">
            {/* Genres Section */}
            <div>
              <button
                onClick={() => toggleSection("genres")}
                className="flex items-center justify-between w-full text-left text-sm font-semibold uppercase tracking-wide text-slate-400 hover:text-slate-300 transition-colors"
              >
                Genres
                <span
                  className={`transform transition-transform ${openSection === "genres" ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>
              {openSection === "genres" && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => handleGenreSelect(genre)}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        selectedGenre === genre
                          ? "bg-[#0066a5] text-white"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Seasons Section */}
            <div>
              <button
                onClick={() => toggleSection("seasons")}
                className="flex items-center justify-between w-full text-left text-sm font-semibold uppercase tracking-wide text-slate-400 hover:text-slate-300 transition-colors"
              >
                Seasons
                <span
                  className={`transform transition-transform ${openSection === "seasons" ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>
              {openSection === "seasons" && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSeasonSelect("")}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      selectedSeason === ""
                        ? "bg-[#0066a5] text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    All
                  </button>
                  {seasons.map((season) => (
                    <button
                      key={season}
                      onClick={() => handleSeasonSelect(season)}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        selectedSeason === season
                          ? "bg-[#0066a5] text-white"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

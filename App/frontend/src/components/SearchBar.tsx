import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { AnimePaginationResponse } from "../schemas/animeSchemas";
import { getAnimeByCategory } from "../services/api/animeCategoriesService";

// Constants to update the page and per page amounts
const PAGE: number = 1;
const PER_PAGE: number = 5; // for getting back the amount of suggestion for bellow the search bar

export const SearchBar = () => {
  // states to use for setting up the search functionality
  const [search, setSearch] = useState<string>(""); // get the name for the anime that is going to be searched
  const [value, setValue] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // useEffect to handle making a debounce to add delay when searching
  return (
    <div className=" ml-1.5 bg-[#1F1F1F] text-neutral-300 rounded-2xl h-[1.875rem] w-[16rem] flex items-center justify-between">
      <div className="pl-0.5">
        <Search />
      </div>
      <input
        className="outline-none"
        placeholder="search anime..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

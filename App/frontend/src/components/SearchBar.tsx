import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className=" ml-1.5 bg-[#1F1F1F] text-neutral-300 rounded-2xl h-[1.875rem] w-[16rem] flex items-center justify-between">
      <div className="pl-0.5">
        <Search />
      </div>
      <input className="outline-none" placeholder="search anime..." />
    </div>
  );
};

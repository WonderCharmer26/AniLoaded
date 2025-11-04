// This file has the loader for the featured anime to place on the bottom of pages

import { QueryClient } from "@tanstack/react-query";
import { getTrending } from "./fetchAnimes";

// imports

// featured anime loader function
export const featuredAnimeLoader = async (queryClient: QueryClient) => {
  // make sure the anime info is prefetched and ready to show
  await queryClient.prefetchQuery({
    queryKey: ["trendingAnime"],
    queryFn: () => getTrending,
  });
};

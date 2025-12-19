import type { QueryClient } from "@tanstack/react-query";
import {
  getAvailableGenres,
  getAnimeByCategory,
} from "../api/animeCategoriesService";

export function animeCategoriesLoader(queryClient: QueryClient) {
  return async () => {
    await Promise.all([
      queryClient.ensureQueryData({
        queryKey: ["animeCategory", "Action"],
        queryFn: () => getAnimeByCategory({ genre: "Action" }),
      }),
      queryClient.ensureQueryData({
        queryKey: ["availableGenres"],
        queryFn: getAvailableGenres,
      }),
    ]);
    return null;
  };
}

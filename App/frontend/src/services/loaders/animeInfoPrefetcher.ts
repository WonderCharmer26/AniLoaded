import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { getAnimeInfo, getTrending } from "../api/fetchAnimes";

export const animeInfoPrefetcher =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    // get the animeId from the params passed in
    const animeId = Number(params?.id);

    if (!Number.isInteger(animeId) || animeId <= 0) {
      throw new Response("Invalid anime id", { status: 400 });
    }

    // make a promise to get an array of data from the backend
    await Promise.all([
      // check to see if there data for the animeInfo page that is needed
      queryClient.ensureQueryData({
        queryKey: ["animeInfo", animeId],
        queryFn: () => getAnimeInfo(animeId),
      }),

      // prefetch the trending data for the animeInfo page if needed
      queryClient.prefetchQuery({
        queryKey: ["trendingAnime"],
        queryFn: getTrending,
      }),
    ]);

    // return null since i'm not using the useLoaderData() function in the animeInfo page
    return null;
  };

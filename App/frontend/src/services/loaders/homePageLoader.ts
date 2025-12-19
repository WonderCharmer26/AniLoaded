// this file contains the function to pass into the react router loader

import { QueryClient } from "@tanstack/react-query";
import { getPopular, getTopAnime, getTrending } from "../api/fetchAnimes";
import { getCarouselPhotos, getPosterAd } from "../supabase/getMainPagePhotos";

// WARNING: LOOK INTO WHY THE TRENDING ANIME SECTION SOMETIMES DOESN'T LOAD

// async function to fetch all the query's from the ani-list
export const homePageFetcher = (queryClient: QueryClient) => async () => {
  // create a variable to house all the query keys and query functions
  // NOTE: all the items in the obj need to be in the same order
  const queries = [
    { queryKey: ["trendingAnime"], queryFN: getTrending },
    { queryKey: ["popularAnime"], queryFN: getPopular },
    { queryKey: ["topAnime"], queryFN: getTopAnime },
  ];

  // NOTE: might need to tweak the function to get all the anime in the carousel
  // prefetch the data to make sure the carousel component is ready with the images when the page loads (doesn't return any data)
  await queryClient.prefetchQuery({
    queryKey: ["slider"],
    queryFn: getCarouselPhotos,
  });

  // prefetch the data for the ads for the home page
  await queryClient.prefetchQuery({ queryKey: ["ads"], queryFn: getPosterAd });

  // get all the data in the arr of obj and fetch the data one by one
  const data = await Promise.all(
    queries.map(({ queryKey, queryFN }) =>
      queryClient.ensureQueryData({
        queryKey,
        queryFn: queryFN,
      }),
    ),
  );

  // NOTE: data needs to be returned in the same order to the loader function in react router
  return {
    trendingAnime: data[0],
    popularAnime: data[1],
    topAnime: data[2],
    // NOTE: no data is needed to return for the prefetch data for the carousel
    // carouselData, // return the raw carousel data to be used on the home page
  };
};

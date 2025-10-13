// this file contains the function to pass into the react router loader

import { QueryClient } from "@tanstack/react-query";
import { getPopular, getTopAnime, getTrending } from "./fetchAnimes";
import { getCarouselPhotos } from "./getMainPagePhotos";

// TODO: make sure that this function is type safe to make use of it easier

// async function to fetch all the query's from the ani-list
export const homePageFetcher = (queryClient: QueryClient) => async () => {
  // create a variable to house all the query keys and query functions
  // NOTE: all the items in the obj need to be in the same order
  const queries = [
    { queryKey: ["trendingAnime"], queryFN: getTrending },
    { queryKey: ["popularAnime"], queryFN: getPopular },
    { queryKey: ["topAnime"], queryFN: getTopAnime },
  ];

  // prefetch the data to make sure the carousel component is ready with the images when the page loads (doesn't return any data)
  await queryClient.prefetchQuery({
    queryKey: ["slider"],
    queryFn: getCarouselPhotos,
  });

  // get all the data in the arr of obj and fetch the data one by one
  const data = await Promise.all(
    // returns an array of the Promises from the fetching
    queries.map((query) => {
      queryClient.ensureQueryData({
        queryKey: query.queryKey,
        queryFn: query.queryFN,
      });
    }),
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

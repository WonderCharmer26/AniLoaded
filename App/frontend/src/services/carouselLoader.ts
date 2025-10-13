// function to pre load the carousel images onto the carousel component

import { dehydrate } from "@tanstack/react-query";
import { getCarouselPhotos } from "./getMainPagePhotos";
import { queryClient } from "./queryClient";

// make the function exportable if needed
export const carouselLoader = async () => {
  // prefetch the data
  await queryClient.prefetchQuery({
    queryKey: ["slider"],
    queryFn: getCarouselPhotos,
  });

  // return an obj to the component
  return {
    dehydratedState: dehydrate(queryClient), // pass in the cache from the queryClient to send off
  };
};

// Slider Card for the Hompage Component
// TODO: add in sync loader to show as the images load

// import { Link } from "react-router-dom"; // used for the routing links to the different anime popular anime pages
import { useQuery } from "@tanstack/react-query";
import { getCarouselPhotos } from "../services/getMainPagePhotos";
import { ClockLoader } from "react-spinners";
import { CarouselI } from "../services/getMainPagePhotos"; // interface for the carousel data gotten from supabase

export const CarouselComponent = () => {
  // TODO: add in a picker at the bottom of the image to move through the images

  // image for slider retrived as mounting
  const { data, isLoading, error } = useQuery<CarouselI[]>({
    queryKey: ["slider"],
    queryFn: getCarouselPhotos, // function to get handle getting the data from supabase to load into the slider
  });

  return (
    <div className="flex items-center justify-center relative p-2 w-full rounded-2xl bg-[#0C0C0C] h-[38.875rem]">
      <div className="flex flex-row items-center justify-center overflow-x-scroll gap-1 w-full rounded-2xl bg-blue-950 h-full">
        {/* error handling */}
        {error && <div>There was an error loading the image</div>}
        {/* no image found */}
        {!isLoading && (!data || data.length === 0) && (
          <p className="text-white">No images found</p>
        )}
        {/* main part that should load */}
        {isLoading ? (
          <ClockLoader color="white" />
        ) : (
          <>
            {data?.map((photo) => {
              console.log("Image URL:", photo.url);
              return (
                // add in titles and genres for each of the images
                <img
                  key={photo.name}
                  src={photo.url}
                  alt={photo.name}
                  className="h-full w-full object-cover"
                />
              );
            })}
          </>
        )}
      </div>
      {/* TODO: add in selectors to shuffle through the images */}
      <div className="flex flex-row items-center absolute -bottom-2.5 justify-center gap-2">
        {/* TODO: edit the styles of the selectors to make them closer to the design */}
        {/* might make it a button instead */}
        <div className="w-2 h-2 rounded-full bg-white"></div>
        <div className="w-2 h-2 rounded-full bg-white"></div>
        <div className="w-2 h-2 rounded-full bg-white"></div>
        <div className="w-2 h-2 rounded-full bg-white"></div>
        <div className="w-2 h-2 rounded-full bg-white"></div>
      </div>
    </div>
  );
};

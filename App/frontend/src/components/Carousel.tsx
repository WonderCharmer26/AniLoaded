// Slider Card for the Hompage Component
// TODO: add in sync loader to show as the images load

// import { Link } from "react-router-dom"; // used for the routing links to the different anime popular anime pages
import { useQuery } from "@tanstack/react-query";
import { getCarouselPhotos } from "../services/getMainPagePhotos";
import { ClockLoader } from "react-spinners";
import { CarouselI } from "../services/getMainPagePhotos"; // interface for the carousel data gotten from supabase
import { useState } from "react";

export const CarouselComponent = () => {
  // variables for to help handle the state in this carousel

  // activeIndex is passed in to fetch specific images from the database
  const [activeIndex, setActiveIndex] = useState(0); // index to track the cycling of the images in the carousel

  // make an array of objects for the names of the shows, might make a table in the database to fetch the names to display on the frontend

  // image for slider retrived as mounting
  const { data, isLoading, error } = useQuery<CarouselI[]>({
    queryKey: ["slider"],
    queryFn: getCarouselPhotos, // function to get handle getting the data from supabase to load into the slider
  });

  return (
    <div className="flex items-center justify-center relative p-2 w-full rounded-2xl bg-[#0C0C0C] h-[38.875rem]">
      <div className="flex flex-row items-center justify-center overflow-hidden gap-1 w-full rounded-2xl bg-blue-950 h-full">
        {/* error handling */}
        {error && <div>There was an error loading the image</div>}
        {/* no image found */}
        {!isLoading && (!data || data.length === 0) && (
          <p className="text-white">No images found</p>
        )}
        {/* main part that should load */}
        {isLoading && (
          <>
            <ClockLoader color="white" />
          </>
        )}
        {/* Show the images here */}
        {data && data.length > 0 && (
          // add in the names for each of the anime and genres
          <img
            key={data[activeIndex].name}
            src={data[activeIndex].url}
            alt={data[activeIndex].name}
            className="w-full h-full object-cover rounded-2xl bg-black transition-opacity duration-500"
          />
        )}
      </div>
      {/* TODO: add in selectors to shuffle through the images */}
      <div className="flex flex-row items-center absolute -bottom-3.5 justify-center gap-2">
        {/* TODO: edit the styles of the selectors to make them closer to the design */}
        {/* might make it a button instead */}
        {data?.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-9 h-1 rounded-full bg-[#333333] cursor-pointer transition-colors duration-300 ${
              index === activeIndex ? "bg-white" : "bg-[#333333]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

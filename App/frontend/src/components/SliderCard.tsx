// Slider Card for the Hompage Component
// TODO: add in sync loader to show as the images load

// import { Link } from "react-router-dom"; // used for the routing links to the different anime popular anime pages
import { useQuery } from "@tanstack/react-query";
import { getSliderPhotos } from "../services/getMainPagePhotos";

// TODO: make a interface for the slider card component, the slider will have the data from supabase to be displayed
interface SliderCardI {
  // all the data will be fetched from supabase
  title: string;
  image: string;
  link: string;
  description?: string; // optional: might make a description to be displayed on hover
}

// image for slider retrived as mounting
const { data, isLoading, error } = useQuery({
  queryKey: ["slider"],
  queryFn: () => {
    getSliderPhotos();
  },
});

export const SliderCard = () => {
  // TODO: add in a picker at the bottom of the image to move through the images
  return (
    <div className="flex items-center justify-center p-2 w-full rounded-2xl bg-[#0C0C0C] h-[38.875rem]">
      <div className="flex items-center justify-center w-full rounded-2xl bg-blue-950 h-full">
        {isLoading ? <>Image Loading...</> : <>Actual Image</>}
      </div>
    </div>
  );
};

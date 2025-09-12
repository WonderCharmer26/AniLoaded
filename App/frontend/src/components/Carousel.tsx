// Slider Card for the Hompage Component
// TODO: add in sync loader to show as the images load

// import { Link } from "react-router-dom"; // used for the routing links to the different anime popular anime pages
import { useQuery } from "@tanstack/react-query";
import { getSliderPhotos } from "../services/getMainPagePhotos";
import { toast } from "sonner";
import { ClockLoader } from "react-spinners";

// TODO: make a interface for the slider card component, the slider will have the data from supabase to be displayed
interface CarouselI {
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

export const CarouselComponent = () => {
  // TODO: add in a picker at the bottom of the image to move through the images

  // toast error if error loading images
  if (error) {
    toast.error("There was an error loading the image");
  }

  return (
    <div className="flex items-center justify-center p-2 w-full rounded-2xl bg-[#0C0C0C] h-[38.875rem]">
      <div className="flex items-center justify-center w-full rounded-2xl bg-blue-950 h-full">
        {/* TODO: add sync loader component */}
        {isLoading ? <ClockLoader /> : <>{data}</>}
      </div>
      {/* TODO: add in selectors to shuffle through the images */}
    </div>
  );
};

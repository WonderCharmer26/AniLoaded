// Slider Card for the Hompage Component
// TODO: add in sync loader to show as the images load

// import { Link } from "react-router-dom"; // used for the routing links to the different anime popular anime pages
import { useQuery } from "@tanstack/react-query";
import { getCarouselPhotos } from "../services/getMainPagePhotos";
import { toast } from "sonner";
import { ClockLoader } from "react-spinners";
import { CarouselI } from "../services/getMainPagePhotos";

// TODO: make a interface for the slider card component, the slider will have the data from supabase to be displayed

export const CarouselComponent = () => {
  // TODO: add in a picker at the bottom of the image to move through the images

  // image for slider retrived as mounting
  const { data, isLoading, error } = useQuery<CarouselI[]>({
    queryKey: ["slider"],
    queryFn: getCarouselPhotos,
  });

  // toast error if error loading images
  if (error) {
    toast.error("There was an error loading the image");
    return <div>There was an error loading the image</div>;
  }

  return (
    <div className="flex items-center justify-center p-2 w-full rounded-2xl bg-[#0C0C0C] h-[38.875rem]">
      <div className="flex flex-row items-center justify-center overflow-x-scroll gap-1 w-full rounded-2xl bg-blue-950 h-full">
        {/* TODO: add sync loader component */}
        {!isLoading && (!data || data.length === 0) && (
          <p className="text-white">No images found</p>
        )}
        {isLoading ? (
          <ClockLoader color="white" />
        ) : (
          <>
            {data?.map((photo) => {
              console.log("Image URL:", photo.url);
              return (
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
    </div>
  );
};

// Slider Card for the Hompage Component

// import { Link } from "react-router-dom"; // used for the routing links to the different anime popular anime pages
import { useQuery } from "@tanstack/react-query";

// TODO: make a interface for the slider card component, the slider will have the data from supabase to be displayed
interface SliderCardI {
  // all the data will be fetched from supabase
  title: string;
  image: string;
  link: string;
  description?: string; // optional: might make a description to be displayed on hover
}

// TODO: connect to the backend,make function with axios to get the anime picks from the storage in the db
const { data, isLoading, error } = useQuery({
  queryKey: ["slider"],
});

export const SliderCard = () => {
  // TODO: connect to the backend, set up a query to get the top anime pictures for the slider (no use mutate needed to refetch)
  return (
    <div className="flex items-center justify-center p-2 w-full rounded-2xl bg-[#0C0C0C] h-[38.875rem]">
      <div className="flex items-center justify-center w-full rounded-2xl bg-blue-950 h-full">
        Slider Card
      </div>
    </div>
  );
};

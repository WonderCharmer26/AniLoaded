// Slider Card for the Hompage Component

import { Link } from "react-router-dom"; // used for the routing links to the different anime popular anime pages

// TODO: make a interface for the slider card component, the slider will have the data from supabase to be displayed
interface SliderCardI {
  // all the data will be fetched from supabase
  title: string;
  image: string;
  link: string;
  description?: string; // optional: might make a description to be displayed on hover
}

export const SliderCard = () => {
  // TODO: connect to the backend, set up a query to get the top anime pictures for the slider (no use mutate needed to refetch)
  return (
    <div className="flex items-center justify-center w-full bg-[#0C0C0C] h-[38.875rem]">
      Slider
    </div>
  );
};

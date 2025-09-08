// functions to get the data from supabase for the main page
// TODO: add in toast notifications, download the library

// imports
import { supabase } from "./supabaseConnection";

// slider data fetching function
export const getSliderPhotos = async () => {
  const { data, error } = await supabase.storage
    .from("Main Page")
    .list("Carousel");

  if (error) {
    console.log(error);
  }

  // otherwise return the data
  // map through the data of the path names to get use the url to display the images
  return data; // map data on the in the slider component
};

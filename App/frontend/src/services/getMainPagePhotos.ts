// functions to get the data from supabase for the main page

// imports
import { supabase } from "./supabaseConnection";
import { CarouselI } from "../schemas/CarouselSchema";
// import { CarouselTitlesI } from "../schemas/CarouselSchema";

// slider data fetching function
export const getCarouselPhotos = async (): Promise<CarouselI[]> => {
  // env variables to get the data from supabase
  const bucket = import.meta.env.VITE_SUPABASE_BUCKET!;
  const folder = import.meta.env.VITE_SUPABASE_FOLDER!;

  // fetch the title, genre, and storage_path from the database
  const { data: carouselImgInfo, error: carouselImgInfoError } = await supabase
    .from("carousel_images")
    .select("id, storage_path, title, genre")
    .order("id", { ascending: true });

  // NOTE: if there is an error, return the results (remove this later)
  if (carouselImgInfoError) {
    console.log("error getting carousel image info:", carouselImgInfoError);
    return [];
  }

  // log to see if the url is correct
  console.log(carouselImgInfo.map((row) => row.storage_path));

  // generate urls with the full folder path
  return carouselImgInfo.map((row) => {
    // gets the public url for each image in the bucket
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(`${folder}/${row.storage_path}`);

    // returns an object with the name and the url
    return {
      id: row.id,
      title: row.title,
      url: urlData.publicUrl,
      genre: row.genre,
    };
  });
};

// function to get the anime images from api

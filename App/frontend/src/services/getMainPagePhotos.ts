// functions to get the data from supabase for the main page

// imports
import { supabase } from "./supabaseConnection";
import { CarouselI } from "../schemas/CarouselSchema";
import { adSchemaI } from "../schemas/adSchema";
// import { CarouselTitlesI } from "../schemas/CarouselSchema";

// get the .env variables to use in the functions
const bucket = import.meta.env.VITE_SUPABASE_BUCKET!;
const folder = import.meta.env.VITE_SUPABASE_FOLDER!;

// slider data fetching function
export const getCarouselPhotos = async (): Promise<CarouselI[]> => {
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

// function to get the data for the ad for non members
// NOTE: make sure that the image name for the poster add is one word if the image isn't loading
export const getPosterAd = async (): Promise<adSchemaI[]> => {
  // get the data from supabase to get the path
  const { data: posterAdData, error: posterAdError } = await supabase
    // get from the ad folder
    .from("ad_images")
    // collumns to select
    .select("id, storage_path, title")
    // order the images that are gotten back
    .order("id", { ascending: true });

  // check if there is an error on the fetching to account for null cases
  if (posterAdError) {
    console.log(posterAdError);
    console.log("there was an error getting the data for the posterAdData");
    return [];
  }

  // check to see if the data gotten back is null to account for null cases
  if (!posterAdData) {
    console.log(posterAdData + []);
    console.log("there was no posterAdData to find when searching supabase");
    return [];
  }

  // log to see if the url is correct
  console.log(posterAdData.map((row) => row.storage_path));

  return posterAdData.map((row) => {
    // get the data using the path from the database to get the data from the folder
    const { data: adData } = supabase.storage
      .from(bucket)
      .getPublicUrl(`${folder}/${row.storage_path}`);

    // return an object with the data to use in the image element
    return {
      id: row.id,
      title: row.title,
      url: adData.publicUrl,
    };
  });
};

// function to get the anime images from api

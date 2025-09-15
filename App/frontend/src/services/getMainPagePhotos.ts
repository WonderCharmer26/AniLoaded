// functions to get the data from supabase for the main page
// TODO: add in toast notifications, download the library

// imports
import { supabase } from "./supabaseConnection";

// interface for carousel data
export interface CarouselI {
  // all the data will be fetched from supabase
  name: string;
  url: string;
}

// slider data fetching function
export const getCarouselPhotos = async (): Promise<CarouselI[]> => {
  // env variables to get the data from supabase
  const bucket = import.meta.env.VITE_SUPABASE_BUCKET!;
  const folder = import.meta.env.VITE_SUPABASE_FOLDER!;

  //NOTE: check the buckets (remove this later)
  const { data: test, error: testError } = await supabase.storage.listBuckets();
  console.log("test bucket data:", test);
  console.log("test bucket error:", testError);

  // NOTE: Testing to see if the env variables are working (remove this later)

  console.log("bucket", bucket);
  console.log("folder", folder);
  console.log("full path:", `${bucket}/${folder}`);

  // get the data from supabase
  const { data: files, error } = await supabase.storage
    .from(bucket)
    .list(`${folder}`);

  // NOTE: testing the response from supabase (remove this later)
  console.log("files data:", files);
  console.log("error data:", error);

  // NOTE: if there is an error, return the results (remove this later)
  if (error) {
    console.log("error listing files:", error);
    return [];
  }

  // if the files are empty, return an empty array
  if (!files || files.length === 0) {
    console.log("no files found in folder", folder);
    return [];
  }

  // NOTE: otherwise the files are found and log the information for proof of concept (remove this later)

  console.log("files were found:", files.length);
  console.log(
    "File names:",
    files.map((file) => file.name),
  );

  // generate urls with the full folder path
  return files.map((file) => {
    // gets the public url for each image in the bucket
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(`${folder}/${file.name}`);

    // returns an object with the name and the url
    return {
      name: file.name,
      url: data.publicUrl,
    };
  });
};

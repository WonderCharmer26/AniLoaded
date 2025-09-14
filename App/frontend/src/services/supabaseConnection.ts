// connection to the supabase data base is handled in here

/// <reference types="vite/client" />

// imports
import { createClient } from "@supabase/supabase-js";

// use meta import to get the environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY!;

// check if the variables are brought in properly
if (!supabaseUrl) {
  throw new Error("Missing supabaseUrl variable");
}

// check if the variables are brought in properly
if (!supabaseKey) {
  throw new Error("Missing supabaseKey variable");
}

// see env variables
console.log("supabaseUrl", supabaseUrl);
console.log("supabaseKey", supabaseKey);

// export the supabase client to be used in other files if needed
export const supabase = createClient(supabaseUrl, supabaseKey);

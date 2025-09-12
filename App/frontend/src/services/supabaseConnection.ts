// connection to the supabase data base is handled in here

// imports
import { createClient } from "@supabase/supabase-js";

// use meta import to get the environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// check if the variables are brought in properly
if (!supabaseUrl) {
  throw new Error("Missing supabaseUrl variable");
}

// check if the variables are brought in properly
if (!supabaseKey) {
  throw new Error("Missing supabaseKey variable");
}

// export the supabase client to be used in other files if needed
export const supabase = createClient(supabaseUrl, supabaseKey);

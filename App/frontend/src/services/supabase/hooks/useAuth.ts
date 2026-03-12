// this file handles listening for the user's current state

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../supabaseConnection";

export function useAuth() {
  /*This funciton helps us with handling the users login state in components if needed
   and use the user data if needed to in different parts of our app*/
  // handle the user state
  const [user, setUser] = useState<User | null>(null);

  // handle the loading state
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // get the user data
        setUser(session?.user ?? null);
        // stop loading if found or not found
        setLoading(false);
      },
    );

    // unsubscribe from the listener for clean up
    return () => listener.subscription.unsubscribe();
  }, []);

  // return the states into the other parts of the app that need them
  return { user, loading };
}

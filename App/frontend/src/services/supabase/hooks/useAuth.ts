// this file handles listening for the user's current state

import { useCallback, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../supabaseConnection";
import { getCurrentUser } from "../supabaseAuth";

export function useAuth() {
  /*This funciton helps us with handling the users login state in components if needed
   and use the user data if needed to in different parts of our app*/

  // handle the user state
  const [user, setUser] = useState<User | null>(null);

  // handle the loading state
  const [loading, setLoading] = useState<boolean>(true);

  // helps us to stop unneccesary runs of the function on unmounts and we can call this manually
  const refreshUser = useCallback(async () => {
    // variable to store user data
    const {
      data: { user },
      error,
    } = await getCurrentUser();

    // if there is no error
    if (!error) {
      setUser(user);
    }
    // depedency not needed
  }, []);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      // get the user state depending on what users current state
      (_event, session) => {
        // get the user data
        setUser(session?.user ?? null);
        // stop loading if found or not found
        setLoading(false);
      },
    );

    // sets most up to date data for the user
    refreshUser().finally(() => setLoading(false));

    // unsubscribe from the listener for clean up
    return () => listener.subscription.unsubscribe();
    //
  }, [refreshUser]);

  // returns user data, loading and function we can call for manual refresh if needed
  return { user, loading, refreshUser };
}

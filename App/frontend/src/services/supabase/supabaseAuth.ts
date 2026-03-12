import type { UserAttributes } from "@supabase/supabase-js";

import { supabase } from "./supabaseConnection";

export const signUpWithEmail = async (email: string, password: string) => {
  return supabase.auth.signUp({
    email,
    password,
  });
};

export const signOutUser = async () => {
  return supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  // NOTE: has jwt param that we can pass in
  return supabase.auth.getUser();
};

export const updateUserPassword = async (password: string) => {
  return supabase.auth.updateUser({ password });
};

export const updateUserMetadata = async (data: UserAttributes["data"]) => {
  return supabase.auth.updateUser({ data });
};

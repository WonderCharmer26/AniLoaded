// this file sets up the query client that will be used throughout the app
import { QueryClient } from "@tanstack/react-query";

// Create a client for React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      // might add some more opts
    },
  },
});

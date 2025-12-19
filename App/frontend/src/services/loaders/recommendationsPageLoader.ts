import type { QueryClient } from "@tanstack/react-query";
import {
  getFallbackRecommendations,
  getPersonalizedRecommendations,
} from "../api/recommendationService";

export function recommendationsPageLoader(
  queryClient: QueryClient,
  userId: string,
) {
  return async () => {
    await Promise.all([
      queryClient.ensureQueryData({
        queryKey: ["personalizedRecommendations", userId],
        queryFn: () => getPersonalizedRecommendations(userId),
      }),
      queryClient.ensureQueryData({
        queryKey: ["globalRecommendations"],
        queryFn: getFallbackRecommendations,
      }),
    ]);
    return null;
  };
}

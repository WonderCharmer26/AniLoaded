import type { QueryClient } from "@tanstack/react-query";
import {
  getDiscussionThreads,
  getTrendingTopics,
} from "../api/discussionService";

export function discussionPageLoader(queryClient: QueryClient) {
  return async () => {
    await Promise.all([
      queryClient.ensureQueryData({
        queryKey: ["discussionThreads"],
        queryFn: getDiscussionThreads,
      }),
      queryClient.ensureQueryData({
        queryKey: ["discussionTopics"],
        queryFn: getTrendingTopics,
      }),
    ]);
    return null;
  };
}

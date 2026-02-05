import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import {
  getDiscussionById,
  getDiscussionComments,
  getAllDiscussions,
} from "../api/discussionService";

export const discussionInfoPrefetcher =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    // Get the discussion ID from the URL params
    const discussionId = params?.id;

    // Validate the ID exists
    if (!discussionId || typeof discussionId !== "string") {
      throw new Response("Invalid discussion id", { status: 400 });
    }

    // Prefetch the data in parallel
    await Promise.all([
      // Ensure the specific discussion data is loaded
      queryClient.ensureQueryData({
        queryKey: ["discussion", discussionId],
        queryFn: () => getDiscussionById(discussionId),
      }),

      // Prefetch discussion comments
      queryClient.prefetchQuery({
        queryKey: ["discussionComments", discussionId],
        queryFn: () => getDiscussionComments(discussionId),
      }),

      // Optionally prefetch all discussions for quick navigation
      queryClient.prefetchQuery({
        queryKey: ["discussions"],
        queryFn: getAllDiscussions,
      }),
    ]);

    // Return null since we're using useQuery in the component
    return null;
  };

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import type { Discussions } from "../schemas/discussion";
import {
  getAllDiscussions,
  getDiscussionThreads,
} from "../services/api/discussionService";
import DiscussionCard from "../components/DiscussionCard";

// TODO: CONNECT THE TABLE, MAKE FUNCTIONS FOR FETCHING THE TABLES
// TODO: MAKE FORM COMPONENT TO TAKE IN NEW DISCUSSION POSTS (MAKE MODAL)
// TODO: MAKE DISCUSSION CARD THAT THE USER CAN CLICK TO TAKE THEM TO THE POST
// WARNING: MIGHT MAKE THE USER ABLE TO UPLOAD THEIR OWN THUMBNAIL FOR THE DISCUSSIONS
// WARNING: USE DUMMY DATA TO HELP WITH GIVING THE DISCUSSIONS PAGE A FILLER THUMBNAIL, WILL ADD STORAGE BUCKETS TO HANDLE USER UPLOADS FOR IMAGES

// get the discussions data
export default function DiscussionPage() {
  // function to get all the discussions
  const { data: threads = [], isLoading: threadsLoading } = useQuery<
    Discussions[]
  >({
    queryKey: ["discussions"],
    queryFn: () => getAllDiscussions(),
  });

  // make sure that there are no dupes or null animeIDs
  const animeIDs = Array.from(new Set(threads.map((d) => d.anime_id))).filter(
    // remove cases where the ids are null or undefined
    Boolean,
  );

  // function to get all the anime_id

  // gets the trending discussions
  // const { data: trendingTopics = [], isLoading: topicsLoading } = useQuery<
  //   DiscussionTopic[]
  // >({
  //   queryKey: ["discussionTopics"],
  // });

  return (
    <div className="px-6 py-10 space-y-10">
      <section className="space-y-3 flex flex-col items-center">
        <h1 className="text-4xl font-bold uppercase text-white">Discussions</h1>
        <p className="max-w-3xl text-slate-300">
          Share hot takes, react to seasonal news, or ask the community for
          recommendations.
        </p>
        <div className="flex gap-4"></div>
      </section>

      <section className="flex justify-center items-center">
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {threadsLoading ? (
            // This is for the loading state component, will change to other component UI later
            <div className="text-sm text-slate-400">Loading threads…</div>
          ) : (
            threads.map((thread) => (
              <DiscussionCard key={thread.id} thread={thread} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

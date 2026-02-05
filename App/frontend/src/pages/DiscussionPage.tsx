import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import type { Discussions } from "../schemas/discussion";
import {
  getAllDiscussions,
  getDiscussionThreads,
} from "../services/api/discussionService";

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
        <p className="text-sm tracking-[0.3em] text-sky-400">COMMUNITY HUB</p>
        <h1 className="text-4xl font-bold text-white">Start a conversation</h1>
        <p className="max-w-3xl text-slate-300">
          Share hot takes, react to seasonal news, or ask the community for
          recommendations. Threads stay lightweight so you can iterate quickly
          once the real-time backend is wired up.
        </p>
        <div className="flex gap-4">
          <button className="rounded-full bg-sky-500 px-6 py-2 text-sm font-semibold text-white">
            New thread
          </button>
          <Link
            to="/recommendations"
            className="text-sm font-semibold text-sky-300"
          >
            Need inspo? Try recommendations →
          </Link>
        </div>
      </section>

      {/*TODO: Turn into card component*/}
      <section className="flex justify-center">
        <div className="w-full max-w-4xl space-y-4">
          {threadsLoading ? (
            // This is for the loading state component, will change to other component UI later
            <div className="text-sm text-slate-400">Loading threads…</div>
          ) : (
            threads.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export function ThreadCard({ thread }: { thread: Discussions }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-md shadow-black/30 transition hover:-translate-y-0.5">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        <span>{thread.title}</span>
        <span>
          {thread.comment_count} replies · {thread.season_number} likes
        </span>
      </div>
      <h3 className="mt-3 text-2xl font-semibold text-white">{thread.title}</h3>
      <p className="mt-2 text-slate-300">{thread.body}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-400"></div>
      <button className="mt-5 text-sm font-semibold text-sky-300">
        Jump in →
      </button>
    </article>
  );
}

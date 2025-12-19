import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import type {
  DiscussionThread,
  DiscussionTopic,
} from "../schemas/discussion";
import {
  getDiscussionThreads,
  getTrendingTopics,
} from "../services/api/discussionService";

export default function DiscussionPage() {
  const {
    data: threads = [],
    isLoading: threadsLoading,
  } = useQuery<DiscussionThread[]>({
    queryKey: ["discussionThreads"],
    queryFn: getDiscussionThreads,
  });

  const {
    data: trendingTopics = [],
    isLoading: topicsLoading,
  } = useQuery<DiscussionTopic[]>({
    queryKey: ["discussionTopics"],
    queryFn: getTrendingTopics,
  });

  return (
    <div className="px-6 py-10 space-y-10">
      <section className="space-y-3">
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
          <Link to="/recommendations" className="text-sm font-semibold text-sky-300">
            Need inspo? Try recommendations →
          </Link>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {threadsLoading ? (
            <div className="text-sm text-slate-400">Loading threads…</div>
          ) : (
            threads.map((thread) => <ThreadCard key={thread.id} thread={thread} />)
          )}
        </div>

        <aside className="rounded-2xl border border-slate-700 bg-slate-900/40 p-6">
          <h2 className="text-lg font-semibold text-white">Trending topics</h2>
          <p className="text-sm text-slate-400">
            Pulls seasonal keywords once analytics hooks are added.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {topicsLoading ? (
              <span className="text-sm text-slate-500">Loading tags…</span>
            ) : (
              trendingTopics.map((topic) => (
                <span
                  key={topic.id}
                  className="rounded-full border border-slate-700 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200"
                >
                  {topic.label} · {topic.mentions}
                </span>
              ))
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}

function ThreadCard({ thread }: { thread: DiscussionThread }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-md shadow-black/30 transition hover:-translate-y-0.5">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        <span>{thread.author}</span>
        <span>{thread.replies} replies · {thread.likes} likes</span>
      </div>
      <h3 className="mt-3 text-2xl font-semibold text-white">{thread.title}</h3>
      <p className="mt-2 text-slate-300">{thread.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-400">
        {thread.tags.map((tag) => (
          <span
            key={`${thread.id}-${tag}`}
            className="rounded-full bg-slate-800/80 px-3 py-1 tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>
      <button className="mt-5 text-sm font-semibold text-sky-300">
        Jump in →
      </button>
    </article>
  );
}

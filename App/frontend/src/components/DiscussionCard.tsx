import { Link } from "react-router-dom";
import type { Discussions } from "../schemas/discussion";

export default function DiscussionCard({ thread }: { thread: Discussions }) {
  return (
    <Link to={`/discussion/${thread.id}`}>
      <article className="transition-transform hover:scale-105 cursor-pointer">
        <img
          className="w-full h-52 object-cover rounded-xl"
          src={thread.thumbnail_url ?? "/placeholder.webp"}
          alt={thread.title}
        />
        <div className="flex flex-col items-start gap-1">
          {/*Add in user logo*/}
          <h3 className="mt-3 text-md font-semibold text-white">
            {thread.title}
          </h3>

          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            <span>
              {thread.comment_count} replies · {thread.season_number} likes
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-400"></div>
      </article>
    </Link>
  );
}

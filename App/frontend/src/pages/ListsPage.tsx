import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getDisplayTitle } from "../schemas/animeSchemas";
import type { UserAnimeList } from "../schemas/userLists";
import { getUserTopLists } from "../services/api/userListsService";

const DEMO_USER_ID = "demo-user";

export default function ListsPage() {
  const { data: lists = [], isLoading } = useQuery<UserAnimeList[]>({
    queryKey: ["userTopLists", DEMO_USER_ID],
    queryFn: () => getUserTopLists(DEMO_USER_ID),
  });

  return (
    <div className="px-6 py-10 space-y-10">
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm tracking-[0.3em] text-amber-300">YOUR LISTS</p>
          <h1 className="text-4xl font-bold text-white">
            Showcase your top five picks
          </h1>
          <p className="max-w-2xl text-slate-300">
            Every list is capped at five entries to keep rankings decisive.
            Once user accounts are wired up we\'ll prefill this page with
            Supabase data and enable sharing controls.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full bg-amber-500 px-6 py-2 text-sm font-semibold text-white">
            Create new list
          </button>
          <Link to="/discussion" className="text-sm font-semibold text-amber-200">
            Ask the community for suggestions →
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {isLoading ? (
          <div className="text-slate-400">Loading your lists…</div>
        ) : (
          lists.map((list) => <ListCard key={list.id} list={list} />)
        )}
      </section>
    </div>
  );
}

function ListCard({ list }: { list: UserAnimeList }) {
  const paddedEntries = Array.from({ length: 5 }).map((_, index) => {
    return list.entries[index];
  });

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-lg shadow-black/30">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">{list.title}</h2>
          <p className="text-sm text-slate-400">
            Visible: {list.visibility === "public" ? "Public" : "Private"}
          </p>
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Updated {new Date(list.updatedAt).toLocaleDateString()}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {paddedEntries.map((entry, idx) => (
          <div
            key={`${list.id}-entry-${idx}`}
            className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/40 p-3"
          >
            <span className="text-xl font-bold text-slate-500">#{idx + 1}</span>
            {entry ? (
              <div className="flex flex-1 items-center gap-4">
                <img
                  src={entry.anime.coverImage.large}
                  alt={getDisplayTitle(entry.anime.title)}
                  className="h-16 w-12 rounded-lg object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-white">
                    {getDisplayTitle(entry.anime.title)}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {(entry.anime.genres ?? []).slice(0, 2).join(" • ")}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500">Open slot</p>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

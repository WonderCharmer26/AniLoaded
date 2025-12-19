import { useQuery } from "@tanstack/react-query";
import { getDisplayTitle } from "../schemas/animeSchemas";
import type { AniListMedia } from "../schemas/animeSchemas";
import type { RecommendationBucket } from "../schemas/recommendations";
import {
  getFallbackRecommendations,
  getPersonalizedRecommendations,
} from "../services/api/recommendationService";

const DEMO_USER_ID = "demo-user";

export default function RecommendationsPage() {
  const { data: personalizedBuckets = [], isLoading: personalizedLoading } =
    useQuery<RecommendationBucket[]>({
      queryKey: ["personalizedRecommendations", DEMO_USER_ID],
      queryFn: () => getPersonalizedRecommendations(DEMO_USER_ID),
    });

  const { data: globalRecommendations = [], isLoading: globalLoading } =
    useQuery<AniListMedia[]>({
      queryKey: ["globalRecommendations"],
      queryFn: getFallbackRecommendations,
    });

  return (
    <div className="px-6 py-10 space-y-10">
      <section className="space-y-3">
        <p className="text-sm tracking-[0.3em] text-purple-300">FOR YOU</p>
        <h1 className="text-4xl font-bold text-white">
          Curated recommendations, zero guesswork
        </h1>
        <p className="max-w-3xl text-slate-300">
          Once authentication is connected this page will tailor recs using your
          lists, favorites, and watch history. Until then, mock data keeps layout
          and interactions ready.
        </p>
      </section>

      <section className="space-y-6">
        {personalizedLoading ? (
          <p className="text-slate-400">Finding matches…</p>
        ) : personalizedBuckets.length ? (
          personalizedBuckets.map((bucket) => (
            <Bucket key={bucket.id} bucket={bucket} />
          ))
        ) : (
          <p className="text-slate-400">
            Sign in later to unlock personalized groupings.
          </p>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Trending picks</h2>
          <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Auto-filled placeholder data
          </span>
        </div>
        {globalLoading ? (
          <p className="text-slate-400">Loading crowd favorites…</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {globalRecommendations.map((anime) => (
              <AnimeTile key={anime.id} anime={anime} />)
            )}
          </div>
        )}
      </section>
    </div>
  );
}

function Bucket({ bucket }: { bucket: RecommendationBucket }) {
  return (
    <article className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-purple-200">
          {bucket.reason}
        </p>
        <h3 className="text-2xl font-semibold text-white">{bucket.label}</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {bucket.items.map((item) => (
          <AnimeTile key={`${bucket.id}-${item.id}`} anime={item} />
        ))}
      </div>
    </article>
  );
}

function AnimeTile({ anime }: { anime: AniListMedia }) {
  return (
    <article className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
      <img
        src={anime.coverImage.large}
        alt={getDisplayTitle(anime.title)}
        className="h-28 w-24 rounded-xl object-cover"
      />
      <div className="flex flex-1 flex-col">
        <h4 className="text-lg font-semibold text-white">
          {getDisplayTitle(anime.title)}
        </h4>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          {(anime.genres ?? []).slice(0, 3).join(" • ")}
        </p>
        <button className="mt-auto text-left text-sm font-semibold text-purple-300">
          Save to list →
        </button>
      </div>
    </article>
  );
}

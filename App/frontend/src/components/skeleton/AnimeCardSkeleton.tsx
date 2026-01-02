export const AnimeCardSkeleton = () => {
  return (
    <div className="w-60 flex-col relative rounded-2xl">
      <div className="w-full h-105 rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse" />
      <div className="mt-2 h-12 flex items-center justify-center">
        <div className="h-4 w-40 rounded bg-white/20 animate-pulse" />
      </div>
    </div>
  );
};

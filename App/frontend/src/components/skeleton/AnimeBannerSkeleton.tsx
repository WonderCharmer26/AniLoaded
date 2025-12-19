export const AnimeBannerSkeleton: React.FC = () => {
  // TODO: TWEAK THE COLORS FOR THIS SO THE SKELETON LOOKS BETTER
  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
      <div className="absolute z-[1] bottom-5 left-1/4 flex w-full max-w-5xl -translate-x-1/2 flex-row scale-80 px-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-4xl border-[6px] border-[#243746] bg-[#1F2A36] text-2xl font-bold mr-2 animate-pulse" />
        <div className="flex flex-col items-start gap-3 animate-pulse">
          <div className="h-6 w-72 rounded-md bg-white/30" />
          <div className="h-4 w-48 rounded bg-white/20" />
          <div className="h-4 w-56 rounded bg-white/20" />
          <div className="flex flex-row gap-2 mt-1 w-full">
            <div className="bg-[#26242A] h-9 w-28 rounded-lg" />
            <div className="bg-[#246C99] h-9 w-[140px] rounded-lg" />
          </div>
        </div>
      </div>
      <div className="brightness-50 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 h-[720px] w-full animate-pulse" />
    </div>
  );
};

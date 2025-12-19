import { AniListMedia } from "../schemas/animeSchemas";

interface AnimeBannerProps {
  anime: AniListMedia;
}

export const AnimeBanner: React.FC<AnimeBannerProps> = ({ anime }) => {
  if (!anime.bannerImage) {
    return null;
  }

  const studioName =
    anime.studios && anime.studios.nodes?.length > 0
      ? anime.studios.nodes[0].name
      : "unknown";
  const genreLabel = anime.genres?.join(", ") ?? "";

  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
      <div className="absolute z-[1] bottom-5 left-1/4 flex w-full max-w-5xl -translate-x-1/2 flex-row scale-80 px-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-4xl border-[6px] border-[#3CB4FF] text-2xl font-bold mr-2">
          {anime.averageScore}
        </div>
        <div className="flex flex-col items-start">
          <h1 className="text-left">{anime.title.english?.toUpperCase()}</h1>
          <h2>Genre: {genreLabel}</h2>
          <p>Studio: {studioName}</p>
          <div className="flex flex-row gap-2 mt-1">
            <button className="bg-[#26242A] text-[.85rem] h-9 w-28 rounded-lg">
              ADD TO LIST
            </button>
            <button className="bg-[#246C99] text-[.85rem] h-9 w-[140px] rounded-lg">
              ADD TO TIER LIST
            </button>
          </div>
        </div>
      </div>
      <div className="brightness-50 bg-blue-400 h-[720px] w-full">
        <img src={anime.bannerImage} className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

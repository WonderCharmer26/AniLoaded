// TODO: make sure that the banner from the backend is able to get close to the figma design
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"; // used to get the anime to make sure its routed to the right page
import { getAnimeInfo, getTrending } from "../services/fetchAnimes";
import { AniListMedia } from "../schemas/animeSchemas";
import { ShowcaseSection } from "../components/ShowcaseSection";

export default function AnimeInfoPage() {
  const { id } = useParams(); // id will be used to fetch the data from the backend api route
  const anime_id = Number(id);

  // TODO: create useQuery to handle queries for the anime data needed from the python backend
  const { data, isFetched, isLoading, isError } = useQuery<AniListMedia, Error>(
    {
      queryKey: ["animeInfo", anime_id],
      queryFn: () => getAnimeInfo(anime_id),
    },
  );

  // make a query to get the trending anime
  const {
    data: trendingAnime,
    isLoading: trendingLoading,
    isError: trendingError,
  } = useQuery<AniListMedia[], Error>({
    queryKey: ["trendingAnime"],
    queryFn: getTrending,
  });

  // console log to test the request
  console.log(data);

  if (isError) {
    return <p>there was an error</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // TODO: Figure out why the data. is giving errors
  return (
    <div>
      {/* if the data is fetched correctly display the information for the page */}
      {/* <p>Anime ID: {anime_id}</p> */}
      {/* NOTE: THIS IS THE BANNER SECTION */}
      {isFetched && data && data.bannerImage && (
        <div className="relative">
          <div className="absolute z-[1] bottom-5 -left-6 w-full flex flex-row scale-90 ">
            <div className=" flex justify-center items-center rounded-4xl border-[6px] border-[#3CB4FF] font-bold text-2xl h-14 w-14 mr-2">
              {data.averageScore}
            </div>
            <div className="flex flex-col items-start">
              <h1 className="">{data.title.english?.toUpperCase()}</h1>
              <h2>Genre: {data.genres?.join(", ")}</h2>
              <p>
                Studio:{" "}
                {data.studios && data?.studios?.nodes?.length > 0
                  ? data?.studios?.nodes[0].name
                  : "unknown"}
              </p>
              {/* buttons that need functionality */}
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
          <div className="brightness-50 bg-blue-400 flex justify-center h-[540px] w-full">
            <img
              src={data?.bannerImage}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
      {/* TODO: make a style for if there is no bannerImage */}
      {/* NOTE: THIS IS THE MIDDLE SECTION */}
      <div className="mt-10 flex flex-row gap-4">
        {/* NOTE: This is the plot section */}
        <div className="flex flex-col w-[600px]">
          <div className="w-full flex items-start">
            <h2 className="text-2xl font-bold text-[#246C99]">PLOT</h2>
          </div>
          <div className="h-[250px] w-[600px] mt-2 no-scrollbar overflow-scroll">
            {isFetched && data?.description && data.description?.length > 0 ? (
              <div className="flex text-start">{data.description}</div>
            ) : (
              "there is no description"
            )}
          </div>
        </div>
        {/* NOTE: This is the characters section */}
        <div className="flex flex-col w-full ">
          <div className="">
            <div>
              <h2 className="text-2xl font-bold text-[#246C99]">CHARACTERS</h2>
            </div>
            {/* NOTE: This is where the characters and voice actors will be displayed */}
            <div>
              {isFetched && data?.characters?.edges?.length ? (
                <ul className="mt-4 flex items-center max-h-[450px] max-w-full flex-col gap-3 overflow-y-auto no-scrollbar">
                  {data.characters.edges.map((edge) => {
                    // variable names to house incase the names of th characters don't render properly
                    const characterName =
                      edge.node.name?.full ??
                      edge.node.name?.romaji ??
                      edge.node.name?.native ??
                      "Unknown";
                    const imageSrc =
                      edge.node.image?.large ?? edge.node.image?.medium ?? "";
                    const primaryVoiceActor = edge.voiceActors?.[0];
                    const voiceActorName = primaryVoiceActor
                      ? (primaryVoiceActor.name?.full ??
                        primaryVoiceActor.name?.romaji ??
                        primaryVoiceActor.name?.native ??
                        "Unknown")
                      : "N/A";

                    return (
                      <li
                        key={edge.node.id}
                        className="flex items-center w-xl gap-4 rounded-xl bg-[#1A2227] p-3"
                      >
                        {imageSrc ? (
                          <img
                            src={imageSrc}
                            alt={characterName}
                            className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-[#26242A] text-lg font-semibold">
                            {characterName.charAt(0)}
                          </div>
                        )}
                        <div className="flex flex-1 flex-col items-center gap-1 text-center">
                          <span className="text-lg font-semibold">
                            {characterName}
                          </span>
                          <span className="text-sm uppercase tracking-wide text-[#246C99]">
                            {/* {edge.role ?? "—"} */}
                          </span>
                          <span className="text-sm text-gray-300">
                            {voiceActorName}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div>There are no characters</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* NOTE: This is where the review section will be */}
      <div className="mt-5">
        This is where the anime reviews for the anime will go
      </div>
      {/* NOTE: This section will show the featured anime */}
      <section>
        <div>
          {trendingAnime ? (
            <ShowcaseSection
              sectionName="Featured Anime"
              cards={trendingAnime}
            />
          ) : (
            "nothing to show"
          )}
        </div>
      </section>
    </div>
  );
}

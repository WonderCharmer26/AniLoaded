// TODO: make sure that the banner from the backend is able to get close to the figma design
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"; // used to get the anime to make sure its routed to the right page
import { getAnimeInfo } from "../services/fetchAnimes";
import { AniListMedia } from "../schemas/animeSchemas";

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
      <p>Anime ID: {anime_id}</p>
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
          <div className="brightness-50 bg-blue-400 flex justify-center h-[540px]">
            <img src={data?.bannerImage} className="object-cover" />
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
        <div className="flex flex-col w-full">
          <div className="">
            <div>
              <h2 className="text-2xl font-bold text-[#246C99]">CHARACTERS</h2>
            </div>
            {/* NOTE: This is where the characters and voice actors will be displayed */}
            <div className="flex justify-center items-center">
              {isFetched && data?.characters?.edges ? (
                <div className="flex flex-col items-center h-[300px] w-xl overflow-scroll no-scrollbar">
                  {data.characters.edges.map((edges) => (
                    <ul className="">
                      <li
                        className="flex flex-row object-cover bg-amber-300 mt-2 h-20 w-xl rounded-lg"
                        key={edges.node.id}
                      >
                        <div className="w-18">
                          <img
                            className="object-fill"
                            src={edges.node.image.large}
                          />
                        </div>
                        <div className="flex justify-center items-center flex-col">
                          {/* Name of the characters of the anime */}
                          {edges.node.name.full ?? edges.node.name.native}
                          {/* Role of the character */}
                          <span>{edges.role.toLocaleLowerCase()}</span>
                          {/* voiceActors name */}
                          {edges.voiceActors
                            .map((va) => va.name.full)
                            .join(" ,")}
                        </div>
                      </li>
                    </ul>
                  ))}
                </div>
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
    </div>
  );
}

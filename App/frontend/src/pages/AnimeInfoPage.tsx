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

  return (
    <div>
      {/* if the data is fetched correctly display the information for the page */}
      <p>Anime ID: {anime_id}</p>
      {isFetched && data && (
        <div className="">
          <div className="">
            <h1>{data.title.english}</h1>
            <h2>Genre: {data.genres?.join(", ")}</h2>
            <p>Studio: {data.studios?.edges}</p>
          </div>
          <img src={data?.bannerImage} className="" />
        </div>
      )}

      <p className="text-white">{}</p>
    </div>
  );
}

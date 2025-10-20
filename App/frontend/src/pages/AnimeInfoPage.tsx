import { useParams } from "react-router-dom"; // used to get the anime to make sure its routed to the right page

export default function AnimeInfoPage() {
  const { id } = useParams(); // id will be used to fetch the data from the backend api route

  // TODO: create useQuert to handle queries for the anime data needed from the python backend

  return (
    <div>
      <h1>Anime Details</h1>
      {/* NOTE: anime id will be taken out after page is complete */}
      <p>Anime ID: {id}</p>
      <p>Detailed information about this anime</p>
    </div>
  );
}

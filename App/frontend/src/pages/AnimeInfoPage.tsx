import React from "react";
import { useParams } from "react-router-dom";

export default function AnimeInfoPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Anime Details</h1>
      <p>Anime ID: {id}</p>
      <p>Detailed information about this anime</p>
    </div>
  );
}



// import React from "react";

import { SliderCard } from "../components/SliderCard";

export default function HomePage() {
  return (
    <div>
      <div className="">
        {/* TODO: have to connect to slidercard to the backend */}
        <SliderCard />
      </div>
      {/* TODO: make a carousel of cards to show the users top 5 animes */}
      {/* TODO: make a carousel of cards to show the users top trending anime from the backend (popular shows from the API) */}
      {/* TODO: place the banner of dandadan poster after that the user can click on */}
      {/* TODO: show the different categories of animes from the backend with same card component */}
    </div>
  );
}

// import { JSX } from "react";
import React from "react";
import { AnimeCard } from "./AnimeCard";
import { AniListMedia } from "../schemas/animeSchemas";

interface CardCarouselI {
  cards?: AniListMedia[];
}

// TODO: Add in a hover effect that displays the information like the show genre and episode count to user

// this component will be used to display cards for the different categories of anime cards
export const CardCarousel: React.FC<CardCarouselI> = ({
  cards,
}: CardCarouselI) => {
  // make a safe guard to make sure that the cards are arrays before rendering (extra saftey)
  const safeCards = Array.isArray(cards) ? cards : [];

  // if not an array log that the data wasn't rendered properly
  // NOTE: Remove later
  if (!Array.isArray(cards)) {
    console.warn("CardCarousel expected an array, received", cards);
  }

  return (
    <>
      <div className="flex h-fit flex-row items-center overflow-x-scroll no-scrollbar space-x-5 ">
        {safeCards.map((card) => (
          <div key={card.id} className="flex justify-center">
            <AnimeCard key={card.id} anime={card} />
          </div>
        ))}
      </div>
    </>
  );
};

// import { JSX } from "react";
import React from "react";
import { Card } from "./Card";
import { AniListMedia } from "../schemas/animeSchemas";

interface CardCarouselI {
  cards: AniListMedia[];
}

// this component will be used to display cards for the different categories of anime cards
export const CardCarousel: React.FC<CardCarouselI> = ({
  cards,
}: CardCarouselI) => {
  return (
    <>
      <div className="flex flex-row items-center overflow-x-scroll scrollbar-hide overflow-hidden">
        {cards.map((card) => (
          <div className="mr-4">
            <Card key={card.id} {...card} />
          </div>
        ))}
      </div>
    </>
  );
};

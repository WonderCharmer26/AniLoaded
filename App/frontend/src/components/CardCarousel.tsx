// import { JSX } from "react";
import React from "react";
import { Card } from "./Card";
import { media } from "../schemas/animeSchemas";

interface CardCarouselI {
  cards: media[];
}

// this component will be used to display cards for the different categories of anime cards
export const CardCarousel: React.FC<CardCarouselI> = ({
  cards,
}: CardCarouselI) => {
  return (
    <>
      <div className="flex flex-row items-center">
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </>
  );
};

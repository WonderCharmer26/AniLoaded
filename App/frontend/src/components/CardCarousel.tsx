// import { JSX } from "react";
import React from "react";
import { Card } from "./Card";
import { Anime } from "../schemas/animeSchemas";

interface CardCarouselI {
  cards: Anime[];
}

// this component will be used to display cards for the different categories of anime cards
export const CardCarousel: React.FC<CardCarouselI> = ({ cards }) => {
  return (
    <>
      <div className="flex flex-row items-center">
        {cards.map((card, idx) => (
          <Card key={idx} {...card} />
        ))}
      </div>
    </>
  );
};

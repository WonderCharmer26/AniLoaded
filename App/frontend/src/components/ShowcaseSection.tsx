// NOTE: THIS COMPONENT WILL HAVE THE CardCarousel COMPONENT BY DEFAULT INSIDE OF IT
// imports
import { CardI } from "./Card";
import { CardCarousel } from "./CardCarousel";
// import { Card } from "./Card";
import React from "react";

// this is a component for the showcase section on the homepage
interface ShowcaseSectionI {
  sectionName: string;
  cards: CardI[]; // might need to make this an array of card components
}

export const ShowcaseSection: React.FC<ShowcaseSectionI> = ({
  sectionName,
  cards,
}) => {
  return (
    <>
      {" "}
      <div className="flex flex-row items-center mt-8 mb-3">
        <hr className="bg-white opacity-20 w-full h-[0.3px]"></hr>
        <div className="flex flex-row items-center ">
          <h2 className="text-white font-bold w-[150px]">{sectionName}</h2>
        </div>
        <hr className="bg-white opacity-20 w-full h-[0.3px]"></hr>
      </div>
      {/* NOTE: add in the CardCarousel component here to combine components */}
      <CardCarousel cards={cards} />
    </>
  );
};

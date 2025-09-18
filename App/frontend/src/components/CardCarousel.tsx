import { JSX } from "react";

// this component will be used to display cards for the different categories of anime cards
interface CardCarouselI {
  Card: () => JSX.Element;
}
export const CardCarousel: React.FC<CardCarouselI> = ({ Card }) => {
  return (
    <>
      <div className="flex flex-row items-center">{<Card />}</div>
    </>
  );
};

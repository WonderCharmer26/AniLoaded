// this component will used to display cards for the different categories of anime cards
// TODO: add in sync loader to show as the images load
// TODO: add hover effect to display the show information (add later on maybe)

import { AniListMedia } from "../schemas/animeSchemas";
import { Link } from "react-router-dom";

// TODO: make add a link to navigate to the page with anime

// showcases anime images and the title
export const Card: React.FC<AniListMedia> = ({
  title,
  coverImage,
  id,

  // might make a function to move the user to the top of the anime info page when loaded
  // TODO: add "id" to help link the anime name in the param to get the data for the anime page
}: AniListMedia) => {
  return (
    // NOTE:  Changed the route an absolute route so it always takes to the anime info page through the whole application
    <Link to={`/anime/${id}`}>
      {/* NOTE: This changes the width of the cards */}
      <div className="w-60 flex-col cursor-pointer relative rounded-2xl">
        <img
          alt={title.english ? title.english : ""}
          src={coverImage.large}
          // NOTE: this changes the height of the cards
          className="w-full h-105 object-cover border-2 border-black rounded-2xl"
        />
        <div className="font-[Inter] mt-2 font-semibold text-[13px] h-12 text-center overflow-hidden cursor-pointer">
          {/* make sure that the titles are only showed up to a certain amount */}
          {title.english ? title.english.split(" ").slice(0, 6).join(" ") : ""}
        </div>
      </div>
    </Link>
  );
};

// this component will used to display cards for the different categories of anime cards
// TODO: add in sync loader to show as the images load
// TODO: add hover effect to display the show information (add later on maybe)

import { AniListMedia } from "../schemas/animeSchemas";

// NOTE: get rid of export
// interface for the props for this component
// export interface CardI {
//   imgUrl?: string;
//   animeTitle?: string;
// }

// showcases anime images and the title
export const Card: React.FC<AniListMedia> = ({
  title,
  coverImage,
}: AniListMedia) => {
  return (
    <div className="w-42 flex-col cursor-pointer relative rounded-2xl">
      <img
        alt={title.english ? title.english : ""}
        src={coverImage.large}
        className="w-full h-72 object-cover border-4 border-black rounded-2xl"
      />
      <div className="font-[Inter] font-semibold text-[12px] h-12 text-center overflow-hidden cursor-pointer">
        {/* make sure that the titles are only showed up to a certain amount */}
        {title.english ? title.english.split(" ").slice(0, 6).join(" ") : ""}
      </div>
    </div>
  );
};

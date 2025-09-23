// this component will used to display cards for the different categories of anime cards
// TODO: add in sync loader to show as the images load
// TODO: add hover effect to display the show information (add later on maybe)

import { media } from "../schemas/animeSchemas";

// NOTE: get rid of export
// interface for the props for this component
// export interface CardI {
//   imgUrl?: string;
//   animeTitle?: string;
// }

// showcases anime images and the title
export const Card: React.FC<media> = ({ title, coverImage }: media) => {
  return (
    <div className="w-42 cursor-pointer h-78 border border-white relative rounded-2xl">
      <img
        alt={title.english ? title.english : ""}
        src={coverImage.large}
        className="w-full h-72 object-cover rounded-2xl"
      />
      <div className="absolute flex justify-center items-center h-fit -bottom-7 left-0 w-full text-center">
        {title.english ? title.english : ""}
      </div>
    </div>
  );
};

// this component will used to display cards for the different categories of anime cards
// TODO: add in sync loader to show as the images load
// TODO: add hover effect to display the show information (add later on maybe)

// NOTE: get rid of export
// interface for the props for this component
export interface CardI {
  imgUrl: string;
  altText: string;
  animeTitle: string;
}

// showcases anime images and the title
export const Card = () => {
  return (
    <div className="w-52 h-72 border border-black relative rounded-2xl">
      <img
        src="../assets/images/1279113 1.png"
        alt="Anime Placeholder"
        className="w-full h-5/6 object-cover"
      />
      <div className="absolute -bottom-7 left-0 w-full text-center">
        Anime Title
      </div>
    </div>
  );
};

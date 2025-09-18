// this is a component for the showcase section on the homepage
interface ShowcaseSectionI {
  sectionName: string;
}

export const ShowcaseSection: React.FC<ShowcaseSectionI> = ({
  sectionName,
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
    </>
  );
};

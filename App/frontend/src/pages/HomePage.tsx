// TODO: Add in the pop up add to the page
// TODO: Finalize the sections for the anime that will be displayed
import { Card } from "../components/Card";
import { CarouselComponent } from "../components/Carousel";

export default function HomePage() {
  return (
    <div>
      <section>
        <div className="mb-11">
          <CarouselComponent />
        </div>
      </section>
      {/* trending anime section here */}
      <section>
        <div>
          <div className="flex flex-row items-center">
            <hr className="bg-white opacity-20 w-full h-[0.3px]"></hr>
            <div className="flex flex-row items-center ">
              <h2 className="text-white font-bold w-[150px] ">
                TRENDING ANIME
              </h2>
            </div>
            <hr className="bg-white opacity-20 w-full h-[0.3px]"></hr>
          </div>
          {/* cards go here */}
          <Card />
        </div>
      </section>
      {/* second section for anime */}
      <section>
        <div>
          <div className="flex flex-row items-center">
            <hr className="bg-white opacity-20 w-full h-[0.3px]"></hr>
            <div className="flex flex-row items-center ">
              <h2 className="text-white font-bold w-[150px] ">FAN FAVORITES</h2>
            </div>
            <hr className="bg-white opacity-20 w-full h-[0.3px]"></hr>
          </div>
          {/* cards go here */}
          <Card />
        </div>
      </section>
      {/* TODO: Add pop up goes here */}
      {/* third section for anime */}
      <section>
        <div>
          <div className="flex flex-row items-center">
            <hr className="bg-white opacity-20 w-full h-[0.3px]"></hr>
            <div className="flex flex-row items-center ">
              <h2 className="text-white font-bold w-[150px] ">SHONEN ANIME</h2>
            </div>
            <hr className="bg-white opacity-20 w-full h-[0.3px]"></hr>
          </div>
        </div>
        {/* cards go here */}
        <Card />
      </section>
      {/* TODO: make a carousel of cards to show the users top 5 animes, component might be made already */}
      {/* TODO: make a carousel of cards to show the users top trending anime from the backend (popular shows from the API) */}
      {/* TODO: place the banner of dandadan poster after that the user can click on */}
      {/* TODO: show the different categories of animes from the backend with same card component */}
    </div>
  );
}

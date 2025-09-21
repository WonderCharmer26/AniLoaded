// TODO: Add in the pop up add to the page
// TODO: Finalize the sections for the anime that will be displayed
// import { Card } from "../components/Card";
import { CarouselComponent } from "../components/Carousel";
import { ShowcaseSection } from "../components/ShowcaseSection";
import { useQuery } from "@tanstack/react-query";
import { getTrending } from "../services/fetchAnimes";
import { AxiosResponse } from "axios";
import { Anime } from "../schemas/animeSchemas";

/*NOTE: might make the seperation bigger for ShowcaseSection, teak mt-6 higher */

export default function HomePage() {
  // test data
  const testData = [
    {
      imgUrl: "placeholder",
      animeTitle: "Anime Title",
    },
  ];

  // function for making a request to get trending anime
  const { data, error, isLoading } = useQuery<Anime[], Error>({
    queryKey: ["trending"],
    queryFn: getTrending,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error loading data</h1>;
  }

  const trendingData = data ?? [];

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
          <ShowcaseSection sectionName="TRENDING ANIME" cards={trendingData} />
          {/* TODO: map through the data and display the cards when database is connected */}
        </div>
      </section>
      {/* popular section for anime */}
      <section>
        <div>
          <ShowcaseSection sectionName="POPULAR ANIME" cards={trendingData} />
        </div>
      </section>
      {/* TODO: Add pop up goes here */}
      {/* third section for anime */}
      <section>
        <div>
          <ShowcaseSection sectionName="TOP RATED ANIME" cards={trendingData} />
        </div>
      </section>
      {/* TODO: make a carousel of cards to show the users top 5 animes, component might be made already */}
      {/* TODO: make a carousel of cards to show the users top trending anime from the backend (popular shows from the API) */}
      {/* TODO: place the banner of dandadan poster after that the user can click on */}
      {/* TODO: show the different categories of animes from the backend with same card component */}
    </div>
  );
}

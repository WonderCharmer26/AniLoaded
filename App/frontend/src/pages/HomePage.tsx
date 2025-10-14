// TODO: Add in the pop up add to the page
// TODO: Finalize the sections for the anime that will be displayed
// import { Card } from "../components/Card";
import { CarouselComponent } from "../components/Carousel";
import { ShowcaseSection } from "../components/ShowcaseSection";
import { useQuery } from "@tanstack/react-query";
import { getPopular, getTopAnime, getTrending } from "../services/fetchAnimes";
import { AniListMedia } from "../schemas/animeSchemas";
import { useLoaderData } from "react-router-dom"; // use data from react router loader

/*NOTE: might make the seperation bigger for ShowcaseSection, teak mt-6 higher */
// NOTE: gonna add the supabase user in here to account for when the user is logged in
// NOTE: add in prefetch to get the data before the component loads for the carousel component
export default function HomePage() {
  // NOTE: get the data from the homePageFetcher and pass it in to the data so that it's there when prefetched
  const loaderData = useLoaderData() as {
    trendingAnime: AniListMedia[];
    popularAnime: AniListMedia[];
    topAnime: AniListMedia[];
  };

  // const { dehydratedState } = useLoaderData() as { dehydratedState: unknown };

  // function for making a request to get trending anime
  // NOTE: might add a stale time to the fetches ( might be needed at all (small improvement))
  const {
    data: trendingAnime,
    error: trendingError,
    isLoading: trendingLoading,
  } = useQuery<AniListMedia[], Error>({
    queryKey: ["trendingAnime"],
    queryFn: getTrending,
    // use initial data to get the prefetched data to use
    initialData: loaderData.trendingAnime,
  });

  // function for making a request to get the most popular anime
  // NOTE: might add a stale time to the fetches ( might be needed at all (small improvement))
  const {
    data: popularAnime,
    error: popularError,
    isLoading: popularLoading,
  } = useQuery<AniListMedia[], Error>({
    queryKey: ["popularAnime"],
    queryFn: getPopular,
    // use initial data to get the prefetched data to use
    initialData: loaderData.popularAnime,
  });

  // TODO: make function to fetch the top anime to showcase in the carousel
  //TODO: handle the error and loading state
  // NOTE: might add a stale time to the fetches ( might be needed at all (small improvement))
  const {
    data: topAnime,
    error: topAnimeError,
    isLoading: topAnimeLoading,
  } = useQuery<AniListMedia[], Error>({
    queryKey: ["topAnime"],
    queryFn: getTopAnime,
    // use initial data to get the prefetched data to use
    initialData: loaderData.topAnime,
  });

  // NOTE: move the loading and error handling into the component with the trending showcase
  if (trendingLoading) {
    return <h1>Loading...</h1>;
  }
  if (trendingError) {
    return <h1>Error loading data</h1>;
  }

  // NOTE: move the loading and error into the compontent for popular showcase section
  if (popularLoading) {
    return <h1>Loading...</h1>;
  }
  if (popularError) {
    return <h1>Error loading data</h1>;
  }

  // log the data to test what I get back
  console.log(trendingAnime); // check the trending data;
  console.log(popularAnime); // check the popular data
  console.log(topAnime); // check the top anime

  // if data then set it to data, else set it to an empty array
  const trendingData = trendingAnime ? trendingAnime : [];
  const popularData = popularAnime ? popularAnime : [];
  const topAnimeData = topAnime ? topAnime : [];

  console.log(trendingData); // log the data to test
  console.log(popularData); // log the data to test
  console.log("this is the top anime data:", topAnimeData); // log the data to test

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
          <ShowcaseSection sectionName="POPULAR ANIME" cards={popularData} />
        </div>
      </section>
      {/* TODO: Add pop up goes here fetch the image from supabase */}
      {/* third section for anime */}
      <section>
        <div>
          <ShowcaseSection sectionName="TOP RATED ANIME" cards={topAnimeData} />
        </div>
      </section>
      {/* TODO: make a carousel of cards to show the users top 5 animes, component might be made already */}
      {/* TODO: place the banner of dandadan poster after that the user can click on */}
      {/* TODO: show the different categories of animes from the backend with same card component */}
    </div>
  );
}

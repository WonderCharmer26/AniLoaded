// TODO: Work on recommendation functionality
import type { AniListMedia } from "../../schemas/animeSchemas";
import type { RecommendationBucket } from "../../schemas/recommendations";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const placeholderCover =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80";

const makeAnime = (
  id: number,
  title: string,
  genres: string[],
): AniListMedia => ({
  id,
  title: { english: title },
  episodes: 13,
  coverImage: {
    large: placeholderCover,
    medium: placeholderCover,
  },
  genres,
  description: "Mock recommendation entry.",
  averageScore: 85,
  status: "FINISHED",
  studios: { nodes: [] },
  characters: { edges: [] },
});

const mockForYou: RecommendationBucket[] = [
  {
    id: "bucket-1",
    label: "Because you liked Found Family arcs",
    reason: "Matches emotional beats from your recent completions.",
    items: [
      makeAnime(200, "Buddy Daddies", ["Action", "Comedy"]),
      makeAnime(201, "March Comes in Like a Lion", ["Drama"]),
    ],
  },
  {
    id: "bucket-2",
    label: "High-energy action",
    reason: "Based on top rated shounen entries in your profile.",
    items: [
      makeAnime(202, "Chainsaw Man", ["Action"]),
      makeAnime(203, "Dorohedoro", ["Fantasy"]),
    ],
  },
];

const globalFallback: AniListMedia[] = [
  makeAnime(204, "Cowboy Bebop", ["Action", "Sci-Fi"]),
  makeAnime(205, "Demon Slayer", ["Action"]),
  makeAnime(206, "Spy x Family", ["Comedy"]),
];

export async function getPersonalizedRecommendations(
  userId: string,
): Promise<RecommendationBucket[]> {
  await delay(210);
  if (!userId) {
    return [];
  }
  return mockForYou;
}

export async function getFallbackRecommendations(): Promise<AniListMedia[]> {
  await delay(120);
  return globalFallback;
}


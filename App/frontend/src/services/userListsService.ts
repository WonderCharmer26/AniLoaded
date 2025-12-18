// TODO: Ensure that real data is later fetched from the backend
import type { QueryClient } from "@tanstack/react-query";
import type { AniListMedia } from "../schemas/animeSchemas";
import type { UserAnimeList } from "../schemas/userLists";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const placeholderCover =
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80";

const buildMockAnime = (
  id: number,
  title: string,
  genres: string[],
): AniListMedia => ({
  id,
  title: { english: title },
  episodes: 12,
  coverImage: {
    large: placeholderCover,
    medium: placeholderCover,
  },
  genres,
  description: "Placeholder description for future API data.",
  averageScore: 80,
  status: "FINISHED",
  studios: { nodes: [] },
  characters: { edges: [] },
});

const mockLists: UserAnimeList[] = [
  {
    id: "list-1",
    title: "All-Time Favorites",
    description: "The shows I recommend to every new fan.",
    ownerId: "demo-user",
    visibility: "public",
    updatedAt: new Date().toISOString(),
    entries: [
      buildMockAnime(1, "Fullmetal Alchemist: Brotherhood", ["Action"]),
      buildMockAnime(2, "Mob Psycho 100", ["Comedy", "Action"]),
      buildMockAnime(3, "Fruits Basket", ["Drama"]),
      buildMockAnime(4, "Ping Pong the Animation", ["Sports"]),
      buildMockAnime(5, "Violet Evergarden", ["Drama"]),
    ].map((anime, idx) => ({
      id: `list-1-entry-${idx + 1}`,
      rank: idx + 1,
      anime,
    })),
  },
  {
    id: "list-2",
    title: "Current Season Watchlist",
    description: "Keeping tabs on what to binge once it finishes airing.",
    ownerId: "demo-user",
    visibility: "private",
    updatedAt: new Date().toISOString(),
    entries: [
      buildMockAnime(6, "Dungeon Food", ["Fantasy"]),
      buildMockAnime(7, "Blue Box", ["Romance"]),
    ].map((anime, idx) => ({
      id: `list-2-entry-${idx + 1}`,
      rank: idx + 1,
      anime,
    })),
  },
];

export async function getUserTopLists(
  userId: string,
): Promise<UserAnimeList[]> {
  await delay(200);
  return mockLists.filter(
    (list) => list.ownerId === userId || list.visibility === "public",
  );
}

export async function createListPlaceholder(
  _userId: string,
  _title: string,
): Promise<void> {
  // TODO: connect to Supabase mutation once backend is ready.
  await delay(100);
}

export function listsPageLoader(queryClient: QueryClient, userId: string) {
  return async () => {
    await queryClient.ensureQueryData({
      queryKey: ["userTopLists", userId],
      queryFn: () => getUserTopLists(userId),
    });
    return null;
  };
}

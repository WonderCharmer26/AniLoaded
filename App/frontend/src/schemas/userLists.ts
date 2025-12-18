import { AniListMedia } from "./animeSchemas";

export interface UserListEntry {
  id: string;
  rank: number;
  notes?: string;
  anime: AniListMedia;
}

export interface UserAnimeList {
  id: string;
  title: string;
  description?: string;
  visibility: "public" | "private";
  updatedAt: string;
  ownerId: string;
  entries: UserListEntry[];
}

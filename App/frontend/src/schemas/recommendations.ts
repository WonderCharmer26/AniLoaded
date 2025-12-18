import { AniListMedia } from "./animeSchemas";

export interface RecommendationBucket {
  id: string;
  label: string;
  reason: string;
  items: AniListMedia[];
}

export interface RecommendationContext {
  userId?: string;
  seedAnimeIds?: number[];
}

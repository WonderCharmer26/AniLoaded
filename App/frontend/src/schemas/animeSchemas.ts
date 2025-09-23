// Raw AniList-like types (mirror GraphQL response)
export interface AniListTitle {
  romaji: string | null;
  english?: string | null;
  native?: string | null;
}

export interface AniListImage {
  large?: string;
  medium?: string;
  small?: string;
}

export interface AniListMedia {
  id: number;
  title: AniListTitle;
  episodes: number | null; // might not get episodes back
  coverImage: AniListImage;
  genres?: string[];
  averageScore?: number | null;
  status?:
    | "FINISHED"
    | "RELEASING"
    | "NOT_YET_RELEASED"
    | "CANCELLED"
    | "HIATUS"
    | null;
}

// Corrected trending response envelope from backend
export interface TrendingResponse {
  data: {
    Page: {
      media: AniListMedia[];
    };
  };
}

// Helper to choose a display title with fallback (english -> romaji -> native)
export function getDisplayTitle(t: AniListTitle): string {
  return t.english ?? t.romaji ?? t.native ?? "";
}

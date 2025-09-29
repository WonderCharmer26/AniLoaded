// Raw AniList-like types (mirror GraphQL response)

// title schema for the information for the title
export interface AniListTitle {
  romaji: string | null;
  english?: string | null;
  native?: string | null;
}

// schema for the images that we get back
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
  genres?: string[]; // might get back an array of different genres
  averageScore?: number | null;
  status?: // predefined strings that we'll get back for the status of the show
  "FINISHED" | "RELEASING" | "NOT_YET_RELEASED" | "CANCELLED" | "HIATUS" | null;
}

// Structure for the data that we'll get back from GraphQL call
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

export interface media {
  id: number;
  title: Title;
  episodes: number | null; // might not get episodes back
  coverImage: Image;
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

export interface Title {
  romaji: string | null;
  english?: string | null;
  native?: string;
}

interface Image {
  large?: string;
  medium?: string;
  small?: string;
}

// interface for trending_anime
export interface TrendingAnimeI {
  data: media[];
}

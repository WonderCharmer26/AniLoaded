export interface Anime {
  id: number;
  title: Title;
  image: Image;
  url: string;
  genre?: string;
  averageScore?: number;
  status?: string;
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
  data: Anime[];
}

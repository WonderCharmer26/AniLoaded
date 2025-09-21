export interface Anime {
  id: number;
  title: Title;
  image: Image;
  url: string;
}

export interface Title {
  romanji: string;
  english: string;
  native: string;
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

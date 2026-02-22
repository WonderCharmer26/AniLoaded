// Raw AniList-like types (mirror GraphQL response)

// title schema for the information for the title
export interface AniListTitle {
  romaji?: string | null;
  english?: string | null;
  native?: string | null;
}

// name objects returned for characters/voice actors
export interface AniListName {
  full?: string | null;
  native?: string | null;
  romaji?: string | null;
}

// schema for the images that we get back
export interface AniListImage {
  large?: string;
  medium?: string;
  small?: string;
  extraLarge?: string;
}

// schema for the GraphQL querry
export interface AniListMedia {
  id: number;
  title: AniListTitle;
  episodes?: number | null; // might not get episodes back
  coverImage: AniListImage;
  bannerImage?: string; // might make a req for a banner depending on the fetch
  season?: string;
  seasonYear?: number | null;
  genres?: string[]; // will get back an array of different genres
  description?: string | null; // description of the plot of the anime
  averageScore?: number | null;
  status?: // predefined strings that we'll get back for the status of the show
    | "FINISHED"
    | "RELEASING"
    | "NOT_YET_RELEASED"
    | "CANCELLED"
    | "HIATUS"
    | null;
  studios?: {
    nodes: Studio[];
  }; // optional to get the studio data
  characters?: CharacterConnection;
}

export interface PagesSchema {
  currentPage?: number;
  hasNextPage?: boolean;
  perPage?: number;
}

// Structure for the data that we'll get back from GraphQL call
export interface ShowcaseResponse {
  data: {
    Page: {
      media: AniListMedia[];
    };
  };
}

// make a schema for the anime that will be paginated on certain pages
export interface AnimePaginationResponse {
  data: {
    // TODO: Fillout the rest
    Page: {
      pageInfo: PagesSchema;
      media: AniListMedia[];
    };
  };
}

export interface AnimeInfoPageResponse {
  data: {
    Media: AniListMedia;
  };
}

// all the studio interfaces needed to make an interface for the studio
export interface Studio {
  id: number;
  name: string;
}

export interface StudioEdge {
  node: Studio;
}

export interface StudioConnection {
  edges: StudioEdge[];
}

// GraphQL character voice actor information
export interface VoiceActor {
  id: number;
  name: AniListName;
  image?: AniListImage | null;
  languageV2?: string | null;
}

export interface Character {
  id: number;
  name: AniListName;
  image?: AniListImage;
}

export interface CharacterEdge {
  role?: string | null;
  node: Character;
  voiceActors?: VoiceActor[];
}

export interface CharacterConnection {
  edges: CharacterEdge[];
}

// Helper to choose a display title with fallback (english -> romaji -> native)
export function getDisplayTitle(t: AniListTitle): string {
  return t.english ?? t.romaji ?? t.native ?? "";
}

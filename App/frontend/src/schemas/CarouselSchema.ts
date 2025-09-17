// This houses all the schemas for the carousel component for the main page

// interface for carousel data
export interface CarouselI {
  // all the data will be fetched from supabase
  id: string;
  title: string;
  genre: string;
  url: string;
  // description: string // might add this later if needed
}

// for the titles and genre information fetched from the backend
export interface CarouselTitlesI {
  id: string; // used to help add a unique key
  storage_path: string;
  title: string;
  genre: string;
  // description: string // might add this later if needed
}

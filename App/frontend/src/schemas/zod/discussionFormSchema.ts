import { z } from "zod";

// discussion schema for the discussion form
export const DiscussionSchema = z.object({
  anime_id: z.number().int().positive("Please select an anime."),
  category_id: z.string(),
  title: z.string(),
  body: z.string(),
  thumbnail: z.instanceof(File).nullable(),
  is_spoiler: z.boolean(),
  episode_number: z.number().int().optional(),
  is_locked: z.boolean(),
});

// export to be used on the correct pages
export type DiscussionValues = z.infer<typeof DiscussionSchema>;

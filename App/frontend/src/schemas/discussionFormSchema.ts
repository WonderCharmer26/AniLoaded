import { boolean, int64, z } from "zod";

// discussion schema for the discussion from
export const DiscussionSchema = z.object({
  title: z.string(),
  body: z.string(),
  is_spoiler: z.boolean(),
  episode_number: z.optional(int64()),
  is_locked: z.optional(boolean()),
});

// export to be used on the correct pages
export type DiscussionValues = z.infer<typeof DiscussionSchema>;

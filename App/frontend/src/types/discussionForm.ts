import { DiscussionValues } from "@/schemas/zod/discussionFormSchema";
import { useForm } from "@tanstack/react-form";

export type DiscussionFormApi = ReturnType<typeof useForm<DiscussionValues>>;

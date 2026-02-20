import DiscussionBodySection from "@/components/forms/DiscussionBodySection";
import DiscussionAnimeSearchSection from "@/components/forms/DiscussionAnimeSearchSection";
import DiscussionCategorySection from "@/components/forms/DiscussionCategorySection";
import DiscussionThumbnailSection from "@/components/forms/DiscussionThumbnailSection";
import DiscussionTitleSection from "@/components/forms/DiscussionTitleSection";
import DiscussionToggleSection from "@/components/forms/DiscussionToggleSection";
import {
  DiscussionSchema,
  DiscussionValues,
} from "@/schemas/zod/discussionFormSchema";
import { submitDiscussion } from "@/services/api/discussionService";
import { useForm } from "@tanstack/react-form";

// TODO: ADD IN SEASON_NUMBER, ANIME NUMBER, EPISODE NUMBER
// TODO: ANIME NUMBER: Should have a search component that gets the anime and the anime number to send to the backend

export default function DiscussionSubmitPage() {
  // set up the default values for the form
  const defaultValues: DiscussionValues = {
    anime_id: 0,
    category_id: "55555555-5555-5555-5555-555555555555", // value if the category picked
    title: "",
    body: "",
    thumbnail: null, // incase user doesn't post a thumbnail
    is_spoiler: false,
    is_locked: false,
  };

  // set up the form with Zod validation wired into TanStack Form
  const form = useForm({
    defaultValues,
    // Zod schema validates all fields on change via Standard Schema support
    validators: {
      onChange: DiscussionSchema,
    },
    // onSubmit only fires when validation passes
    onSubmit: async ({ value }) => {
      try {
        await submitDiscussion({
          anime_id: value.anime_id,
          category_id: value.category_id,
          title: value.title,
          body: value.body,
          thumbnail: value.thumbnail,
          is_spoiler: value.is_spoiler,
          is_locked: value.is_locked,
        });
      } catch (error) {
        console.error("Discussion submit failed", error);
      }
    },
  });

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold text-white">New Discussion</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault(); // prevent form refresh on submit
            event.stopPropagation(); // make sure that the individual child components are handled
            form.handleSubmit(); // submit function
          }}
          className="space-y-6"
        >
          {/* Different sections of the form */}
          <DiscussionThumbnailSection form={form} />
          <DiscussionAnimeSearchSection form={form} />
          <DiscussionCategorySection form={form} />
          <DiscussionTitleSection form={form} />
          <DiscussionBodySection form={form} />
          <DiscussionToggleSection form={form} />

          {/* Submit button */}
          {/* Handles the state of the button based on the form*/}
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="rounded-xl bg-black px-4 py-2 font-semibold text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}

import DiscussionBodySection from "@/components/forms/DiscussionBodySection";
import DiscussionTitleSection from "@/components/forms/DiscussionTitleSection";
import DiscussionToggleSection from "@/components/forms/DiscussionToggleSection";
import {
  DiscussionSchema,
  DiscussionValues,
} from "@/schemas/discussionFormSchema";
import { useForm } from "@tanstack/react-form";

export default function DiscussionSubmitPage() {
  // set up the default values for the form
  const discussion: DiscussionValues = {
    title: "",
    body: "",
    is_spoiler: false,
    is_locked: false,
  };

  // handle the form submit
  const handleSubmit = (value: DiscussionValues) => {
    // parse the form data we get back in order to validate with zod
    const formData = DiscussionSchema.safeParse(value);

    // handle when it doesn't succeed
    if (!formData.success) {
      console.log("Discussion submit validation errors", formData.error);
      return;
    }

    // handle case where its successful
    console.log("Discussion submit placeholder", formData.data);
  };

  // set up the form to be used
  const form = useForm({
    // discussion has the schemas set up
    defaultValues: discussion as DiscussionValues,
    // handle submition
    onSubmit: ({ value }) => handleSubmit(value),
  });

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold text-white">New Discussion</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Different sections of the form */}
          <DiscussionTitleSection form={form as any} />
          <DiscussionBodySection form={form as any} />
          <DiscussionToggleSection form={form as any} />
          {/*Submition button*/}
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-xl bg-black px-4 py-2 font-semibold text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

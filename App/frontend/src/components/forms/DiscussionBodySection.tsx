import { DiscussionFormApi } from "@/types/discussionForm";
import { getFieldErrorMessage } from "./getFieldErrorMessage";

type DiscussionBodySectionProps = {
  form: DiscussionFormApi;
};

// body section of the discussion form (reusable for the list section)
export default function DiscussionBodySection({
  form,
}: DiscussionBodySectionProps) {
  return (
    <form.Field
      name="body"
      children={(field) => {
        const errorMessage = getFieldErrorMessage(field.state.meta.errors?.[0]);

        return (
          <div className="space-y-2">
            <label
              htmlFor={field.name}
              className="text-sm font-semibold text-slate-200"
            >
              Body
            </label>
            <textarea
              id={field.name}
              name={field.name}
              value={field.state.value ?? ""}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="What's on your mind?"
              rows={6}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-slate-500 focus:outline-none"
            />
            {errorMessage ? (
              <p className="text-sm text-red-400">{errorMessage}</p>
            ) : null}
          </div>
        );
      }}
    />
  );
}

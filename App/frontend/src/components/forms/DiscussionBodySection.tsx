import { DiscussionFormApi } from "@/types/discussionForm";

type DiscussionBodySectionProps = {
  form: DiscussionFormApi;
};

type TextField = {
  name: string;
  state: {
    value: string;
    meta: {
      errors?: string[];
    };
  };
  handleBlur: () => void;
  handleChange: (value: string) => void;
};

export default function DiscussionBodySection({
  form,
}: DiscussionBodySectionProps) {
  return (
    // styling for the body part of the form
    <form.Field
      name="body"
      children={(field: TextField) => (
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
          {field.state.meta.errors?.length ? (
            <p className="text-sm text-red-400">{field.state.meta.errors[0]}</p>
          ) : null}
        </div>
      )}
    />
  );
}

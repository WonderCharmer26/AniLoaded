import { DiscussionFormApi } from "@/types/discussionForm";

type DiscussionTitleSectionProps = {
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

export default function DiscussionTitleSection({
  form,
}: DiscussionTitleSectionProps) {
  return (
    <form.Field
      name="title"
      children={(field: TextField) => (
        <div className="space-y-2">
          <label
            htmlFor={field.name}
            className="text-sm font-semibold text-slate-200"
          >
            Title
          </label>
          <input
            id={field.name}
            name={field.name}
            value={field.state.value ?? ""}
            onBlur={field.handleBlur}
            onChange={(event) => field.handleChange(event.target.value)}
            placeholder="Give your discussion a clear title"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-slate-500 focus:outline-none"
          />
          {field.state.meta.errors?.length ? (
            <p className="text-sm text-red-400">
              {field.state.meta.errors[0]}
            </p>
          ) : null}
        </div>
      )}
    />
  );
}

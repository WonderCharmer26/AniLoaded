import { DiscussionFormApi } from "@/types/discussionForm";
import { getFieldErrorMessage } from "./getFieldErrorMessage";

type DiscussionCategorySectionProps = {
  form: DiscussionFormApi;
};

const categoryOptions = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    label: "episode",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    label: "fan theories",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    label: "spoilers",
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    label: "questions",
  },
  {
    id: "55555555-5555-5555-5555-555555555555",
    label: "general",
  },
];

export default function DiscussionCategorySection({
  form,
}: DiscussionCategorySectionProps) {
  return (
    <form.Field
      name="category_id"
      children={(field) => {
        const errorMessage = getFieldErrorMessage(field.state.meta.errors?.[0]);

        return (
          <div className="space-y-2">
            <label
              htmlFor={field.name}
              className="text-sm font-semibold text-slate-200"
            >
              Category
            </label>
            <select
              id={field.name}
              name={field.name}
              value={field.state.value ?? ""}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-slate-500 focus:outline-none"
            >
              {categoryOptions.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            {errorMessage ? (
              <p className="text-sm text-red-400">{errorMessage}</p>
            ) : null}
          </div>
        );
      }}
    />
  );
}

import { DiscussionFormApi } from "@/types/discussionForm";

type DiscussionEpisodeNumberSectionProps = {
  form: DiscussionFormApi;
};

export default function DiscussionEpisodeNumberSection({
  form,
}: DiscussionEpisodeNumberSectionProps) {
  return (
    <form.Field
      name="episode_number"
      children={(field) => (
        (() => {
          const rawError = field.state.meta.errors?.[0];
          const errorMessage =
            typeof rawError === "string"
              ? rawError
              : rawError &&
                  typeof rawError === "object" &&
                  "message" in rawError
                ? String((rawError as { message?: unknown }).message ?? "")
                : null;

          return (
            <div className="space-y-2">
              <label
                htmlFor={field.name}
                className="text-sm font-semibold text-slate-200"
              >
                Episode Number (Optional)
              </label>
              <input
                id={field.name}
                name={field.name}
                type="number"
                min={0}
                step={1}
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  const rawValue = event.target.value;

                  if (rawValue === "") {
                    field.handleChange(undefined);
                    return;
                  }

                  const nextValue = event.target.valueAsNumber;

                  if (Number.isNaN(nextValue)) {
                    field.handleChange(undefined);
                    return;
                  }

                  field.handleChange(Math.max(0, Math.trunc(nextValue)));
                }}
                placeholder="e.g. 12"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-slate-500 focus:outline-none"
              />
              {errorMessage ? (
                <p className="text-sm text-red-400">{errorMessage}</p>
              ) : null}
            </div>
          );
        })()
      )}
    />
  );
}

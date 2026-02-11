import { DiscussionFormApi } from "@/types/discussionForm";

type DiscussionToggleSectionProps = {
  form: DiscussionFormApi;
};

type ToggleField = {
  name: string;
  state: {
    value: boolean;
    meta: {
      errors?: string[];
    };
  };
  handleChange: (value: boolean) => void;
};

const getToggleClasses = (isActive: boolean) =>
  `relative inline-flex h-6 w-11 items-center rounded-full transition ${
    isActive ? "bg-emerald-500" : "bg-slate-700"
  }`;

const getToggleKnobClasses = (isActive: boolean) =>
  `inline-block h-4 w-4 transform rounded-full bg-white transition ${
    isActive ? "translate-x-6" : "translate-x-1"
  }`;

export default function DiscussionToggleSection({
  form,
}: DiscussionToggleSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <form.Field
        name="is_spoiler"
        children={(field: ToggleField) => (
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-200">Spoiler</p>
              <p className="text-xs text-slate-400">
                Mark this discussion as spoiler content.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={field.state.value}
              onClick={() => field.handleChange(!field.state.value)}
              className={getToggleClasses(field.state.value)}
            >
              <span className={getToggleKnobClasses(field.state.value)} />
            </button>
          </div>
        )}
      />
      <form.Field
        name="is_locked"
        children={(field: ToggleField) => (
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-200">Locked</p>
              <p className="text-xs text-slate-400">
                Prevent new replies from being added.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={field.state.value}
              onClick={() => field.handleChange(!field.state.value)}
              className={getToggleClasses(field.state.value)}
            >
              <span className={getToggleKnobClasses(field.state.value)} />
            </button>
          </div>
        )}
      />
    </div>
  );
}

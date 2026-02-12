import { DiscussionFormApi } from "@/types/discussionForm";
import { useCallback, useEffect, useRef, useState } from "react";

// Props for this component
type DiscussionThumbnailSectionProps = {
  form: DiscussionFormApi;
};

// params for this thumbnail component to follow
type ThumbnailFieldApi = {
  name: string;
  state: {
    value: File | null;
    meta: {
      errors?: string[];
    };
  };
  handleChange: (value: File | null) => void;
};

type ThumbnailFieldProps = {
  field: ThumbnailFieldApi;
};

// 5mb
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
// accepted file types
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

// format the bytes for the upload
const formatBytes = (bytes: number) =>
  `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

// function to validate the file type before it's sent
const validateFile = (file: File) => {
  // check if file type matches
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return "Only .jpeg, .png, or .webp images are allowed.";
  }

  // check if the file size bigger than the allowed limit
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return "Image must be 5 MB or smaller.";
  }

  return null;
};

function ThumbnailField({ field }: ThumbnailFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelection = useCallback(
    (file: File | null) => {
      if (!file) {
        setErrorMessage(null);
        field.handleChange(null);
        return;
      }

      const validationError = validateFile(file);
      if (validationError) {
        setErrorMessage(validationError);
        return;
      }

      setErrorMessage(null);
      // set the file if everything else passes
      field.handleChange(file);
    },
    [field],
  );

  useEffect(() => {
    // reset the preview feature if no photo is selected
    if (!field.state.value) {
      setPreviewUrl(null);
      return;
    }

    const nextUrl = URL.createObjectURL(field.state.value);
    setPreviewUrl(nextUrl);

    return () => {
      URL.revokeObjectURL(nextUrl);
    };
  }, [field.state.value]);

  const openFileDialog = () => fileInputRef.current?.click();
  const combinedError = errorMessage ?? field.state.meta.errors?.[0] ?? null;

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-200">Thumbnail</label>
      <div
        className={`flex flex-col gap-3 rounded-xl border-2 border-dashed px-4 py-4 transition ${
          isDragging
            ? "border-emerald-400 bg-emerald-500/10"
            : "border-slate-700 bg-slate-900"
        }`}
        onClick={openFileDialog}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          const file = event.dataTransfer.files?.[0] ?? null;
          handleFileSelection(file);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openFileDialog();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            handleFileSelection(file);
            event.target.value = "";
          }}
        />

        {previewUrl ? (
          <div className="flex flex-col gap-3">
            <img
              src={previewUrl}
              alt="Selected thumbnail preview"
              className="h-40 w-full rounded-lg object-cover"
            />
            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="space-y-1">
                <p className="font-semibold text-slate-200">
                  {field.state.value?.name}
                </p>
                <p>{formatBytes(field.state.value?.size ?? 0)}</p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-slate-500"
                onClick={(event) => {
                  event.stopPropagation();
                  setErrorMessage(null);
                  field.handleChange(null);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-400">
            <p className="font-semibold text-slate-200">
              Drag & drop an image here
            </p>
            <p>or click to upload a thumbnail</p>
            <p className="text-xs text-slate-500">
              Accepted: .jpeg, .png, .webp (max 5 MB)
            </p>
          </div>
        )}
      </div>
      {combinedError ? (
        <p className="text-sm text-red-400">{combinedError}</p>
      ) : null}
    </div>
  );
}

export default function DiscussionThumbnailSection({
  form,
}: DiscussionThumbnailSectionProps) {
  return (
    <form.Field name="thumbnail">
      {(field: ThumbnailFieldApi) => <ThumbnailField field={field} />}
    </form.Field>
  );
}

type RecommendationInputProps = {
  placeholder?: string;
  onButtonClick?: () => void;
};

export default function RecommendationInput({
  placeholder = "What are you in the mood for?",
  onButtonClick,
}: RecommendationInputProps) {
  return (
    <div className="w-full rounded-full bg-slate-900/60 p-2 shadow-[0_0_24px_rgba(94,61,255,0.12)]">
      <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2">
        <input
          type="text"
          placeholder={placeholder}
          className="flex-2/3 bg-transparent text-base text-slate-900 placeholder-slate-500 outline-none"
        />
        <button
          type="button"
          onClick={onButtonClick}
          className="flex h-11 w-11 items-center cursor-pointer justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700/60"
          aria-label="Search"
        >
          {/*Import search icon from lucid*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </div>
  );
}

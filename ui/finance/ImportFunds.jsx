/**
 * Renders a button component for triggering the import funds action.
 */
export default function ImportFunds() {
  return (
    <button
      type="button"
      className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-stone-950 px-4 text-[13px] font-medium text-white shadow-sm transition-colors duration-200 hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950 active:bg-stone-900"
    >
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 15V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M5 20h14" />
      </svg>
      Import funds
    </button>
  );
}

import React from "react";

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn’t load the data. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Error icon */}
      <svg
        className="mb-4 h-10 w-10 text-red-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" />
        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" />
        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" />
      </svg>

      {/* Title */}
      <h2 className="mb-2 text-lg font-semibold text-gray-800">{title}</h2>

      {/* Message */}
      <p className="mb-4 max-w-sm text-sm text-gray-600">{message}</p>

      {/* Retry button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400"
        >
          Try again
        </button>
      )}
    </div>
  );
}

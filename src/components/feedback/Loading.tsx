import React from "react";

type LoadingProps = {
  label?: string;
  fullscreen?: boolean;
};

export default function Loading({
  label = "Loading…",
  fullscreen = false,
}: LoadingProps) {
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    fullscreen ? (
      <div className="fixed inset-0 z-50 grid place-items-center bg-white/70 backdrop-blur-sm">
        {children}
      </div>
    ) : (
      <div className="flex items-center justify-center p-6">{children}</div>
    );

  return (
    <Wrapper>
      <div
        className="flex items-center gap-3"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        {/* Spinner */}
        <svg
          className="h-5 w-5 animate-spin text-brand-500"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-90"
            d="M22 12a10 10 0 0 0-10-10"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>

        {/* Label */}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
    </Wrapper>
  );
}

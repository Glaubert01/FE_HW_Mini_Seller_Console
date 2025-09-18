import React from "react";

type EmptyStateProps = {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({
  title = "No data available",
  message = "There is nothing to display here yet.",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Ícone ilustrativo */}
      <svg
        className="mb-4 h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="14"
          rx="2"
          ry="2"
          stroke="currentColor"
        />
        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" />
      </svg>

      {/* Título */}
      <h2 className="mb-2 text-lg font-semibold text-gray-800">{title}</h2>

      {/* Mensagem */}
      <p className="mb-4 max-w-sm text-sm text-gray-600">{message}</p>

      {/* Ação opcional */}
      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

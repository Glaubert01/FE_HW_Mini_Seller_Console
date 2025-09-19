import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type SlideOverProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export default function SlideOver({
  open,
  onClose,
  title,
  children,
  footer,
  className = "",
}: SlideOverProps) {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="slide-over-title"
    >
      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 transition-opacity",
          // backdrop mais forte no dark mode
          "bg-gray-900/50 dark:bg-black/60",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={clsx(
          "relative ml-auto flex h-full w-full max-w-md transform flex-col shadow-xl transition-all",
          // fundo com suporte a dark + transição de cor suave
          "bg-white dark:bg-gray-900 transition-colors",
          open ? "translate-x-0" : "translate-x-full",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-3 sm:px-6">
          {title && (
            <h2
              id="slide-over-title"
              className="text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors"
            >
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
          >
            <span className="sr-only">Close panel</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 text-gray-900 dark:text-gray-100 transition-colors">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 px-4 py-4 sm:px-6 transition-colors">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

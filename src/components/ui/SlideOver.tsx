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
          "fixed inset-0 bg-gray-900/50 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={clsx(
          "relative ml-auto flex h-full w-full max-w-md transform flex-col bg-white shadow-xl transition-all",
          open ? "translate-x-0" : "translate-x-full",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3 sm:px-6">
          {title && (
            <h2
              id="slide-over-title"
              className="text-lg font-medium text-gray-900"
            >
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <span className="sr-only">Close panel</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t px-4 py-4 sm:px-6 bg-gray-50">{footer}</div>
        )}
      </div>
    </div>
  );
}

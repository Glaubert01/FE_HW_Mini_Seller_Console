import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export default function Input({
  label,
  hint,
  className = "",
  ...props
}: Props) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </span>
      )}
      <input
        className={[
          "h-10 w-full rounded-md border border-gray-300 bg-white px-3",
          "text-sm text-gray-900 placeholder:text-gray-400",
          "focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200",
          "sm:h-10 sm:text-sm",
          className,
        ].join(" ")}
        {...props}
      />
      {hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
    </label>
  );
}

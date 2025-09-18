import React from "react";

export type SelectOption = { label: string; value: string };

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options?: SelectOption[]; // optional: you can use <option> manually too
  placeholder?: string; // appears as the first disabled option
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    error,
    options,
    placeholder = "Select an option",
    className = "",
    children,
    ...props
  },
  ref
) {
  const base =
    "rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-400";
  const styles = error
    ? "border-red-500 focus:border-red-500"
    : "border-gray-300 focus:border-brand-500";

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <select
        ref={ref}
        className={[base, styles, className].filter(Boolean).join(" ")}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {/* If 'options' is given, automatically render */}
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}

        {/* Fallback: allows manual use of <option> via 'children' */}
        {children}
      </select>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

export default Select;

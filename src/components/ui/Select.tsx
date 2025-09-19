// ...imports
export default function Select({
  className = "",
  options = [],
  label,
  ...rest
}: {
  className?: string;
  options: { value: string; label: string }[];
  label?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="flex flex-col gap-1">
      {label ? (
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {label}
        </span>
      ) : null}
      <select
        className={[
          "h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900",
          "focus:outline-none focus:ring-2 focus:ring-brand-400",
          "dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100",
          className,
        ].join(" ")}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

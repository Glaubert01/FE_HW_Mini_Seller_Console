// ...imports
export default function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  const { label, ...rest } = props as any;
  return (
    <label className="flex flex-col gap-1">
      {label ? (
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {label}
        </span>
      ) : null}
      <input
        className={[
          "h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-brand-400",
          "dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500",
          className,
        ].join(" ")}
        {...rest}
      />
    </label>
  );
}

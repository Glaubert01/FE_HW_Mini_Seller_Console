import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  // loading
  isLoading?: boolean;
  loading?: boolean; // alias
  loadingLabel?: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400 disabled:opacity-60 disabled:cursor-not-allowed";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-400 " +
    "dark:bg-brand-500 dark:hover:bg-brand-400",

  secondary:
    "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 " +
    "focus:ring-brand-400 " +
    "dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700",

  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-brand-400 " +
    "dark:text-gray-300 dark:hover:bg-gray-800",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const spinner = (
  <svg
    className="mr-2 h-4 w-4 animate-spin"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      d="M22 12a10 10 0 0 0-10-10"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    fullWidth,
    leftIcon,
    rightIcon,
    isLoading,
    loading,
    loadingLabel,
    className = "",
    children,
    disabled,
    ...props
  },
  ref
) {
  const busy = Boolean(isLoading ?? loading);

  const classes = [
    base,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || busy}
      {...props}
      aria-busy={busy ? "true" : undefined} // <- aqui o ajuste
    >
      {busy ? (
        <>
          {spinner}
          {loadingLabel ?? children}
        </>
      ) : (
        <>
          {leftIcon ? <span className="mr-2">{leftIcon}</span> : null}
          {children}
          {rightIcon ? <span className="ml-2">{rightIcon}</span> : null}
        </>
      )}
    </button>
  );
});

export default Button;

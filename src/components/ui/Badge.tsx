import React from "react";

type BadgeVariant =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "brand";

type BadgeSize = "sm" | "md";

export type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean; // decorative ball on the left
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "bg-gray-100 text-gray-800 ring-1 ring-gray-200",
  success: "bg-green-100 text-green-800 ring-1 ring-green-200",
  warning: "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200",
  danger: "bg-red-100 text-red-800 ring-1 ring-red-200",
  info: "bg-sky-100 text-sky-800 ring-1 ring-sky-200",
  brand: "bg-brand-100 text-brand-800 ring-1 ring-brand-200",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-0.5",
};

export default function Badge({
  children,
  variant = "neutral",
  size = "sm",
  dot = false,
  className = "",
  ...props
}: BadgeProps) {
  const classes = [
    "inline-flex items-center rounded-full font-medium",
    "whitespace-nowrap align-middle",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {dot && (
        <span
          aria-hidden
          className="mr-1 inline-block h-2 w-2 rounded-full bg-current"
        />
      )}
      {children}
    </span>
  );
}

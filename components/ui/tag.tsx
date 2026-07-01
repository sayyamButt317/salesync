import type { ReactNode } from "react";

export interface TagProps {
  children: ReactNode;
  variant?: "violet" | "gray";
}

const variantStyles = {
  violet: "bg-violet-50 text-violet-700",
  gray: "bg-gray-100 text-gray-500",
};

export function Tag({ children, variant = "violet" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}

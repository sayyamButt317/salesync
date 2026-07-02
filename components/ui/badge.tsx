import type { ReactNode } from "react";
import type { ConversationStatus } from "@/lib/dashboard/types";

export interface BadgeProps {
  children: ReactNode;
  variant?: ConversationStatus | "agency" | "default";
}

const variantStyles: Record<string, string> = {
  New: "bg-violet-50 text-violet-700",
  Replied: "bg-blue-50 text-blue-700",
  Closed: "bg-green-50 text-green-700",
  Pending: "bg-orange-50 text-orange-700",
  agency: "bg-gray-100 text-gray-600",
  default: "bg-gray-100 text-gray-600",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold ${variantStyles[variant] ?? variantStyles.default}`}
    >
      {children}
    </span>
  );
}

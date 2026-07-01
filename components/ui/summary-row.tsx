import type { ReactNode } from "react";

export interface SummaryRowProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export function SummaryRow({ label, value, className = "" }: SummaryRowProps) {
  return (
    <div
      className={`flex flex-col gap-1 border-b border-gray-50 py-3.5 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6 ${className}`}
    >
      <dt className="shrink-0 text-xs font-semibold text-gray-500 sm:w-36">
        {label}
      </dt>
      <dd className="min-w-0 flex-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}

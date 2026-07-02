"use client";

import { ChevronDown, Info } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "./card";

export interface ChartContainerProps {
  title: string;
  children: ReactNode;
  dropdownLabel?: string;
  showInfo?: boolean;
  footer?: ReactNode;
  className?: string;
}

export function ChartContainer({
  title,
  children,
  dropdownLabel,
  showInfo = false,
  footer,
  className = "",
}: ChartContainerProps) {
  return (
    <Card padding="none" className={`overflow-hidden ${className}`}>
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-gray-900">{title}</h3>
          {showInfo ? (
            <button
              type="button"
              className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="More information"
            >
              <Info className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
        {dropdownLabel ? (
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            {dropdownLabel}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>
      {children}
      {footer ? (
        <div className="border-t border-gray-100 px-5 py-3">{footer}</div>
      ) : null}
    </Card>
  );
}

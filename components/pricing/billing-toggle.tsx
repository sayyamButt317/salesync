"use client";

import type { BillingCycle } from "@/lib/pricing/types";

export interface BillingToggleProps {
  value: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
}

export function BillingToggle({ value, onChange }: BillingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="inline-flex rounded-xl border border-gray-200 bg-gray-50 p-1">
        <button
          type="button"
          onClick={() => onChange("monthly")}
          className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            value === "monthly"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => onChange("annual")}
          className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            value === "annual"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Annual
        </button>
      </div>
      <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
        Save ~2 months
      </span>
    </div>
  );
}

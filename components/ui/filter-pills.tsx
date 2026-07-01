"use client";

import { motion } from "framer-motion";

export interface FilterPillsProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  layoutId?: string;
}

export function FilterPills<T extends string>({
  options,
  value,
  onChange,
  layoutId = "filter-pill",
}: FilterPillsProps<T>) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((option) => {
        const isActive = value === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`relative cursor-pointer rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
              isActive ? "text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            {isActive ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-lg bg-violet-600 shadow-sm shadow-violet-600/20"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            ) : null}
            <span className="relative z-10">{option}</span>
          </button>
        );
      })}
    </div>
  );
}

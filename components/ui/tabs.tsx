"use client";

import { motion } from "framer-motion";

export interface TabItem<T extends string> {
  id: T;
  label: string;
  badge?: number;
}

export interface TabsProps<T extends string> {
  tabs: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  layoutId?: string;
}

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  layoutId = "tab-underline",
}: TabsProps<T>) {
  return (
    <div className="flex flex-wrap gap-1 border-b border-gray-100">
      {tabs.map((tab) => {
        const isActive = value === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative cursor-pointer px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive ? "text-violet-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {isActive ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-x-0 -bottom-px h-0.5 bg-violet-600"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            ) : null}
            <span className="relative z-10 flex items-center gap-2">
              {tab.label}
              {tab.badge !== undefined ? (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    isActive
                      ? "bg-violet-100 text-violet-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {tab.badge}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

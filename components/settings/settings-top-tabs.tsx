"use client";

import { motion } from "framer-motion";
import type { SettingsTab } from "@/lib/settings/types";
import { SETTINGS_TABS } from "@/lib/settings/types";

export interface SettingsTopTabsProps {
  value: SettingsTab;
  onChange: (tab: SettingsTab) => void;
}

export function SettingsTopTabs({ value, onChange }: SettingsTopTabsProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-1 border-b border-gray-200">
      {SETTINGS_TABS.map((tab) => {
        const isActive = value === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative cursor-pointer px-4 py-3 text-sm font-medium transition-colors ${
              isActive ? "text-violet-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {isActive ? (
              <motion.span
                layoutId="settings-top-tab"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-violet-600"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            ) : null}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

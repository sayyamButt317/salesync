"use client";

import { Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { Button, Card } from "@/components/ui";
import { GENERAL_NAV_ITEMS } from "@/lib/settings/data";
import type { GeneralSection } from "@/lib/settings/types";
import { fadeUp } from "@/lib/motion/variants";

export interface SettingsSidebarProps {
  activeSection: GeneralSection;
  onSectionChange: (section: GeneralSection) => void;
}

export function SettingsSidebar({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45 }}
      className="w-full shrink-0 lg:w-56"
    >
      <nav className="space-y-0.5">
        {GENERAL_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionChange(item.id)}
              className={`flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                isActive
                  ? "bg-violet-50 text-violet-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  isActive ? "text-violet-600" : "text-gray-400"
                }`}
              />
              {item.label}
            </button>
          );
        })}
      </nav>

      <Card className="mt-6 bg-violet-50/50">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100">
            <Headphones className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Need help?</p>
            <p className="mt-0.5 text-xs text-gray-500">
              Our support team is here to assist you.
            </p>
            <Button size="sm" variant="secondary" className="mt-3 w-full">
              Contact Support
            </Button>
          </div>
        </div>
      </Card>
    </motion.aside>
  );
}

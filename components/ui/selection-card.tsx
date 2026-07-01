"use client";

import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useGsapHoverLift } from "@/lib/motion/use-gsap-hover-lift";

export interface SelectionCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export function SelectionCard({
  id,
  title,
  description,
  icon: Icon,
  iconColor = "#7c3aed",
  selected = false,
  onSelect,
}: SelectionCardProps) {
  const liftRef = useGsapHoverLift<HTMLButtonElement>(selected);

  return (
    <motion.button
      ref={liftRef}
      type="button"
      onClick={() => onSelect?.(id)}
      whileTap={{ scale: 0.98 }}
      className={`relative flex w-full cursor-pointer flex-col items-start gap-3 rounded-xl border p-5 text-left transition-colors ${
        selected
          ? "border-violet-400 bg-violet-50 shadow-sm shadow-violet-100"
          : "border-gray-200 bg-white"
      }`}
    >
      <AnimatePresence>
        {selected ? (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className="absolute top-4 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600"
          >
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          </motion.span>
        ) : null}
      </AnimatePresence>

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
          selected ? "bg-violet-100" : "bg-violet-50/60"
        }`}
      >
        <Icon className="h-5 w-5" style={{ color: iconColor }} />
      </div>

      <div className="pr-6">
        <p
          className={`text-sm font-semibold ${
            selected ? "text-violet-700" : "text-gray-900"
          }`}
        >
          {title}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-gray-500">
          {description}
        </p>
      </div>
    </motion.button>
  );
}

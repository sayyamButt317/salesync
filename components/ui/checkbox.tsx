"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  id?: string;
}

export function Checkbox({ checked, onChange, label, id }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="sr-only"
      />
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
          checked
            ? "border-violet-600 bg-violet-600"
            : "border-gray-300 bg-white"
        }`}
      >
        {checked ? (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          >
            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
          </motion.span>
        ) : null}
      </span>
      <span className="text-sm text-gray-600">{label}</span>
    </label>
  );
}

"use client";

import { X, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useGsapLogoPulse } from "@/lib/motion/use-gsap-logo";
import { fadeIn } from "@/lib/motion/variants";

export interface WizardHeaderProps {
  onSaveAndExit?: () => void;
  onClose?: () => void;
}

export function WizardHeader({ onSaveAndExit, onClose }: WizardHeaderProps) {
  const logoRef = useGsapLogoPulse();

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between border-b border-gray-100 px-8 py-5"
    >
      <div className="flex items-center gap-2.5">
        <div
          ref={logoRef}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 shadow-sm shadow-violet-600/25"
        >
          <Zap className="h-5 w-5 fill-white text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-gray-900">
          Salesync
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onSaveAndExit}
          className="cursor-pointer text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          Save &amp; Exit
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </motion.header>
  );
}

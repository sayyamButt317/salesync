"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useGsapHoverLift } from "@/lib/motion/use-gsap-hover-lift";
import { Toggle } from "./toggle";

export interface ChannelCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  enabled?: boolean;
  onToggle?: (enabled: boolean) => void;
  showToggle?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

export function ChannelCard({
  icon,
  title,
  description,
  enabled = true,
  onToggle,
  showToggle = true,
  disabled = false,
  children,
}: ChannelCardProps) {
  const liftRef = useGsapHoverLift<HTMLDivElement>(false);
  const isContentDisabled = showToggle && !enabled;

  return (
    <motion.div
      ref={liftRef}
      layout
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3.5">
          {icon}
          <div>
            <p className="text-sm font-semibold text-gray-900">{title}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
              {description}
            </p>
          </div>
        </div>

        {showToggle && onToggle ? (
          <Toggle
            checked={enabled}
            onChange={onToggle}
            disabled={disabled}
            aria-label={`Toggle ${title}`}
          />
        ) : null}
      </div>

      {children ? (
        <motion.div
          initial={false}
          animate={{
            opacity: isContentDisabled ? 0.45 : 1,
            height: "auto",
          }}
          transition={{ duration: 0.25 }}
          className={`mt-4 ${isContentDisabled ? "pointer-events-none" : ""}`}
        >
          {children}
        </motion.div>
      ) : null}
    </motion.div>
  );
}

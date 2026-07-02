"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  className?: string;
  animate?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  color = "#7c3aed",
  className = "",
  animate = true,
}: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || !animate) return;

    gsap.fromTo(
      bar,
      { width: "0%" },
      { width: `${percent}%`, duration: 0.8, ease: "power2.out", delay: 0.2 },
    );
  }, [percent, animate]);

  return (
    <div
      className={`h-1.5 overflow-hidden rounded-full bg-gray-100 ${className}`}
    >
      <div
        ref={barRef}
        className="h-full rounded-full"
        style={{
          width: animate ? "0%" : `${percent}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}

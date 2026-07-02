"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  animate?: boolean;
}

export function Sparkline({
  data,
  color = "#7c3aed",
  width = 56,
  height = 22,
  animate = true,
}: SparklineProps) {
  const pathRef = useRef<SVGPolylineElement>(null);

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !animate) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.15,
    });

    return () => {
      tween.kill();
    };
  }, [data, animate]);

  return (
    <svg width={width} height={height} className="shrink-0">
      <polyline
        ref={pathRef}
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ChartContainer } from "@/components/ui/chart-container";
import type { PerformanceDataPoint } from "@/lib/client-dashboard/types";
import { PERFORMANCE_SERIES } from "@/lib/client-dashboard/types";
import { fadeUp } from "@/lib/motion/variants";

const CHART_WIDTH = 640;
const CHART_HEIGHT = 220;
const PADDING = { top: 20, right: 20, bottom: 32, left: 36 };

type DataKey = keyof Omit<PerformanceDataPoint, "label">;

function buildPath(data: PerformanceDataPoint[], key: DataKey, maxValue: number) {
  const innerWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const innerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

  const points = data.map((point, index) => {
    const x = PADDING.left + (index / (data.length - 1)) * innerWidth;
    const y =
      PADDING.top + innerHeight - (point[key] / maxValue) * innerHeight;
    return { x, y };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1]?.x} ${PADDING.top + innerHeight} L ${points[0]?.x} ${PADDING.top + innerHeight} Z`;

  return { linePath, areaPath };
}

export interface PerformanceOverviewChartProps {
  data: PerformanceDataPoint[];
}

export function PerformanceOverviewChart({ data }: PerformanceOverviewChartProps) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const areaRef = useRef<SVGPathElement>(null);

  const maxValue = Math.max(
    ...data.flatMap((point) => [
      point.leads,
      point.conversations,
      point.bookings,
      point.deals,
    ]),
  );

  const paths = PERFORMANCE_SERIES.map((series) =>
    buildPath(data, series.dataKey, maxValue),
  );

  const innerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

  useEffect(() => {
    const tweens = pathRefs.current
      .filter(Boolean)
      .map((path) => {
        const length = path!.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        return gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.1,
        });
      });

    const area = areaRef.current;
    if (area) {
      gsap.set(area, { opacity: 0 });
      gsap.to(area, { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.3 });
    }

    return () => {
      tweens.forEach((tween) => tween.kill());
    };
  }, [data]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.1 }}
    >
      <ChartContainer
        title="Performance Overview"
        dropdownLabel="This Week"
        showInfo
      >
        <div className="flex flex-wrap items-center gap-4 border-b border-gray-50 px-5 py-3">
          {PERFORMANCE_SERIES.map((series) => (
            <span
              key={series.id}
              className="inline-flex items-center gap-1.5 text-xs text-gray-600"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: series.color }}
              />
              {series.label}
            </span>
          ))}
        </div>

        <div className="h-56 px-4 py-4">
          <svg
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[0, 0.25, 0.5, 0.75, 1].map((fraction) => (
              <g key={fraction}>
                <line
                  x1={PADDING.left}
                  x2={CHART_WIDTH - PADDING.right}
                  y1={PADDING.top + innerHeight * (1 - fraction)}
                  y2={PADDING.top + innerHeight * (1 - fraction)}
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />
                <text
                  x={PADDING.left - 8}
                  y={PADDING.top + innerHeight * (1 - fraction) + 4}
                  textAnchor="end"
                  className="fill-gray-400 text-[9px]"
                >
                  {Math.round(maxValue * fraction)}
                </text>
              </g>
            ))}

            <path ref={areaRef} d={paths[0]?.areaPath} fill="url(#leadsGradient)" />

            {PERFORMANCE_SERIES.map((series, index) => (
              <path
                key={series.id}
                ref={(el) => {
                  pathRefs.current[index] = el;
                }}
                d={paths[index]?.linePath}
                fill="none"
                stroke={series.color}
                strokeWidth={index === 0 ? 2.5 : 2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {data.map((point, index) => (
              <text
                key={point.label}
                x={
                  PADDING.left +
                  (index / (data.length - 1)) *
                    (CHART_WIDTH - PADDING.left - PADDING.right)
                }
                y={CHART_HEIGHT - 8}
                textAnchor="middle"
                className="fill-gray-400 text-[9px]"
              >
                {point.label.replace("May ", "M")}
              </text>
            ))}
          </svg>
        </div>
      </ChartContainer>
    </motion.div>
  );
}

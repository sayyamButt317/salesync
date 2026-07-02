"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion/variants";

const PREVIEW_METRICS = [
  { label: "Conversations", value: "156", trend: "+12%", color: "#7c3aed" },
  { label: "Replies", value: "86", trend: "+24%", color: "#22c55e" },
  { label: "Deals", value: "12", trend: "+8%", color: "#f97316" },
  { label: "Revenue", value: "$48K", trend: "+22%", color: "#06b6d4" },
];

const NAV_ITEMS = ["Dashboard", "Agencies", "Pitches", "Reports"];

export function DashboardPreview() {
  const chartRef = useRef<SVGPathElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const linePath =
    "M 20 80 Q 60 60 100 65 T 180 40 T 260 50 T 340 25";

  useEffect(() => {
    const path = chartRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power2.out",
      delay: 0.6,
    });

    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const tween = gsap.fromTo(
      preview,
      { opacity: 0, y: 32, rotateX: 8 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.4,
      },
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <motion.div
      ref={previewRef}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="mt-10 overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-2xl shadow-violet-900/10 backdrop-blur-sm"
      style={{ perspective: 1000 }}
    >
      <div className="flex h-52">
        <div className="w-16 shrink-0 border-r border-gray-100 bg-gray-50/80 p-2">
          <div className="mb-3 flex h-6 w-6 items-center justify-center rounded-md bg-violet-600">
            <span className="h-2 w-2 rounded-full bg-white" />
          </div>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item, index) => (
              <li
                key={item}
                className={`rounded-md px-1.5 py-1 text-[7px] font-medium ${
                  index === 0
                    ? "bg-violet-100 text-violet-700"
                    : "text-gray-400"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 flex-1 p-3">
          <div className="grid grid-cols-4 gap-1.5">
            {PREVIEW_METRICS.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-gray-100 bg-white p-1.5"
              >
                <p className="text-[6px] text-gray-400">{metric.label}</p>
                <p className="text-[9px] font-bold text-gray-900">
                  {metric.value}
                </p>
                <p
                  className="text-[6px] font-medium"
                  style={{ color: metric.color }}
                >
                  {metric.trend}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2 flex gap-2">
            <div className="flex-1 rounded-lg border border-gray-100 bg-white p-2">
              <p className="mb-1 text-[7px] font-semibold text-gray-700">
                Conversations
              </p>
              <svg viewBox="0 0 360 90" className="h-14 w-full">
                <defs>
                  <linearGradient id="previewGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={`${linePath} L 340 90 L 20 90 Z`}
                  fill="url(#previewGrad)"
                />
                <path
                  ref={chartRef}
                  d={linePath}
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="w-16 rounded-lg border border-gray-100 bg-white p-2">
              <p className="mb-1 text-[7px] font-semibold text-gray-700">
                Channels
              </p>
              <svg viewBox="0 0 40 40" className="mx-auto h-10 w-10 -rotate-90">
                <circle
                  cx="20"
                  cy="20"
                  r="14"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="6"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="14"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="6"
                  strokeDasharray="44 88"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="14"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="6"
                  strokeDasharray="22 88"
                  strokeDashoffset="-44"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

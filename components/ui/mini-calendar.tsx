"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion/variants";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export interface MiniCalendarProps {
  month: number;
  year: number;
  highlightDay?: number;
  className?: string;
}

export function MiniCalendar({
  month,
  year,
  highlightDay,
  className = "",
}: MiniCalendarProps) {
  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let day = 1; day <= daysInMonth; day++) cells.push(day);

    return cells;
  }, [month, year]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.35, delay: 0.1 }}
      className={`rounded-xl border border-gray-100 bg-gray-50/50 p-3 ${className}`}
    >
      <p className="mb-2 text-center text-xs font-bold text-gray-800">
        {MONTH_NAMES[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {WEEKDAYS.map((day) => (
          <span
            key={day}
            className="py-1 text-[9px] font-semibold text-gray-400"
          >
            {day}
          </span>
        ))}
        {days.map((day, index) => {
          const isHighlighted = day === highlightDay;

          return (
            <span
              key={`${day ?? "empty"}-${index}`}
              className={`flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-medium ${
                day === null
                  ? ""
                  : isHighlighted
                    ? "bg-violet-600 font-bold text-white"
                    : "text-gray-600"
              }`}
            >
              {day ?? ""}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

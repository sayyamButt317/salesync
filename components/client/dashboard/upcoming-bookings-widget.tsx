"use client";

import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import type { UpcomingBooking } from "@/lib/client-dashboard/types";
import { fadeUp, staggerContainer, tableRow } from "@/lib/motion/variants";

export interface UpcomingBookingsWidgetProps {
  bookings: UpcomingBooking[];
}

export function UpcomingBookingsWidget({
  bookings,
}: UpcomingBookingsWidgetProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.25 }}
    >
      <Card padding="none" className="overflow-hidden">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900">Upcoming Bookings</h3>
        </div>
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="divide-y divide-gray-50"
        >
          {bookings.map((booking) => (
            <motion.li
              key={booking.id}
              variants={tableRow}
              className="flex items-center gap-4 px-5 py-3.5"
            >
              <div className="w-12 shrink-0 text-center">
                <p className="text-[10px] font-bold tracking-wider text-violet-600">
                  {booking.dateLabel}
                </p>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {booking.name}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {booking.meetingType}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-xs font-medium text-gray-600">
                  {booking.time}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50">
                  <Calendar className="h-4 w-4 text-violet-600" />
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Card>
    </motion.div>
  );
}

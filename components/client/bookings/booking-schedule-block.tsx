"use client";

import { Calendar, Clock, ExternalLink, MapPin, Timer, Video } from "lucide-react";
import { motion } from "framer-motion";
import { MiniCalendar } from "@/components/ui";
import type { BookingRecord } from "@/lib/client-bookings/types";
import { fadeUp } from "@/lib/motion/variants";

export interface BookingScheduleBlockProps {
  booking: BookingRecord;
}

export function BookingScheduleBlock({ booking }: BookingScheduleBlockProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="mb-5 space-y-3"
    >
      <div className="flex gap-3">
        <div className="flex-1 rounded-xl border border-gray-100 bg-gray-50/60 p-3">
          <div className="mb-3 flex items-start gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100">
              <Calendar className="h-4 w-4 text-violet-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">{booking.date}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-500">
                <Clock className="h-3 w-3" />
                {booking.time}
                {booking.endTime ? ` – ${booking.endTime}` : null}
              </p>
              {booking.duration ? (
                <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-gray-400">
                  <Timer className="h-3 w-3" />
                  {booking.duration}
                </p>
              ) : null}
            </div>
          </div>

          {booking.meetingType === "Video Call" && booking.meetingLink ? (
            <div className="border-t border-gray-100 pt-3">
              <div className="mb-1.5 flex items-center gap-2">
                <Video className="h-3.5 w-3.5 text-violet-600" />
                <span className="text-xs font-semibold text-gray-800">
                  {booking.meetingType}
                </span>
              </div>
              {booking.meetingPlatform ? (
                <p className="mb-1 text-[10px] text-gray-500">
                  via {booking.meetingPlatform}
                </p>
              ) : null}
              <a
                href={booking.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:underline"
              >
                Join Meeting
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
              <MapPin className="h-3.5 w-3.5 text-gray-500" />
              <span className="text-xs font-semibold text-gray-800">
                {booking.meetingType}
              </span>
            </div>
          )}
        </div>

        <MiniCalendar
          month={booking.calendarMonth}
          year={booking.calendarYear}
          highlightDay={booking.calendarDay}
          className="w-36 shrink-0"
        />
      </div>
    </motion.div>
  );
}

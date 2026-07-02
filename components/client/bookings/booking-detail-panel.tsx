"use client";

import {
  Bot,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Avatar,
  BookingLabelBadge,
  BookingStatusBadge,
  Button,
  Card,
  Tabs,
} from "@/components/ui";
import type { BookingDetailTab, BookingRecord } from "@/lib/client-bookings/types";
import { fadeUp, staggerContainer, tableRow } from "@/lib/motion/variants";
import { BookingScheduleBlock } from "./booking-schedule-block";

const DETAIL_TABS = (
  [
    { id: "details", label: "Details" },
    { id: "notes", label: "Notes" },
    { id: "activity", label: "Activity" },
    { id: "files", label: "Files" },
  ] as const
).map((tab) => ({ id: tab.id, label: tab.label }));

export interface BookingDetailPanelProps {
  booking: BookingRecord;
  onClose: () => void;
}

export function BookingDetailPanel({
  booking,
  onClose,
}: BookingDetailPanelProps) {
  const [detailTab, setDetailTab] = useState<BookingDetailTab>("details");

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="w-full shrink-0 xl:w-80 2xl:w-96"
      >
        <Card padding="none" className="sticky top-0 overflow-hidden">
          <div className="border-b border-gray-100 px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar
                  initials={booking.initials}
                  size="lg"
                  color={booking.avatarColor}
                  className="h-12 w-12 text-sm"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-bold text-gray-900">
                      {booking.name}
                    </h2>
                    {booking.label ? (
                      <BookingLabelBadge label={booking.label} />
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {booking.purpose}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="px-3 pt-2">
            <Tabs
              tabs={DETAIL_TABS}
              value={detailTab}
              onChange={setDetailTab}
              layoutId="booking-detail-tab"
            />
          </div>

          <div className="max-h-[calc(100vh-300px)] overflow-y-auto px-5 py-4">
            {detailTab === "details" ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <BookingScheduleBlock booking={booking} />

                <div className="mb-5">
                  <h3 className="mb-3 text-xs font-bold tracking-wide text-gray-400 uppercase">
                    Booking Information
                  </h3>
                  <dl className="space-y-2.5 text-sm">
                    <div className="flex justify-between gap-2">
                      <dt className="text-gray-500">Status</dt>
                      <dd>
                        <BookingStatusBadge status={booking.status} />
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-gray-500">Booked By</dt>
                      <dd className="flex items-center gap-1 font-medium text-gray-800">
                        <Bot className="h-3.5 w-3.5 text-violet-600" />
                        {booking.bookedBy}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-gray-500">Agent</dt>
                      <dd className="flex items-center gap-1 font-medium text-gray-800">
                        <Bot className="h-3.5 w-3.5 text-violet-600" />
                        {booking.agentName}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-gray-500">Source</dt>
                      <dd className="flex items-center gap-1 font-medium text-gray-800">
                        <MessageCircle className="h-3.5 w-3.5 text-green-600" />
                        {booking.source}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-gray-500">Booked On</dt>
                      <dd className="font-medium text-gray-800">
                        {booking.bookedOn}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-gray-500">Time Zone</dt>
                      <dd className="font-medium text-gray-800">
                        {booking.timeZone}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mb-5 border-t border-gray-100 pt-4">
                  <h3 className="mb-3 text-xs font-bold tracking-wide text-gray-400 uppercase">
                    Contact Information
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-gray-400" />
                      {booking.email}
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-gray-400" />
                      {booking.phone}
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-gray-400" />
                      {booking.location}
                    </li>
                  </ul>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h3 className="mb-2 text-xs font-bold tracking-wide text-gray-400 uppercase">
                    Meeting Purpose
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {booking.purposeDescription}
                  </p>
                </div>
              </motion.div>
            ) : detailTab === "notes" ? (
              <p className="py-8 text-center text-sm text-gray-400">
                No notes yet. Add notes to track meeting prep and follow-ups.
              </p>
            ) : detailTab === "files" ? (
              <p className="py-8 text-center text-sm text-gray-400">
                No files attached to this booking.
              </p>
            ) : (
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-3"
              >
                {booking.activities.length > 0 ? (
                  booking.activities.map((activity) => (
                    <motion.li
                      key={activity.id}
                      variants={tableRow}
                      className="relative border-l-2 border-violet-200 pl-4"
                    >
                      <p className="text-xs font-medium text-gray-800">
                        {activity.title}
                      </p>
                      <p className="mt-0.5 text-[10px] text-gray-400">
                        {activity.timestamp}
                      </p>
                    </motion.li>
                  ))
                ) : (
                  <p className="py-8 text-center text-sm text-gray-400">
                    No activity recorded yet.
                  </p>
                )}
              </motion.ul>
            )}
          </div>

          <div className="flex gap-2 border-t border-gray-100 p-4">
            <Button
              variant="secondary"
              className="flex-1 border-violet-200 text-violet-700 hover:border-violet-300 hover:bg-violet-50"
            >
              Reschedule
            </Button>
            <Button
              variant="secondary"
              className="flex-1 border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
            >
              Cancel Booking
            </Button>
          </div>
        </Card>
      </motion.aside>
    </AnimatePresence>
  );
}

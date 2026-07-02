"use client";

import {
  Bot,
  ChevronDown,
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
  Button,
  Card,
  LeadScoreIndicator,
  LeadStatusBadge,
  Tabs,
} from "@/components/ui";
import type { LeadDetailTab, LeadRecord } from "@/lib/client-leads/types";
import { getLeadScoreLevel } from "@/lib/client-leads/types";
import { fadeUp, staggerContainer, tableRow } from "@/lib/motion/variants";

const DETAIL_TABS = (
  [
    { id: "overview", label: "Overview" },
    { id: "profile", label: "Profile" },
    { id: "notes", label: "Notes" },
    { id: "activity", label: "Activity" },
  ] as const
).map((tab) => ({ id: tab.id, label: tab.label }));

export interface LeadDetailPanelProps {
  lead: LeadRecord;
  onClose: () => void;
}

export function LeadDetailPanel({ lead, onClose }: LeadDetailPanelProps) {
  const [detailTab, setDetailTab] = useState<LeadDetailTab>("overview");

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 24 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full shrink-0 xl:w-80 2xl:w-96"
      >
        <Card padding="none" className="sticky top-0 overflow-hidden">
          <div className="border-b border-gray-100 px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar
                  initials={lead.initials}
                  size="lg"
                  color={lead.avatarColor}
                  className="h-12 w-12 text-sm"
                />
                <div>
                  <h2 className="text-sm font-bold text-gray-900">
                    {lead.name}
                  </h2>
                  <LeadStatusBadge status={lead.status} />
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
              layoutId="lead-detail-tab"
            />
          </div>

          <div className="max-h-[calc(100vh-280px)] overflow-y-auto px-5 py-4">
            {detailTab === "overview" || detailTab === "profile" ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <ul className="mb-5 space-y-2.5 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-gray-400" />
                    {lead.email}
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                    {lead.phone}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                    {lead.location}
                  </li>
                </ul>

                <div className="mb-5">
                  <h3 className="mb-2 text-xs font-bold tracking-wide text-gray-400 uppercase">
                    Lead Summary
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {lead.summary}
                  </p>
                </div>

                <dl className="space-y-3 border-t border-gray-100 pt-4 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Source</dt>
                    <dd className="flex items-center gap-1 font-medium text-gray-800">
                      <MessageCircle className="h-3.5 w-3.5 text-green-600" />
                      {lead.source}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Captured By</dt>
                    <dd className="flex items-center gap-1 font-medium text-gray-800">
                      <Bot className="h-3.5 w-3.5 text-violet-600" />
                      {lead.agentName.replace(" Agent", "")}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Captured On</dt>
                    <dd className="font-medium text-gray-800">
                      {lead.capturedOn}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-gray-500">Lead Score</dt>
                    <dd>
                      <LeadScoreIndicator
                        score={lead.leadScore}
                        level={getLeadScoreLevel(lead.leadScore)}
                      />
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Status</dt>
                    <dd>
                      <LeadStatusBadge status={lead.status} />
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Assigned To</dt>
                    <dd className="font-medium text-gray-800">
                      {lead.assignedTo ?? (
                        <button
                          type="button"
                          className="cursor-pointer text-violet-600 hover:underline"
                        >
                          Assign
                        </button>
                      )}
                    </dd>
                  </div>
                </dl>

                {lead.activities.length > 0 ? (
                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <h3 className="mb-3 text-xs font-bold tracking-wide text-gray-400 uppercase">
                      Recent Activity
                    </h3>
                    <motion.ul
                      initial="hidden"
                      animate="visible"
                      variants={staggerContainer}
                      className="space-y-3"
                    >
                      {lead.activities.map((activity) => (
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
                      ))}
                    </motion.ul>
                  </div>
                ) : null}
              </motion.div>
            ) : detailTab === "notes" ? (
              <p className="py-8 text-center text-sm text-gray-400">
                No notes yet. Add a note to track follow-ups.
              </p>
            ) : (
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-3"
              >
                {lead.activities.map((activity) => (
                  <motion.li
                    key={activity.id}
                    variants={tableRow}
                    className="rounded-lg border border-gray-100 p-3"
                  >
                    <p className="text-xs font-medium text-gray-800">
                      {activity.title}
                    </p>
                    <p className="mt-1 text-[10px] text-gray-400">
                      {activity.timestamp}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>

          <div className="flex gap-2 border-t border-gray-100 p-4">
            <Button variant="secondary" className="flex-1">
              Start Conversation
            </Button>
            <Button className="flex-1">
              Convert Lead
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </motion.aside>
    </AnimatePresence>
  );
}

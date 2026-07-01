"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion/variants";

export function PitchTrackerTips() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.3 }}
      className="mt-6 rounded-xl border border-gray-100 bg-white px-5 py-4 text-xs leading-relaxed text-gray-500 shadow-sm"
    >
      <strong className="text-gray-700">
        Pitch Tips for Your WhatsApp Negotiation Agent:
      </strong>
      <ul className="mt-2 list-inside list-disc space-y-1">
        <li>
          <strong className="text-gray-600">Lead with ROI</strong> — agencies
          waste hours negotiating rates with influencers. Your agent automates
          that.
        </li>
        <li>
          <strong className="text-gray-600">LinkedIn first</strong> — connect
          with the CEO, send a short voice note or message before cold-emailing.
        </li>
        <li>
          <strong className="text-gray-600">Verify emails</strong> via
          Hunter.io, Snov.io, or the agency&apos;s website before sending any
          cold outreach.
        </li>
        <li>
          <strong className="text-gray-600">Personalize per region</strong> —
          UAE/Gulf agencies care about Arabic-language negotiation. UK/AUS care
          about GDPR and creator trust.
        </li>
        <li>
          <strong className="text-gray-600">Click &quot;+ Add note&quot;</strong>{" "}
          on any row to track your conversation progress inline.
        </li>
      </ul>
    </motion.div>
  );
}

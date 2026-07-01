"use client";

import { ExternalLink, Globe, Link2 } from "lucide-react";
import { motion } from "framer-motion";
import { CountryBadge, StatusSelect } from "@/components/ui";
import type { Agency, PitchStatus } from "@/lib/pitch-tracker/types";
import { tableRow } from "@/lib/motion/variants";

export interface PitchTrackerRowProps {
  agency: Agency;
  index: number;
  status: PitchStatus;
  note: string;
  isEditingNote: boolean;
  noteDraft: string;
  onStatusChange: (status: PitchStatus) => void;
  onStartEditNote: () => void;
  onNoteDraftChange: (value: string) => void;
  onSaveNote: () => void;
  onCancelEditNote: () => void;
}

export function PitchTrackerRow({
  agency,
  index,
  status,
  note,
  isEditingNote,
  noteDraft,
  onStatusChange,
  onStartEditNote,
  onNoteDraftChange,
  onSaveNote,
  onCancelEditNote,
}: PitchTrackerRowProps) {
  return (
    <motion.tr
      variants={tableRow}
      className="border-b border-gray-50 transition-colors last:border-b-0 hover:bg-gray-50/70"
    >
      <td className="px-4 py-3 text-xs text-gray-400">{index + 1}</td>
      <td className="px-4 py-3">
        <CountryBadge country={agency.country} />
      </td>
      <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">
        {agency.name}
      </td>
      <td className="px-4 py-3">
        <a
          href={agency.ceoLinkedin}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-blue-600 no-underline hover:underline"
        >
          {agency.ceo}
        </a>
      </td>
      <td className="max-w-[180px] px-4 py-3 text-xs text-gray-500">
        {agency.focus}
      </td>
      <td className="px-4 py-3">
        <code className="rounded-md bg-orange-50 px-2 py-0.5 text-[11px] font-medium text-orange-700">
          {agency.emailHint}
        </code>
      </td>
      <td className="whitespace-nowrap px-4 py-3">
        <div className="flex items-center gap-2">
          <a
            href={`https://${agency.website}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 no-underline transition-colors hover:text-violet-600"
          >
            <Globe className="h-3.5 w-3.5" />
            Web
          </a>
          <a
            href={agency.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 no-underline transition-colors hover:text-blue-600"
          >
            <Link2 className="h-3.5 w-3.5" />
            LI
          </a>
        </div>
      </td>
      <td className="px-4 py-3">
        <StatusSelect value={status} onChange={onStatusChange} />
      </td>
      <td className="min-w-[140px] px-4 py-3">
        {isEditingNote ? (
          <div className="flex gap-1.5">
            <input
              autoFocus
              value={noteDraft}
              onChange={(event) => onNoteDraftChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") onSaveNote();
                if (event.key === "Escape") onCancelEditNote();
              }}
              className="w-[110px] rounded-lg border border-gray-200 bg-white px-2 py-1 text-[11px] text-gray-900 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
            />
            <button
              type="button"
              onClick={onSaveNote}
              className="cursor-pointer rounded-lg bg-violet-600 px-2 py-1 text-[11px] font-medium text-white hover:bg-violet-700"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onStartEditNote}
            className={`inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-left text-[11px] font-medium transition-colors hover:text-violet-600 ${
              note ? "text-gray-600" : "text-gray-400"
            }`}
          >
            {note ? (
              <>
                <ExternalLink className="h-3 w-3 shrink-0" />
                <span className="max-w-[120px] truncate">{note}</span>
              </>
            ) : (
              "+ Add note"
            )}
          </button>
        )}
      </td>
    </motion.tr>
  );
}

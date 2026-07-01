"use client";

import type { Agency, PitchStatus } from "@/lib/pitch-tracker/types";
import { PitchTrackerRow } from "./pitch-tracker-row";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion/variants";

const TABLE_HEADERS = [
  "#",
  "Country",
  "Agency",
  "CEO / Founder",
  "Focus",
  "Email Hint",
  "Links",
  "Status",
  "Notes",
] as const;

export interface PitchTrackerTableProps {
  agencies: Agency[];
  statuses: Record<number, PitchStatus | undefined>;
  notes: Record<number, string | undefined>;
  editingNoteId: number | null;
  noteDraft: string;
  onStatusChange: (id: number, status: PitchStatus) => void;
  onStartEditNote: (id: number, currentNote: string) => void;
  onNoteDraftChange: (value: string) => void;
  onSaveNote: (id: number) => void;
  onCancelEditNote: () => void;
}

export function PitchTrackerTable({
  agencies,
  statuses,
  notes,
  editingNoteId,
  noteDraft,
  onStatusChange,
  onStartEditNote,
  onNoteDraftChange,
  onSaveNote,
  onCancelEditNote,
}: PitchTrackerTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header}
                  className="whitespace-nowrap px-4 py-3 text-left text-[10px] font-semibold tracking-wider text-gray-400 uppercase"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <motion.tbody
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {agencies.map((agency, index) => (
              <PitchTrackerRow
                key={agency.id}
                agency={agency}
                index={index}
                status={statuses[agency.id] ?? "Not Contacted"}
                note={notes[agency.id] ?? ""}
                isEditingNote={editingNoteId === agency.id}
                noteDraft={noteDraft}
                onStatusChange={(status) => onStatusChange(agency.id, status)}
                onStartEditNote={() =>
                  onStartEditNote(agency.id, notes[agency.id] ?? "")
                }
                onNoteDraftChange={onNoteDraftChange}
                onSaveNote={() => onSaveNote(agency.id)}
                onCancelEditNote={onCancelEditNote}
              />
            ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}

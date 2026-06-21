import type { Agency, PitchStatus } from "@/lib/pitch-tracker/types";
import { PitchTrackerRow } from "./pitch-tracker-row";

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

interface PitchTrackerTableProps {
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
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-[#1e2a3a] bg-[#0d1520]">
            {TABLE_HEADERS.map((header) => (
              <th
                key={header}
                className="whitespace-nowrap px-3 py-2.5 text-left text-[11px] font-semibold tracking-wider text-slate-500 uppercase"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
}

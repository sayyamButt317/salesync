import {
  COUNTRY_BADGE_STYLES,
  STATUS_COLORS,
  STATUS_OPTIONS,
} from "@/lib/pitch-tracker/constants";
import type { Agency, PitchStatus } from "@/lib/pitch-tracker/types";

interface PitchTrackerRowProps {
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
  const badge = COUNTRY_BADGE_STYLES[agency.country];

  return (
    <tr
      className={`border-b border-[#131927] ${
        index % 2 === 0 ? "bg-[#0a0f1a]" : "bg-[#0d1520]"
      }`}
    >
      <td className="px-3 py-2.5 text-[11px] text-slate-600">{index + 1}</td>
      <td className="px-3 py-2.5">
        <span
          className="rounded-full px-2 py-0.5 text-[11px] font-bold"
          style={{ background: badge.background, color: badge.color }}
        >
          {agency.country}
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-2.5 font-semibold text-slate-200">
        {agency.name}
      </td>
      <td className="px-3 py-2.5 text-slate-400">
        <a
          href={agency.ceoLinkedin}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-blue-400 no-underline hover:underline"
        >
          {agency.ceo}
        </a>
      </td>
      <td className="max-w-[160px] px-3 py-2.5 text-xs text-slate-400">
        {agency.focus}
      </td>
      <td className="px-3 py-2.5">
        <code className="rounded bg-[#1a1200] px-1.5 py-0.5 text-[11px] text-amber-500">
          {agency.emailHint}
        </code>
      </td>
      <td className="whitespace-nowrap px-3 py-2.5">
        <a
          href={`https://${agency.website}`}
          target="_blank"
          rel="noreferrer"
          className="mr-2 text-[11px] text-indigo-300 no-underline hover:underline"
        >
          🌐 Web
        </a>
        <a
          href={agency.linkedin}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] text-sky-400 no-underline hover:underline"
        >
          in LI
        </a>
      </td>
      <td className="px-3 py-2.5">
        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as PitchStatus)
          }
          className="cursor-pointer rounded-md px-2 py-1.5 text-[11px]"
          style={{
            background: "#0d1520",
            border: `1px solid ${STATUS_COLORS[status]}44`,
            color: STATUS_COLORS[status],
          }}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </td>
      <td className="min-w-[140px] px-3 py-2.5">
        {isEditingNote ? (
          <div className="flex gap-1">
            <input
              autoFocus
              value={noteDraft}
              onChange={(event) => onNoteDraftChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") onSaveNote();
                if (event.key === "Escape") onCancelEditNote();
              }}
              className="w-[100px] rounded border border-slate-600 bg-[#0a0f1a] px-1.5 py-1 text-[11px] text-slate-200 outline-none"
            />
            <button
              type="button"
              onClick={onSaveNote}
              className="cursor-pointer rounded bg-indigo-500 px-2 py-1 text-[11px] text-white"
            >
              ✓
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onStartEditNote}
            className={`block max-w-[140px] cursor-pointer truncate border-0 bg-transparent p-0 text-left text-[11px] ${
              note ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {note || "＋ Add note"}
          </button>
        )}
      </td>
    </tr>
  );
}

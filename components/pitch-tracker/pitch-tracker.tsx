"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout";
import { AGENCIES } from "@/lib/pitch-tracker/agencies";
import type {
  CountryFilter,
  PitchStatus,
  PitchTrackerProps,
} from "@/lib/pitch-tracker/types";
import { computeStats, filterAgencies } from "@/lib/pitch-tracker/utils";
import { PitchTrackerFilters } from "./pitch-tracker-filters";
import { PitchTrackerHeader } from "./pitch-tracker-header";
import { PitchTrackerStatsBar } from "./pitch-tracker-stats";
import { PitchTrackerTable } from "./pitch-tracker-table";
import { PitchTrackerTips } from "./pitch-tracker-tips";

const DEFAULT_TITLE = "Influencer Agency Pitch Tracker";
const DEFAULT_SUBTITLE =
  "WhatsApp Negotiation Agent · US · UK · UAE · Australia";

export function PitchTracker({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  agencies = AGENCIES,
  showTips = true,
  activeNavId = "agencies",
}: PitchTrackerProps) {
  const [country, setCountry] = useState<CountryFilter>("All");
  const [search, setSearch] = useState("");
  const [statuses, setStatuses] = useState<
    Record<number, PitchStatus | undefined>
  >({});
  const [notes, setNotes] = useState<Record<number, string | undefined>>({});
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [noteDraft, setNoteDraft] = useState("");

  const filteredAgencies = useMemo(
    () => filterAgencies(agencies, country, search),
    [agencies, country, search],
  );

  const stats = useMemo(
    () => computeStats(agencies, statuses),
    [agencies, statuses],
  );

  const handleStatusChange = (id: number, status: PitchStatus) => {
    setStatuses((previous) => ({ ...previous, [id]: status }));
  };

  const handleStartEditNote = (id: number, currentNote: string) => {
    setEditingNoteId(id);
    setNoteDraft(currentNote);
  };

  const handleSaveNote = (id: number) => {
    setNotes((previous) => ({ ...previous, [id]: noteDraft }));
    setEditingNoteId(null);
    setNoteDraft("");
  };

  const handleCancelEditNote = () => {
    setEditingNoteId(null);
    setNoteDraft("");
  };

  return (
    <AppShell activeNavId={activeNavId}>
      <PitchTrackerHeader title={title} subtitle={subtitle} />
      <PitchTrackerStatsBar stats={stats} />
      <PitchTrackerFilters
        search={search}
        country={country}
        onSearchChange={setSearch}
        onCountryChange={setCountry}
      />
      <PitchTrackerTable
        agencies={filteredAgencies}
        statuses={statuses}
        notes={notes}
        editingNoteId={editingNoteId}
        noteDraft={noteDraft}
        onStatusChange={handleStatusChange}
        onStartEditNote={handleStartEditNote}
        onNoteDraftChange={setNoteDraft}
        onSaveNote={handleSaveNote}
        onCancelEditNote={handleCancelEditNote}
      />
      {showTips ? <PitchTrackerTips /> : null}
    </AppShell>
  );
}

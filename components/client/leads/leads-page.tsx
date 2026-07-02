"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ClientShell } from "@/components/client/layout";
import { LEAD_METRICS, LEAD_RECORDS } from "@/lib/client-leads/data";
import type { LeadSort, LeadTab, LeadsPageProps } from "@/lib/client-leads/types";
import { TOTAL_LEADS_COUNT } from "@/lib/client-leads/types";
import { filterLeads, sortLeads } from "@/lib/client-leads/utils";
import { LeadsHeader } from "./leads-header";
import { LeadsMetrics } from "./leads-metrics";
import { LeadsTable } from "./leads-table";
import { LeadDetailPanel } from "./lead-detail-panel";

export function LeadsPage({ activeNavId = "leads" }: LeadsPageProps) {
  const [tab, setTab] = useState<LeadTab>("all");
  const [headerSearch, setHeaderSearch] = useState("");
  const [tableSearch, setTableSearch] = useState("");
  const [sort, setSort] = useState<LeadSort>("newest");
  const [selectedId, setSelectedId] = useState<string | null>(
    LEAD_RECORDS[0].id,
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const search = headerSearch || tableSearch;

  const filtered = useMemo(() => {
    const results = filterLeads(LEAD_RECORDS, tab, search);
    return sortLeads(results, sort);
  }, [tab, search, sort]);

  const totalItems =
    search || tab !== "all" ? filtered.length : TOTAL_LEADS_COUNT;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  const selectedLead = useMemo(
    () => LEAD_RECORDS.find((lead) => lead.id === selectedId) ?? null,
    [selectedId],
  );

  return (
    <ClientShell activeNavId={activeNavId}>
      <LeadsHeader search={headerSearch} onSearchChange={setHeaderSearch} />
      <LeadsMetrics metrics={LEAD_METRICS} />

      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="min-w-0 flex-1">
          <LeadsTable
            records={paginated}
            tab={tab}
            tableSearch={tableSearch}
            sort={sort}
            selectedId={selectedId}
            page={safePage}
            pageSize={pageSize}
            totalItems={totalItems}
            onTabChange={(nextTab) => {
              setTab(nextTab);
              setPage(1);
            }}
            onTableSearchChange={(value) => {
              setTableSearch(value);
              setPage(1);
            }}
            onSortChange={setSort}
            onSelect={setSelectedId}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          {selectedLead ? (
            <LeadDetailPanel
              key={selectedLead.id}
              lead={selectedLead}
              onClose={() => setSelectedId(null)}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </ClientShell>
  );
}

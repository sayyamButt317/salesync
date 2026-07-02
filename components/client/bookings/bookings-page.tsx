"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ClientShell } from "@/components/client/layout";
import { BOOKING_METRICS, BOOKING_RECORDS } from "@/lib/client-bookings/data";
import type {
  BookingSort,
  BookingTab,
  BookingsPageProps,
} from "@/lib/client-bookings/types";
import { TOTAL_BOOKINGS_COUNT } from "@/lib/client-bookings/types";
import { filterBookings, sortBookings } from "@/lib/client-bookings/utils";
import { BookingsHeader } from "./bookings-header";
import { BookingsMetrics } from "./bookings-metrics";
import { BookingsTable } from "./bookings-table";
import { BookingDetailPanel } from "./booking-detail-panel";

export function BookingsPage({ activeNavId = "bookings" }: BookingsPageProps) {
  const [tab, setTab] = useState<BookingTab>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<BookingSort>("newest");
  const [selectedId, setSelectedId] = useState<string | null>(
    BOOKING_RECORDS[0].id,
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const filtered = useMemo(() => {
    const results = filterBookings(BOOKING_RECORDS, tab, search);
    return sortBookings(results, sort);
  }, [tab, search, sort]);

  const totalItems =
    search || tab !== "all" ? filtered.length : TOTAL_BOOKINGS_COUNT;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  const selectedBooking = useMemo(
    () => BOOKING_RECORDS.find((booking) => booking.id === selectedId) ?? null,
    [selectedId],
  );

  return (
    <ClientShell activeNavId={activeNavId}>
      <BookingsHeader
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />
      <BookingsMetrics metrics={BOOKING_METRICS} />

      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="min-w-0 flex-1">
          <BookingsTable
            records={paginated}
            tab={tab}
            sort={sort}
            selectedId={selectedId}
            page={safePage}
            pageSize={pageSize}
            totalItems={totalItems}
            onTabChange={(nextTab) => {
              setTab(nextTab);
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
          {selectedBooking ? (
            <BookingDetailPanel
              key={selectedBooking.id}
              booking={selectedBooking}
              onClose={() => setSelectedId(null)}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </ClientShell>
  );
}

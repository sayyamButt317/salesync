"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ClientShell } from "@/components/client/layout";
import type {
  BookingSort,
  BookingTab,
  BookingsPageProps,
} from "@/lib/client-bookings/types";
import {
  filterBookings,
  sortBookings,
} from "@/lib/client-bookings/utils";
import {
  buildBookingMetrics,
  normalizeBookings,
} from "@/lib/client-bookings/normalize";
import { useCompanyBookingByIdQuery } from "@/routes/client/query";
import useAuthStore from "@/store/AuthStore/authStore";
import { BookingsHeader } from "./bookings-header";
import { BookingsMetrics } from "./bookings-metrics";
import { BookingsTable } from "./bookings-table";
import { BookingDetailPanel } from "./booking-detail-panel";

export function BookingsPage({ activeNavId = "bookings" }: BookingsPageProps) {
  const companyId = useAuthStore(
    (state) => state.tenant_id || state.company_user_id || state.user_id,
  );

  const {
    data: companyBooking,
    isLoading,
    isError,
    isFetching,
  } = useCompanyBookingByIdQuery(companyId);

  const records = useMemo(
    () => normalizeBookings(companyBooking),
    [companyBooking],
  );
  const metrics = useMemo(() => buildBookingMetrics(records), [records]);

  const [tab, setTab] = useState<BookingTab>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<BookingSort>("newest");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    if (!selectedId && records.length > 0) {
      setSelectedId(records[0].id);
    }
    if (selectedId && !records.some((record) => record.id === selectedId)) {
      setSelectedId(records[0]?.id ?? null);
    }
  }, [records, selectedId]);

  const filtered = useMemo(() => {
    const results = filterBookings(records, tab, search);
    return sortBookings(results, sort);
  }, [records, tab, search, sort]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  const selectedBooking = useMemo(
    () => records.find((booking) => booking.id === selectedId) ?? null,
    [records, selectedId],
  );

  const showLoading = isLoading || (isFetching && records.length === 0);

  return (
    <ClientShell activeNavId={activeNavId}>
      <BookingsHeader
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />
      <BookingsMetrics metrics={metrics} />

      {showLoading ? (
        <div className="rounded-xl border border-gray-100 bg-white px-6 py-16 text-center text-sm text-gray-500">
          Loading bookings…
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-red-100 bg-red-50 px-6 py-16 text-center text-sm text-red-600">
          Couldn’t load bookings. Please refresh and try again.
        </div>
      ) : records.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white px-6 py-16 text-center text-sm text-gray-500">
          No bookings found for this company yet.
        </div>
      ) : (
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
      )}
    </ClientShell>
  );
}

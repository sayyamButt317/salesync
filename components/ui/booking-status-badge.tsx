import type { BookingStatus } from "@/lib/client-bookings/types";

const STATUS_STYLES: Record<BookingStatus, string> = {
  Upcoming: "bg-green-50 text-green-700",
  Completed: "bg-gray-100 text-gray-600",
  Cancelled: "bg-red-50 text-red-600",
};

export interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

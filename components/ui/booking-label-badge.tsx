import type { BookingLabel } from "@/lib/client-bookings/types";

const LABEL_STYLES: Record<BookingLabel, string> = {
  New: "bg-violet-50 text-violet-700",
  Confirmed: "bg-green-50 text-green-700",
};

export interface BookingLabelBadgeProps {
  label: BookingLabel;
}

export function BookingLabelBadge({ label }: BookingLabelBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${LABEL_STYLES[label]}`}
    >
      {label}
    </span>
  );
}

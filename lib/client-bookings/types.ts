import type { LucideIcon } from "lucide-react";

export type BookingTab = "all" | "upcoming" | "completed" | "cancelled";

export type BookingStatus = "Upcoming" | "Completed" | "Cancelled";

export type BookingLabel = "New" | "Confirmed";

export type MeetingType = "Video Call" | "On-Site Visit" | "Phone Call";

export type BookingSource =
  | "WhatsApp"
  | "Instagram"
  | "Website"
  | "Facebook"
  | "Email";

export type BookingDetailTab = "details" | "notes" | "activity" | "files";

export type BookingSort = "newest" | "oldest" | "date";

export type TrendDirection = "up" | "down";

export interface BookingMetric {
  id: string;
  label: string;
  value: number;
  trend: number;
  trendDirection: TrendDirection;
  trendLabel: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  formatValue?: (value: number) => string;
}

export interface BookingActivity {
  id: string;
  title: string;
  timestamp: string;
}

export interface BookingRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  purpose: string;
  purposeDescription: string;
  label?: BookingLabel;
  initials: string;
  avatarColor: string;
  location: string;
  source: BookingSource;
  agentName: string;
  agentRole: string;
  meetingType: MeetingType;
  date: string;
  time: string;
  endTime?: string;
  duration?: string;
  calendarMonth: number;
  calendarYear: number;
  calendarDay: number;
  status: BookingStatus;
  bookedBy: string;
  bookedOn: string;
  timeZone: string;
  meetingLink?: string;
  meetingPlatform?: string;
  activities: BookingActivity[];
}

export interface BookingsPageProps {
  activeNavId?: string;
}

export const BOOKING_TAB_LABELS: Record<BookingTab, { label: string }> = {
  all: { label: "All Bookings" },
  upcoming: { label: "Upcoming" },
  completed: { label: "Completed" },
  cancelled: { label: "Cancelled" },
};

export const TAB_TO_STATUS: Partial<Record<BookingTab, BookingStatus>> = {
  upcoming: "Upcoming",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const TOTAL_BOOKINGS_COUNT = 87;

export const DEFAULT_DATE_RANGE = "May 20, 2025 – May 26, 2025";

import {
  CalendarCheck,
  CalendarX,
  CheckCircle2,
  DollarSign,
} from "lucide-react";
import type {
  BookingLabel,
  BookingMetric,
  BookingRecord,
  BookingSource,
  BookingStatus,
  MeetingType,
} from "./types";

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function pickString(
  source: Record<string, unknown>,
  keys: string[],
  fallback = "",
): string {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) return value;
    if (typeof value === "number") return String(value);
  }
  return fallback;
}

function unwrapList(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  const record = asRecord(data);
  if (!record) return [];

  for (const key of [
    "bookings",
    "data",
    "results",
    "items",
    "records",
    "appointments",
  ]) {
    if (Array.isArray(record[key])) return record[key] as unknown[];
  }

  return [];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function avatarHue(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 48% 48%)`;
}

function parseDate(value: string): Date | null {
  if (!value) return null;
  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) return date;

  // Handle "May 22, 2025" style strings
  const fallback = Date.parse(value);
  if (!Number.isNaN(fallback)) return new Date(fallback);
  return null;
}

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDisplayTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function formatBookedOn(value: string): string {
  const date = parseDate(value);
  if (!date) return value || "—";
  return `${formatDisplayDate(date)} · ${formatDisplayTime(date)}`;
}

function resolveStatus(raw: string): BookingStatus {
  const value = raw.toLowerCase().trim();
  if (
    ["cancelled", "canceled", "cancel", "rejected", "no_show", "noshow"].includes(
      value,
    )
  ) {
    return "Cancelled";
  }
  if (
    ["completed", "done", "finished", "past", "closed", "attended"].includes(
      value,
    )
  ) {
    return "Completed";
  }
  // scheduled / confirmed / pending / upcoming
  return "Upcoming";
}

function resolveLabel(raw: string, status: BookingStatus): BookingLabel | undefined {
  const value = raw.toLowerCase().trim();
  if (["new", "fresh"].includes(value)) return "New";
  if (
    ["confirmed", "confirm", "booked", "scheduled", "pending"].includes(value)
  ) {
    return "Confirmed";
  }
  if (status === "Upcoming") return "Confirmed";
  return undefined;
}

function resolveSource(raw: string): BookingSource {
  const value = raw.toLowerCase().trim();
  if (value.includes("whatsapp") || value.includes("wa")) return "WhatsApp";
  if (value.includes("instagram") || value.includes("ig")) return "Instagram";
  if (value.includes("facebook") || value.includes("fb")) return "Facebook";
  if (value.includes("email") || value.includes("mail")) return "Email";
  if (value.includes("web") || value.includes("site")) return "Website";
  return "WhatsApp";
}

function resolveMeetingType(raw: string): MeetingType {
  const value = raw.toLowerCase().trim();
  if (
    value.includes("site") ||
    value.includes("visit") ||
    value.includes("in-person") ||
    value.includes("office")
  ) {
    return "On-Site Visit";
  }
  if (value.includes("phone")) return "Phone Call";
  return "Video Call";
}

function formatTimeString(timeRaw: string): string {
  const match = timeRaw.trim().match(/^(\d{1,2}):(\d{2})(?::\d{2})?/);
  if (!match) return timeRaw;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return timeRaw;

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return formatDisplayTime(date);
}

function combineDateAndTime(dateRaw: string, timeRaw: string): Date | null {
  const dateOnly = parseDate(dateRaw);
  if (!dateOnly) return null;

  const match = timeRaw.trim().match(/^(\d{1,2}):(\d{2})(?::\d{2})?/);
  if (!match) return dateOnly;

  const combined = new Date(dateOnly);
  combined.setHours(Number(match[1]), Number(match[2]), 0, 0);
  return combined;
}

function mapBooking(entry: unknown, index: number): BookingRecord {
  const item = asRecord(entry) ?? {};

  const name = pickString(
    item,
    [
      "customer_name",
      "client_name",
      "contact_name",
      "username",
      "full_name",
      "lead_name",
      "name",
    ],
    `Booking ${index + 1}`,
  );

  const dateRaw = pickString(item, [
    "appointment_date",
    "booking_date",
    "scheduled_date",
    "date",
  ]);
  const timeRaw = pickString(item, [
    "appointment_time",
    "booking_time",
    "scheduled_time",
    "start_time_local",
    "time",
  ]);
  const startRaw = pickString(item, [
    "start_time",
    "appointment_at",
    "scheduled_at",
    "booking_datetime",
    "datetime",
    "date_time",
    "starts_at",
  ]);
  const endRaw = pickString(item, [
    "end_time",
    "ends_at",
    "appointment_end",
    "end_datetime",
  ]);
  const createdRaw = pickString(item, [
    "created_at",
    "booked_on",
    "booked_at",
    "updated_at",
  ]);

  const startDate =
    combineDateAndTime(dateRaw, timeRaw) ||
    parseDate(startRaw) ||
    parseDate(dateRaw);

  const endDate = parseDate(endRaw);
  const statusRaw = pickString(item, [
    "status",
    "booking_status",
    "state",
    "appointment_status",
  ]);
  const status = resolveStatus(statusRaw);
  const label = resolveLabel(statusRaw, status);

  const service = pickString(
    item,
    ["service", "service_name", "treatment", "purpose", "title", "subject"],
    "Consultation",
  );

  return {
    id: pickString(
      item,
      ["id", "booking_id", "_id", "appointment_id", "uuid"],
      `booking-${index}`,
    ),
    name,
    email: pickString(item, ["email", "customer_email", "client_email"]) || "—",
    phone:
      pickString(item, [
        "customer_phone",
        "phone",
        "phone_number",
        "mobile",
        "wa_id",
        "client_phone",
      ]) || "—",
    service,
    purpose: service,
    purposeDescription: pickString(
      item,
      [
        "purpose_description",
        "description",
        "notes",
        "note",
        "details",
        "summary",
        "message",
      ],
      service,
    ),
    label,
    initials: getInitials(name),
    avatarColor: avatarHue(name),
    location: pickString(
      item,
      ["location", "city", "address", "place", "branch", "clinic"],
      "—",
    ),
    source: resolveSource(
      pickString(item, ["source", "channel", "platform", "origin"]),
    ),
    agentName: pickString(
      item,
      [
        "companyname",
        "company_name",
        "agent_name",
        "agent",
        "ai_agent",
        "assigned_agent",
        "bot_name",
      ],
      "AI Agent",
    ),
    agentRole: pickString(item, ["agent_role", "role"], "Scheduling"),
    meetingType: resolveMeetingType(
      pickString(item, [
        "meeting_type",
        "appointment_type",
        "type",
        "mode",
        "meeting_mode",
      ]),
    ),
    date: startDate ? formatDisplayDate(startDate) : dateRaw || "—",
    time: timeRaw
      ? formatTimeString(timeRaw)
      : startDate
        ? formatDisplayTime(startDate)
        : "—",
    endTime: endDate ? formatDisplayTime(endDate) : undefined,
    duration: pickString(item, ["duration", "duration_minutes"])
      ? `${pickString(item, ["duration", "duration_minutes"])}${
          /^\d+$/.test(pickString(item, ["duration", "duration_minutes"]))
            ? " min"
            : ""
        }`
      : undefined,
    calendarMonth: startDate?.getMonth() ?? 0,
    calendarYear: startDate?.getFullYear() ?? new Date().getFullYear(),
    calendarDay: startDate?.getDate() ?? 1,
    status,
    bookedBy: pickString(
      item,
      ["booked_by", "created_by", "booked_by_name", "companyname", "company_name"],
      "AI Agent",
    ),
    bookedOn: formatBookedOn(createdRaw || startRaw || dateRaw),
    timeZone: pickString(item, ["timezone", "time_zone", "tz"], "Local"),
    meetingLink:
      pickString(item, [
        "meeting_link",
        "link",
        "join_url",
        "video_link",
        "meet_link",
      ]) || undefined,
    meetingPlatform:
      pickString(item, ["meeting_platform", "platform", "video_platform"]) ||
      undefined,
    activities: [],
  };
}

export function normalizeBookings(data: unknown): BookingRecord[] {
  return unwrapList(data).map((entry, index) => mapBooking(entry, index));
}

export function buildBookingMetrics(records: BookingRecord[]): BookingMetric[] {
  const upcoming = records.filter((r) => r.status === "Upcoming").length;
  const completed = records.filter((r) => r.status === "Completed").length;
  const cancelled = records.filter((r) => r.status === "Cancelled").length;

  return [
    {
      id: "total",
      label: "Total Bookings",
      value: records.length,
      trend: 0,
      trendDirection: "up",
      trendLabel: "from API",
      icon: CalendarCheck,
      iconBg: "#ede9fe",
      iconColor: "#7c3aed",
    },
    {
      id: "upcoming",
      label: "Upcoming",
      value: upcoming,
      trend: 0,
      trendDirection: "up",
      trendLabel: "from API",
      icon: CalendarCheck,
      iconBg: "#dcfce7",
      iconColor: "#22c55e",
    },
    {
      id: "completed",
      label: "Completed",
      value: completed,
      trend: 0,
      trendDirection: "up",
      trendLabel: "from API",
      icon: CheckCircle2,
      iconBg: "#ffedd5",
      iconColor: "#f97316",
    },
    {
      id: "cancelled",
      label: "Cancelled",
      value: cancelled,
      trend: 0,
      trendDirection: "down",
      trendLabel: "from API",
      icon: CalendarX,
      iconBg: "#fce7f3",
      iconColor: "#ec4899",
    },
    {
      id: "revenue",
      label: "Active Pipeline",
      value: upcoming,
      trend: 0,
      trendDirection: "up",
      trendLabel: "upcoming bookings",
      icon: DollarSign,
      iconBg: "#dbeafe",
      iconColor: "#3b82f6",
    },
  ];
}

export function bookingSortTimestamp(record: BookingRecord): number {
  return new Date(
    record.calendarYear,
    record.calendarMonth,
    record.calendarDay,
  ).getTime();
}

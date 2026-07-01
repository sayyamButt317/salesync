import type { BusinessHoursOption } from "./channels";

export const COUNTRY_CODES = [
  { value: "+1", label: "+1", region: "US" },
  { value: "+44", label: "+44", region: "UK" },
  { value: "+971", label: "+971", region: "UAE" },
  { value: "+61", label: "+61", region: "AU" },
] as const;

export const BUSINESS_HOURS_OPTIONS: {
  value: BusinessHoursOption;
  label: string;
}[] = [
  { value: "24/7", label: "24/7" },
  { value: "business-hours", label: "Business Hours (9 AM – 5 PM)" },
  { value: "weekdays-only", label: "Weekdays Only" },
  { value: "custom", label: "Custom Schedule" },
];

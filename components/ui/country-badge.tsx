import type { AgencyCountry } from "@/lib/pitch-tracker/types";

const COUNTRY_STYLES: Record<AgencyCountry, string> = {
  USA: "bg-blue-50 text-blue-700",
  UK: "bg-emerald-50 text-emerald-700",
  UAE: "bg-orange-50 text-orange-700",
  Australia: "bg-purple-50 text-purple-700",
};

export interface CountryBadgeProps {
  country: AgencyCountry;
}

export function CountryBadge({ country }: CountryBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ${COUNTRY_STYLES[country]}`}
    >
      {country}
    </span>
  );
}

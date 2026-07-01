export type PitchStatus =
  | "Not Contacted"
  | "Pitched"
  | "Replied"
  | "Meeting Booked"
  | "Closed"
  | "Not Interested";

export type AgencyCountry = "USA" | "UK" | "UAE" | "Australia";

export interface Agency {
  id: number;
  country: AgencyCountry;
  name: string;
  ceo: string;
  website: string;
  linkedin: string;
  ceoLinkedin: string;
  emailHint: string;
  focus: string;
  size: string;
}

export interface PitchTrackerStats {
  total: number;
  pitched: number;
  replied: number;
  closed: number;
}

export type CountryFilter = "All" | AgencyCountry;

export interface PitchTrackerProps {
  title?: string;
  subtitle?: string;
  agencies?: Agency[];
  showTips?: boolean;
  activeNavId?: string;
}

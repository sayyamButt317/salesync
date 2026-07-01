import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  Handshake,
  Home,
  Puzzle,
  Star,
  UserPlus,
} from "lucide-react";
import type { AgentTypeId } from "./types";

export interface AgentTypeOption {
  id: AgentTypeId;
  label: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
}

const VIOLET = "#7c3aed";
const ORANGE = "#f97316";

export const AGENT_TYPE_OPTIONS: AgentTypeOption[] = [
  {
    id: "real-estate",
    label: "Real Estate Agent",
    description:
      "Handle property inquiries, schedule viewings, and close deals.",
    icon: Home,
    iconColor: VIOLET,
  },
  {
    id: "negotiation",
    label: "Negotiation Agent",
    description:
      "Negotiate better deals and terms on behalf of your business.",
    icon: Handshake,
    iconColor: VIOLET,
  },
  {
    id: "booking",
    label: "Booking Agent",
    description:
      "Handle bookings, appointments, and scheduling automatically.",
    icon: Calendar,
    iconColor: VIOLET,
  },
  {
    id: "lead-generation",
    label: "Lead Generation Agent",
    description: "Capture, qualify, and nurture leads for your business.",
    icon: UserPlus,
    iconColor: VIOLET,
  },
  {
    id: "ugc",
    label: "UGC Agent",
    description:
      "Collect user generated content and reviews for your brand.",
    icon: Star,
    iconColor: ORANGE,
  },
  {
    id: "custom",
    label: "Custom Agent",
    description: "Build a custom agent tailored to your specific needs.",
    icon: Puzzle,
    iconColor: VIOLET,
  },
];

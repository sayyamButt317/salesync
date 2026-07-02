import {
  CheckSquare,
  FileText,
  Layers,
  MessageCircle,
  Send,
  Timer,
} from "lucide-react";
import type { TemplateRecord, TemplateType, TemplateTypeTheme } from "./types";

export const TEMPLATE_TYPE_THEME: Record<TemplateType, TemplateTypeTheme> = {
  message: {
    label: "MESSAGE",
    icon: MessageCircle,
    iconBg: "#dcfce7",
    iconColor: "#22c55e",
    labelColor: "#16a34a",
    tagBg: "#f0fdf4",
    tagText: "#15803d",
  },
  pitch: {
    label: "PITCH",
    icon: Send,
    iconBg: "#dbeafe",
    iconColor: "#3b82f6",
    labelColor: "#2563eb",
    tagBg: "#eff6ff",
    tagText: "#1d4ed8",
  },
  "follow-up": {
    label: "FOLLOW UP",
    icon: Timer,
    iconBg: "#ede9fe",
    iconColor: "#7c3aed",
    labelColor: "#7c3aed",
    tagBg: "#f5f3ff",
    tagText: "#6d28d9",
  },
  task: {
    label: "TASK",
    icon: CheckSquare,
    iconBg: "#ffedd5",
    iconColor: "#f97316",
    labelColor: "#ea580c",
    tagBg: "#fff7ed",
    tagText: "#c2410c",
  },
};

export const TEMPLATE_RECORDS: TemplateRecord[] = [
  {
    id: "1",
    type: "message",
    title: "Introduction Message",
    description:
      "A warm opening message for first-time outreach to agency contacts via WhatsApp or email.",
    tags: ["WhatsApp", "Cold Outreach"],
    updatedAt: "Jun 18, 2025",
    authorInitials: "SJ",
    isFavorite: true,
  },
  {
    id: "2",
    type: "pitch",
    title: "WhatsApp Agent Pitch",
    description:
      "Highlight automation benefits, time savings, and creator outreach capabilities for agencies.",
    tags: ["Pitch", "Automation"],
    updatedAt: "Jun 17, 2025",
    authorInitials: "SJ",
    isFavorite: false,
  },
  {
    id: "3",
    type: "follow-up",
    title: "No Reply Follow Up",
    description:
      "Gentle nudge for contacts who haven't responded within 3–5 business days.",
    tags: ["Follow Up", "WhatsApp"],
    updatedAt: "Jun 16, 2025",
    authorInitials: "AM",
    isFavorite: false,
  },
  {
    id: "4",
    type: "task",
    title: "Demo Preparation Checklist",
    description:
      "Standard task template for preparing and scheduling product demos with prospects.",
    tags: ["Demo", "Sales"],
    updatedAt: "Jun 15, 2025",
    authorInitials: "SJ",
    isFavorite: true,
  },
  {
    id: "5",
    type: "message",
    title: "Meeting Confirmation",
    description:
      "Confirm scheduled calls with date, time, and agenda details for agency meetings.",
    tags: ["Email", "Scheduling"],
    updatedAt: "Jun 14, 2025",
    authorInitials: "AM",
    isFavorite: false,
  },
  {
    id: "6",
    type: "pitch",
    title: "Enterprise Rate Card",
    description:
      "Professional pitch template for enterprise-tier pricing and custom package proposals.",
    tags: ["Enterprise", "Pricing"],
    updatedAt: "Jun 13, 2025",
    authorInitials: "SJ",
    isFavorite: false,
  },
  {
    id: "7",
    type: "follow-up",
    title: "Post-Demo Follow Up",
    description:
      "Send after a successful demo to recap key points and propose next steps.",
    tags: ["Demo", "Follow Up"],
    updatedAt: "Jun 12, 2025",
    authorInitials: "SJ",
    isFavorite: true,
  },
  {
    id: "8",
    type: "task",
    title: "Contract Review Task",
    description:
      "Task template for legal and sales review of agency partnership agreements.",
    tags: ["Legal", "Contract"],
    updatedAt: "Jun 11, 2025",
    authorInitials: "AM",
    isFavorite: false,
  },
  {
    id: "9",
    type: "message",
    title: "Rate Negotiation Reply",
    description:
      "Respond to pricing questions with flexible options and value justification.",
    tags: ["WhatsApp", "Negotiation"],
    updatedAt: "Jun 10, 2025",
    authorInitials: "SJ",
    isFavorite: false,
  },
  {
    id: "10",
    type: "pitch",
    title: "TikTok Automation Pitch",
    description:
      "Pitch deck outline for TikTok creator outreach and UGC campaign automation.",
    tags: ["TikTok", "UGC"],
    updatedAt: "Jun 9, 2025",
    authorInitials: "AM",
    isFavorite: false,
  },
  {
    id: "11",
    type: "follow-up",
    title: "Proposal Sent Reminder",
    description:
      "Follow up after sending a proposal to check in and answer questions.",
    tags: ["Proposal", "Email"],
    updatedAt: "Jun 8, 2025",
    authorInitials: "SJ",
    isFavorite: false,
  },
  {
    id: "12",
    type: "task",
    title: "Onboarding Kickoff",
    description:
      "Task list for new agency onboarding including setup, training, and go-live.",
    tags: ["Onboarding", "Client Success"],
    updatedAt: "Jun 7, 2025",
    authorInitials: "AM",
    isFavorite: true,
  },
];

export { TEMPLATE_METRICS } from "./metrics";
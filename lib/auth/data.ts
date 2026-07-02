import { BarChart3, MessageSquare, Target } from "lucide-react";
import type { AuthFeature, SocialAuthProvider } from "./types";

export const AUTH_FEATURES: AuthFeature[] = [
  {
    id: "conversations",
    title: "Smart Conversations",
    description:
      "Manage WhatsApp, email, and social outreach from one unified inbox.",
    icon: MessageSquare,
  },
  {
    id: "deals",
    title: "Close More Deals",
    description:
      "Track pitches, follow-ups, and deals with AI-powered automation.",
    icon: Target,
  },
  {
    id: "insights",
    title: "Actionable Insights",
    description:
      "Real-time reports on reply rates, channels, and campaign performance.",
    icon: BarChart3,
  },
];

export const SOCIAL_AUTH_PROVIDERS: SocialAuthProvider[] = [
  { id: "google", label: "Continue with Google", icon: "google" },
  { id: "microsoft", label: "Continue with Microsoft", icon: "microsoft" },
];

export const LOGIN_DEFAULTS = {
  email: "",
  password: "",
  rememberMe: false,
};

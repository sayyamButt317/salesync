import type { LucideIcon } from "lucide-react";

export type EmployeeId = "reputation" | "real-estate" | "clinic";

export type LeadTemperature = "HOT" | "WARM" | "COLD";

export type ReviewSentiment = "Negative" | "Neutral" | "Positive";

export interface WorkflowStep {
  id: string;
  label: string;
}

export interface BusinessProcessStep {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

export interface AiEmployee {
  id: EmployeeId;
  emoji: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  painPoint: string;
  outcome: string;
  workflowSummary: string;
  workflow: WorkflowStep[];
  processSteps: BusinessProcessStep[];
  youGet: string[];
  withoutAgent: string;
  withAgent: string;
  gradient: string;
  accentColor: string;
}

export interface HowItWorksStep {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

export interface EmployeeCapability {
  id: string;
  emoji: string;
  label: string;
  description: string;
}

export interface ReputationReviewExample {
  rating: number;
  maxRating: number;
  sentiment: ReviewSentiment;
  issue: string;
  urgency: string;
  intent: string;
  humanApproval: boolean;
  aiReply: string;
  whyItMatters: string;
  recommendedAction: string;
  whatsappAlertSent: boolean;
  recurringInsight: string;
}

export interface LeadField {
  id: string;
  label: string;
  value: string;
}

export interface AiAction {
  id: string;
  label: string;
  completed: boolean;
}

export interface RealEstateLeadExample {
  contactName: string;
  source: string;
  employeeName: string;
  temperature: LeadTemperature;
  score: number;
  fields: LeadField[];
  actions: AiAction[];
  headline: string;
}

export interface ClinicLeadExample {
  contactName: string;
  source: string;
  employeeName: string;
  intent: string;
  treatment: string;
  location: string;
  preferredDate: string;
  temperature: LeadTemperature;
  score: number;
  detectedSignals: string[];
  aiRecommendation: string;
  notificationPreview: string;
}

export interface AgentsPageProps {
  signInHref?: string;
  getStartedHref?: string;
}

import type { WizardStep } from "./types";

export const WIZARD_STEPS: WizardStep[] = [
  { id: 1, key: "businessDetails", label: "Business Details" },
  { id: 2, key: "niches", label: "Select Niches" },
  { id: 3, key: "agentType", label: "Agent Type" },
  { id: 4, key: "channel", label: "Channel & Contact" },
  { id: 5, key: "integrations", label: "Integrations (Optional)" },
  { id: 6, key: "review", label: "Review & Confirm" },
];

export const WIZARD_TITLE = "Create New Agent";
export const DESCRIPTION_MAX_LENGTH = 1000;

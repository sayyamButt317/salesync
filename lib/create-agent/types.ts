export interface BusinessDetails {
  brandName: string;
  description: string;
  website: string;
}

export interface NicheSelection {
  popular: string[];
  custom: string[];
}

export type AgentTypeId =
  | "real-estate"
  | "negotiation"
  | "booking"
  | "lead-generation"
  | "ugc"
  | "custom";

export type { ChannelContact, ChannelContactErrors } from "./channels";
export type { BusinessHoursOption } from "./channels";
export type {
  IntegrationsConfig,
  SocialPlatformId,
  CrmToolId,
} from "./integrations";

import type { ChannelContact } from "./channels";
import type { IntegrationsConfig } from "./integrations";
import { INITIAL_INTEGRATIONS } from "./integrations";

export interface AgentWizardFormData {
  businessDetails: BusinessDetails;
  niches: NicheSelection;
  agentType: AgentTypeId | null;
  channels: ChannelContact;
  integrations: IntegrationsConfig;
}

export interface WizardStep {
  id: number;
  key: keyof AgentWizardFormData | "niches" | "agentType" | "channel" | "integrations" | "review";
  label: string;
  optional?: boolean;
}

export interface CreateAgentWizardProps {
  onSaveAndExit?: (data: AgentWizardFormData) => void;
  onComplete?: (data: AgentWizardFormData) => void;
  onClose?: () => void;
}

export const INITIAL_FORM_DATA: AgentWizardFormData = {
  businessDetails: {
    brandName: "",
    description: "",
    website: "",
  },
  niches: {
    popular: [],
    custom: [],
  },
  agentType: null,
  channels: {
    whatsapp: { enabled: true, countryCode: "+1", number: "" },
    email: { enabled: true, address: "" },
    phone: { enabled: false, countryCode: "+1", number: "" },
    businessHours: "24/7",
  },
  integrations: INITIAL_INTEGRATIONS,
};

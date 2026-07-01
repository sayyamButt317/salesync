import { AGENT_TYPE_OPTIONS } from "./agent-types";
import { CRM_TOOLS, SOCIAL_PLATFORMS } from "./integration-constants";
import { POPULAR_NICHES } from "./niches";
import type { AgentWizardFormData } from "./types";
import type { SocialPlatformId } from "./integrations";

export interface AgentSummaryChannel {
  id: string;
  label: string;
  value: string;
}

export interface AgentSummarySocial {
  id: SocialPlatformId;
  label: string;
}

export interface AgentSummary {
  brandName: string;
  description: string;
  nicheLabels: string[];
  agentTypeLabel: string;
  channels: AgentSummaryChannel[];
  socialAccounts: AgentSummarySocial[];
  crmToolLabel: string | null;
}

const NICHE_LABEL_MAP = Object.fromEntries(
  POPULAR_NICHES.map((niche) => [niche.id, niche.label]),
);

export function buildAgentSummary(data: AgentWizardFormData): AgentSummary {
  const popularLabels = data.niches.popular.map(
    (id) => NICHE_LABEL_MAP[id] ?? id,
  );
  const nicheLabels = [...popularLabels, ...data.niches.custom];

  const agentTypeLabel =
    AGENT_TYPE_OPTIONS.find((option) => option.id === data.agentType)?.label ??
    "—";

  const channels: AgentSummaryChannel[] = [];

  if (data.channels.whatsapp.enabled && data.channels.whatsapp.number) {
    channels.push({
      id: "whatsapp",
      label: "WhatsApp",
      value: `${data.channels.whatsapp.countryCode} ${data.channels.whatsapp.number}`,
    });
  }

  if (data.channels.email.enabled && data.channels.email.address) {
    channels.push({
      id: "email",
      label: "Email",
      value: data.channels.email.address,
    });
  }

  if (data.channels.phone.enabled && data.channels.phone.number) {
    channels.push({
      id: "phone",
      label: "Phone",
      value: `${data.channels.phone.countryCode} ${data.channels.phone.number}`,
    });
  }

  const socialAccounts = SOCIAL_PLATFORMS.filter(
    (platform) => data.integrations.social[platform.id],
  ).map((platform) => ({
    id: platform.id,
    label: platform.label,
  }));

  const crmToolLabel =
    CRM_TOOLS.find((tool) => tool.id === data.integrations.crmTool)?.label ??
    null;

  return {
    brandName: data.businessDetails.brandName || "—",
    description: data.businessDetails.description || "—",
    nicheLabels,
    agentTypeLabel,
    channels,
    socialAccounts,
    crmToolLabel:
      data.integrations.crmTool && crmToolLabel !== "Select tool to connect"
        ? crmToolLabel
        : null,
  };
}

export function formatNicheTags(
  labels: string[],
  visibleCount = 3,
): { visible: string[]; overflow: number } {
  if (labels.length <= visibleCount) {
    return { visible: labels, overflow: 0 };
  }

  return {
    visible: labels.slice(0, visibleCount),
    overflow: labels.length - visibleCount,
  };
}

import type { CrmToolId, SocialPlatformId } from "@/lib/create-agent/integrations";

export type WorkspaceProviderId = "google" | "microsoft";

export interface IntegrationCardItem {
  id: string;
  name: string;
  description: string;
}

export const SOCIAL_INTEGRATION_CARDS: IntegrationCardItem[] = [
  {
    id: "instagram",
    name: "Instagram",
    description: "Engage followers and DMs from Instagram.",
  },
  {
    id: "facebook",
    name: "Facebook Page",
    description: "Manage Page messages and comments.",
  },
  {
    id: "linkedin",
    name: "LinkedIn Page",
    description: "Connect your company LinkedIn presence.",
  },
  {
    id: "tiktok",
    name: "TikTok",
    description: "Reach audiences through TikTok messaging.",
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "Connect your YouTube channel for outreach.",
  },
];

export const CRM_INTEGRATION_CARDS: IntegrationCardItem[] = [
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Sync contacts, deals, and pipelines.",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Keep CRM records updated automatically.",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Automate workflows across your stack.",
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    description: "Track deals and sales activity.",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Push notes and lead data into Notion.",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Get alerts and handoffs in Slack.",
  },
];

export const WORKSPACE_INTEGRATION_CARDS: IntegrationCardItem[] = [
  {
    id: "google",
    name: "Google Business Profile",
    description: "Connect Google for reviews and business listings.",
  },
  {
    id: "microsoft",
    name: "Microsoft 365",
    description: "Connect Outlook, Teams, and Microsoft accounts.",
  },
];

export function isSocialPlatformId(id: string): id is SocialPlatformId {
  return ["instagram", "facebook", "linkedin", "tiktok", "youtube"].includes(
    id,
  );
}

export function isCrmToolId(id: string): id is Exclude<CrmToolId, ""> {
  return [
    "hubspot",
    "salesforce",
    "zapier",
    "pipedrive",
    "notion",
    "slack",
  ].includes(id);
}

export function isWorkspaceProviderId(id: string): id is WorkspaceProviderId {
  return id === "google" || id === "microsoft";
}

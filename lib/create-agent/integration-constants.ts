import type { CrmToolId, SocialPlatformId } from "./integrations";

export interface SocialPlatformOption {
  id: SocialPlatformId;
  label: string;
}

export interface CrmToolOption {
  id: CrmToolId;
  label: string;
}

export const SOCIAL_PLATFORMS: SocialPlatformOption[] = [
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook Page" },
  { id: "linkedin", label: "LinkedIn Page" },
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
];

export const CRM_TOOLS: CrmToolOption[] = [
  { id: "", label: "Select tool to connect" },
  { id: "hubspot", label: "HubSpot" },
  { id: "salesforce", label: "Salesforce" },
  { id: "zapier", label: "Zapier" },
  { id: "pipedrive", label: "Pipedrive" },
  { id: "notion", label: "Notion" },
  { id: "slack", label: "Slack" },
];

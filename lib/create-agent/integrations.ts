export type SocialPlatformId =
  | "instagram"
  | "facebook"
  | "linkedin"
  | "tiktok"
  | "youtube";

export type CrmToolId =
  | ""
  | "hubspot"
  | "salesforce"
  | "zapier"
  | "pipedrive"
  | "notion"
  | "slack";

export interface IntegrationsConfig {
  social: Record<SocialPlatformId, boolean>;
  crmTool: CrmToolId;
}

export const INITIAL_INTEGRATIONS: IntegrationsConfig = {
  social: {
    instagram: false,
    facebook: false,
    linkedin: false,
    tiktok: false,
    youtube: false,
  },
  crmTool: "",
};

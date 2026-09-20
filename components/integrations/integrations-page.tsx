"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/layout";
import { SocialPlatformIcon } from "@/components/create-agent/platform-icons";
import type {
  CrmToolId,
  SocialPlatformId,
} from "@/lib/create-agent/integrations";
import {
  CRM_INTEGRATION_CARDS,
  SOCIAL_INTEGRATION_CARDS,
  WORKSPACE_INTEGRATION_CARDS,
  isCrmToolId,
  isSocialPlatformId,
  isWorkspaceProviderId,
  type WorkspaceProviderId,
} from "@/lib/integrations/data";
import type { IntegrationsPageProps } from "@/lib/integrations/types";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { IntegrationCard } from "./integration-card";
import { IntegrationSection } from "./integration-section";
import { IntegrationsPageHeader } from "./integrations-page-header";
import {
  CrmToolIcon,
  WorkspaceProviderIcon,
} from "./provider-icons";
import { useConnectGoogleBusinessAccountQuery } from "@/routes/client/query";

function resolveRedirectUrl(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;
  for (const key of [
    "url",
    "auth_url",
    "authUrl",
    "redirect_url",
    "redirectUrl",
    "authorization_url",
    "authorizationUrl",
  ]) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value;
  }

  const nested = record.data;
  if (nested && typeof nested === "object") {
    return resolveRedirectUrl(nested);
  }

  return null;
}

export function IntegrationsPage({
  activeNavId = "integrations",
}: IntegrationsPageProps) {
  const [social, setSocial] = useState<Record<SocialPlatformId, boolean>>({
    instagram: false,
    facebook: false,
    linkedin: false,
    tiktok: false,
    youtube: false,
  });
  const [crm, setCrm] = useState<Record<Exclude<CrmToolId, "">, boolean>>({
    hubspot: false,
    salesforce: false,
    zapier: false,
    pipedrive: false,
    notion: false,
    slack: false,
  });
  const [workspace, setWorkspace] = useState<
    Record<WorkspaceProviderId, boolean>
  >({
    google: false,
    microsoft: false,
  });
  const connectGoogle = useConnectGoogleBusinessAccountQuery();

  const toggleSocial = (id: SocialPlatformId) => {
    setSocial((previous) => ({ ...previous, [id]: !previous[id] }));
  };

  const toggleCrm = (id: Exclude<CrmToolId, "">) => {
    setCrm((previous) => ({ ...previous, [id]: !previous[id] }));
  };

  const handleWorkspaceToggle = (id: WorkspaceProviderId) => {
    if (id === "microsoft") {
      setWorkspace((previous) => ({
        ...previous,
        microsoft: !previous.microsoft,
      }));
      return;
    }

    if (workspace.google) {
      setWorkspace((previous) => ({ ...previous, google: false }));
      return;
    }
    connectGoogle.refetch().then((data) => {
      if (data.data) {
        setWorkspace((previous) => ({ ...previous, google: true }));
      }
    });
  };

  return (
    <AppShell activeNavId={activeNavId}>
      <IntegrationsPageHeader />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-10"
      >
        <IntegrationSection
          title="Social"
          description="Connect social platforms your agents can engage on."
        >
          {SOCIAL_INTEGRATION_CARDS.map((item) => {
            if (!isSocialPlatformId(item.id)) return null;
            return (
              <IntegrationCard
                key={item.id}
                name={item.name}
                description={item.description}
                icon={<SocialPlatformIcon platform={item.id} />}
                connected={social[item.id]}
                onToggle={() => toggleSocial(item.id as SocialPlatformId)}
              />
            );
          })}
        </IntegrationSection>

        <IntegrationSection
          title="CRM"
          description="Sync leads and conversations with your CRM stack."
        >
          {CRM_INTEGRATION_CARDS.map((item) => {
            if (!isCrmToolId(item.id)) return null;
            return (
              <IntegrationCard
                key={item.id}
                name={item.name}
                description={item.description}
                icon={<CrmToolIcon tool={item.id} />}
                connected={crm[item.id]}
                onToggle={() => toggleCrm(item.id as Exclude<CrmToolId, "">)}
              />
            );
          })}
        </IntegrationSection>

        <IntegrationSection
          title="Google & Microsoft"
          description="Connect workspace accounts for business profile and productivity tools."
        >
          {WORKSPACE_INTEGRATION_CARDS.map((item) => {
            if (!isWorkspaceProviderId(item.id)) return null;
            return (
              <IntegrationCard
                key={item.id}
                name={item.name}
                description={item.description}
                icon={<WorkspaceProviderIcon provider={item.id} />}
                connected={workspace[item.id]}
                loading={item.id === "google" && connectGoogle.isPending}
                onToggle={() => handleWorkspaceToggle(item.id as WorkspaceProviderId)}
              />
            );
          })}
        </IntegrationSection>

        <motion.div variants={fadeUp} className="h-2" aria-hidden />
      </motion.div>
    </AppShell>
  );
}

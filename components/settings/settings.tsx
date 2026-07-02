"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout";
import { Card } from "@/components/ui";
import type { GeneralSection, SettingsPageProps, SettingsTab } from "@/lib/settings/types";
import { SettingsPageHeader } from "./settings-page-header";
import { SettingsTopTabs } from "./settings-top-tabs";
import { SettingsSidebar } from "./settings-sidebar";
import { ProfileBusinessCard } from "./profile-business-card";
import { SettingsSectionsGrid } from "./settings-sections-grid";

function SettingsPlaceholder({ tab }: { tab: SettingsTab }) {
  const label = tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ");

  return (
    <Card className="py-16 text-center">
      <p className="text-sm font-medium text-gray-500">
        {label} settings coming soon.
      </p>
    </Card>
  );
}

export function SettingsPage({ activeNavId = "settings" }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [activeSection, setActiveSection] = useState<GeneralSection>("profile");

  const handleSectionChange = (section: GeneralSection) => {
    setActiveSection(section);
    const element = document.getElementById(section === "profile" ? "profile" : section);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AppShell activeNavId={activeNavId}>
      <SettingsPageHeader />
      <SettingsTopTabs value={activeTab} onChange={setActiveTab} />

      {activeTab === "general" ? (
        <div className="flex flex-col gap-6 lg:flex-row">
          <SettingsSidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
          <div className="min-w-0 flex-1">
            <ProfileBusinessCard />
            <SettingsSectionsGrid />
          </div>
        </div>
      ) : (
        <SettingsPlaceholder tab={activeTab} />
      )}
    </AppShell>
  );
}

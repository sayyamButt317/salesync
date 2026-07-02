"use client";

import type { AppShellProps } from "./types";
import { Sidebar } from "./sidebar";

export function AppShell({
  children,
  activeNavId = "dashboard",
  contentClassName = "",
}: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fb]">
      <Sidebar activeNavId={activeNavId} />
      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className={`min-h-full p-8 ${contentClassName}`}>{children}</div>
      </main>
    </div>
  );
}

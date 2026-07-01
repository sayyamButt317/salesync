"use client";

import type { AppShellProps } from "./types";
import { Sidebar } from "./sidebar";

export function AppShell({ children, activeNavId = "agencies" }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar activeNavId={activeNavId} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

"use client";

import type { ReactNode } from "react";
import { ClientSidebar } from "./client-sidebar";

export interface ClientShellProps {
  children: ReactNode;
  activeNavId?: string;
}

export function ClientShell({
  children,
  activeNavId = "dashboard",
}: ClientShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fb]">
      <ClientSidebar activeNavId={activeNavId} />
      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="min-h-full p-8">{children}</div>
      </main>
    </div>
  );
}

"use client";

import type { ReactNode } from "react";
import WebSocketListener from "@/provider/websocketlistener";
import { ClientSidebar } from "./client-sidebar";

export interface ClientShellProps {
  children: ReactNode;
  activeNavId?: string;
  contentClassName?: string;
}

export function ClientShell({
  children,
  activeNavId = "dashboard",
  contentClassName = "",
}: ClientShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fb]">
      <WebSocketListener />
      <ClientSidebar activeNavId={activeNavId} />
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className={`min-h-0 flex-1 overflow-y-auto p-8 ${contentClassName}`}>
          {children}
        </div>
      </main>
    </div>
  );
}

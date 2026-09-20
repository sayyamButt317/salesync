import type { ReactNode } from "react";
import type { CrmToolId } from "@/lib/create-agent/integrations";
import type { WorkspaceProviderId } from "@/lib/integrations/data";

function IconShell({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${className}`}
    >
      {children}
    </div>
  );
}

export function MicrosoftIcon() {
  return (
    <IconShell className="bg-white ring-1 ring-gray-200">
      <svg viewBox="0 0 23 23" className="h-5 w-5" aria-hidden>
        <path fill="#F25022" d="M1 1h9.5v9.5H1z" />
        <path fill="#00A4EF" d="M12.5 1H22v9.5h-9.5z" />
        <path fill="#7FBA00" d="M1 12.5h9.5V22H1z" />
        <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
      </svg>
    </IconShell>
  );
}

export function GoogleWorkspaceIcon() {
  return (
    <IconShell className="bg-white ring-1 ring-gray-200">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    </IconShell>
  );
}

const CRM_ICONS: Record<Exclude<CrmToolId, "">, ReactNode> = {
  hubspot: (
    <IconShell className="bg-[#FFE8DF]">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#FF7A59]" aria-hidden>
        <path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.984v-.066A2.215 2.215 0 0 0 17.234.82h-.067a2.215 2.215 0 0 0-2.197 2.214v.066c0 .855.487 1.594 1.2 1.96v2.87a5.48 5.48 0 0 0-2.89 1.16l-7.66-5.95a2.36 2.36 0 0 0 .1-.64 2.37 2.37 0 1 0-2.37 2.37c.34 0 .66-.08.95-.21l7.5 5.82a5.47 5.47 0 0 0-.8 2.84c0 .74.15 1.44.42 2.08L5.72 17.3a2.08 2.08 0 0 0-.76-.15 2.1 2.1 0 1 0 2.1 2.1c0-.33-.08-.64-.21-.92l5.48-4.25c.7.73 1.64 1.23 2.7 1.37v3.36a2.2 2.2 0 0 0-1.27 1.98v.07A2.215 2.215 0 0 0 16.06 23h.067a2.215 2.215 0 0 0 2.197-2.215v-.066a2.2 2.2 0 0 0-1.267-1.984v-3.36a5.48 5.48 0 0 0 4.04-5.3 5.48 5.48 0 0 0-3.0-5.145z" />
      </svg>
    </IconShell>
  ),
  salesforce: (
    <IconShell className="bg-[#D9ECFF]">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#00A1E0]" aria-hidden>
        <path d="M10.04 6.05c.72-.75 1.73-1.22 2.85-1.22 1.34 0 2.52.67 3.24 1.69.66-.3 1.39-.46 2.15-.46 2.73 0 4.94 2.17 4.94 4.85 0 2.68-2.21 4.85-4.94 4.85-.2 0-.4-.01-.6-.04-.58 1.5-2.04 2.57-3.74 2.57-1.03 0-1.97-.4-2.67-1.05-.67.78-1.68 1.27-2.81 1.27-1.4 0-2.62-.78-3.25-1.93-.33.09-.68.14-1.04.14C1.86 17.72 0 15.9 0 13.66c0-1.8 1.2-3.32 2.85-3.84C3.03 7.6 4.84 6.15 7 6.15c1.14 0 2.18.37 3.04.9z" />
      </svg>
    </IconShell>
  ),
  zapier: (
    <IconShell className="bg-[#FFE8D6]">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#FF4A00]" aria-hidden>
        <path d="M15 6h6v2h-6V6zm-4 0H1v2h10V6zm2 5h10v2H13v-2zm-4 0H1v2h8v-2zm8 5h4v2h-4v-2zm-4 0H1v2h12v-2z" />
      </svg>
    </IconShell>
  ),
  pipedrive: (
    <IconShell className="bg-[#E4F7EE]">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#017737]" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.5 14.5h-3v-9h3v9zm0-10.5h-3V4h3v2z" />
      </svg>
    </IconShell>
  ),
  notion: (
    <IconShell className="bg-gray-100">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-black" aria-hidden>
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l9.394-.68c.196 0 .047-.196-.023-.233L14.6 2.8c-.42-.326-.98-.606-1.82-.56L3.5 3.293c-.513.047-.606.28-.42.466l1.379.449zm.746 2.148v11.59c0 .606.28.84 1.166.793l10.46-.746c.886-.047 1.026-.42 1.026-.886V5.96c0-.466-.187-.7-.653-.653l-11.153.746c-.513.047-.846.28-.846.653zm9.86 1.26c.046.28 0 .56-.233.606l-.42.14v7.186c-.746.373-1.4.466-1.96.466-1.026 0-1.26-.326-1.26-.933V9.956l-1.633.14c-.047 0-.093-.046-.093-.14V8.65c0-.42.14-.653.606-.7l3.5-.28c.046 0 .093.047.093.14v.14z" />
      </svg>
    </IconShell>
  ),
  slack: (
    <IconShell className="bg-[#F4E9F7]">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          fill="#E01E5A"
          d="M5.04 15.16a2.04 2.04 0 1 1-2.04-2.04h2.04v2.04zm1.02 0a2.04 2.04 0 1 1 4.08 0v5.1a2.04 2.04 0 1 1-4.08 0v-5.1z"
        />
        <path
          fill="#36C5F0"
          d="M8.86 5.04a2.04 2.04 0 1 1 2.04-2.04v2.04H8.86zm0 1.02a2.04 2.04 0 1 1 0 4.08h-5.1a2.04 2.04 0 1 1 0-4.08h5.1z"
        />
        <path
          fill="#2EB67D"
          d="M18.96 8.86a2.04 2.04 0 1 1 2.04 2.04h-2.04V8.86zm-1.02 0a2.04 2.04 0 1 1-4.08 0v-5.1a2.04 2.04 0 1 1 4.08 0v5.1z"
        />
        <path
          fill="#ECB22E"
          d="M15.14 18.96a2.04 2.04 0 1 1-2.04 2.04v-2.04h2.04zm0-1.02a2.04 2.04 0 1 1 0-4.08h5.1a2.04 2.04 0 1 1 0 4.08h-5.1z"
        />
      </svg>
    </IconShell>
  ),
};

export function CrmToolIcon({ tool }: { tool: Exclude<CrmToolId, ""> }) {
  return CRM_ICONS[tool];
}

export function WorkspaceProviderIcon({
  provider,
}: {
  provider: WorkspaceProviderId;
}) {
  if (provider === "microsoft") return <MicrosoftIcon />;
  return <GoogleWorkspaceIcon />;
}

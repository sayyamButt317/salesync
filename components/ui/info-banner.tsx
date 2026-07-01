import type { ReactNode } from "react";
import { Info } from "lucide-react";

export interface InfoBannerProps {
  children: ReactNode;
}

export function InfoBanner({ children }: InfoBannerProps) {
  return (
    <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-violet-100 bg-violet-50 px-4 py-3 text-xs leading-relaxed text-violet-800">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
      <div>{children}</div>
    </div>
  );
}

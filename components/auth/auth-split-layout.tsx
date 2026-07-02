import type { ReactNode } from "react";

export interface AuthSplitLayoutProps {
  marketing: ReactNode;
  form: ReactNode;
  footer?: ReactNode;
}

export function AuthSplitLayout({
  marketing,
  form,
  footer,
}: AuthSplitLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 lg:block">{marketing}</div>
      <div className="flex w-full flex-col bg-[#f9fafb] lg:w-1/2">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 sm:px-10">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600">
              <span className="text-sm font-bold text-white">⚡</span>
            </div>
            <span className="text-lg font-bold text-gray-900">Salesync</span>
          </div>
          {form}
        </div>
        {footer ? (
          <div className="px-6 pb-8 text-center sm:px-10">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}

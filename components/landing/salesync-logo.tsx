import { Zap } from "lucide-react";
import Link from "next/link";

export interface SalesyncLogoProps {
  href?: string;
  dark?: boolean;
  className?: string;
}

export function SalesyncLogo({
  href = "/",
  dark = false,
  className = "",
}: SalesyncLogoProps) {
  const content = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 shadow-sm shadow-violet-600/30">
        <Zap className="h-4 w-4 fill-white text-white" />
      </span>
      <span
        className={`text-lg font-bold tracking-tight ${
          dark ? "text-white" : "text-gray-900"
        }`}
      >
        Salesync
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0">
        {content}
      </Link>
    );
  }

  return content;
}

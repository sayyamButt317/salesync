import type { ReactNode } from "react";
import type { SectionHeaderProps } from "@/lib/landing/types";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow ? (
        <p
          className={`mb-3 text-xs font-bold tracking-[0.2em] uppercase ${
            dark ? "text-violet-300" : "text-violet-600"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function GradientText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

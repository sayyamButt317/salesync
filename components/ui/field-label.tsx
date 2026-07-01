import type { LabelHTMLAttributes, ReactNode } from "react";

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  hint?: string;
  optional?: boolean;
}

export function FieldLabel({
  children,
  hint,
  optional = false,
  className = "",
  ...props
}: FieldLabelProps) {
  return (
    <div className="mb-2">
      <label
        className={`block text-sm font-semibold text-gray-900 ${className}`}
        {...props}
      >
        {children}
        {optional ? (
          <span className="ml-1 font-normal text-gray-400">(Optional)</span>
        ) : null}
      </label>
      {hint ? (
        <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{hint}</p>
      ) : null}
    </div>
  );
}

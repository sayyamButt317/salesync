import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className = "", error, children, ...props }, ref) {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={`w-full cursor-pointer appearance-none rounded-xl border bg-white px-4 py-2.5 pr-10 text-sm text-gray-900 outline-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-100 ${
            error ? "border-red-300" : "border-gray-200"
          } ${className}`}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
        {error ? (
          <p className="mt-1.5 text-xs text-red-500">{error}</p>
        ) : null}
      </div>
    );
  },
);

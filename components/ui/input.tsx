import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ className = "", error, ...props }, ref) {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-100 ${
            error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-gray-200"
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 text-xs text-red-500">{error}</p>
        ) : null}
      </div>
    );
  },
);

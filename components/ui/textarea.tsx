import type { TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  showCount?: boolean;
  maxLength?: number;
  value?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      className = "",
      error,
      showCount = false,
      maxLength,
      value = "",
      ...props
    },
    ref,
  ) {
    const length = typeof value === "string" ? value.length : 0;

    return (
      <div className="w-full">
        <div className="relative">
          <textarea
            ref={ref}
            value={value}
            maxLength={maxLength}
            className={`min-h-[120px] w-full resize-y rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-100 ${
              error
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-gray-200"
            } ${showCount ? "pb-8" : ""} ${className}`}
            {...props}
          />
          {showCount && maxLength ? (
            <span className="pointer-events-none absolute right-3 bottom-2.5 text-xs text-gray-400">
              {length}/{maxLength}
            </span>
          ) : null}
        </div>
        {error ? (
          <p className="mt-1.5 text-xs text-red-500">{error}</p>
        ) : null}
      </div>
    );
  },
);

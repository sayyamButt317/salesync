"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

export interface IconInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
}

export const IconInput = forwardRef<HTMLInputElement, IconInputProps>(
  function IconInput(
    {
      className = "",
      leftIcon,
      rightIcon,
      error,
      type = "text",
      ...props
    },
    ref,
  ) {
    return (
      <div className="w-full">
        <div className="relative">
          {leftIcon ? (
            <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </span>
          ) : null}
          <input
            ref={ref}
            type={type}
            className={`w-full rounded-xl border bg-white py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-100 ${
              leftIcon ? "pl-10" : "pl-4"
            } ${rightIcon ? "pr-10" : "pr-4"} ${
              error
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-gray-200"
            } ${className}`}
            {...props}
          />
          {rightIcon ? (
            <span className="absolute top-1/2 right-3.5 -translate-y-1/2">
              {rightIcon}
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

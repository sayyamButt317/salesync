"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import type { WizardStep } from "@/lib/create-agent/types";
import { slideInLeft } from "@/lib/motion/variants";

export interface WizardStepIndicatorProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  steps: WizardStep[];
}

export function WizardStepIndicator({
  title,
  currentStep,
  totalSteps,
  steps,
}: WizardStepIndicatorProps) {
  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={slideInLeft}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-56 shrink-0 border-r border-gray-100 bg-gray-50/40 px-6 py-8"
    >
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      <p className="mt-0.5 text-xs text-gray-400">
        Step {currentStep} of {totalSteps}
      </p>

      <ol className="relative mt-8 space-y-5">
        <div
          aria-hidden
          className="absolute top-3.5 bottom-3.5 left-[13px] w-px bg-gray-200"
        />

        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <li key={step.id} className="relative flex items-start gap-3">
              {isCompleted ? (
                <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50 ring-4 ring-gray-50/40">
                  <Check className="h-4 w-4 text-green-500" strokeWidth={2.5} />
                </span>
              ) : (
                <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                  {isActive ? (
                    <motion.span
                      layoutId="wizard-step-active"
                      className="absolute inset-0 rounded-full bg-violet-600 shadow-sm shadow-violet-600/25"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute inset-0 rounded-full border border-gray-200 bg-white" />
                  )}
                  <span
                    className={`relative z-10 text-xs font-semibold ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {step.id}
                  </span>
                </span>
              )}

              <span
                className={`relative z-10 pt-0.5 text-sm leading-snug ${
                  isActive
                    ? "font-semibold text-violet-600"
                    : isCompleted
                      ? "font-medium text-gray-700"
                      : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </motion.aside>
  );
}

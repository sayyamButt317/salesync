"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { scaleIn } from "@/lib/motion/variants";
import { WizardHeader } from "./wizard-header";
import { WizardStepIndicator } from "./wizard-step-indicator";
import type { WizardStep } from "@/lib/create-agent/types";

export interface WizardLayoutProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  steps: WizardStep[];
  children: ReactNode;
  footer: ReactNode;
  onSaveAndExit?: () => void;
  onClose?: () => void;
}

export function WizardLayout({
  title,
  currentStep,
  totalSteps,
  steps,
  children,
  footer,
  onSaveAndExit,
  onClose,
}: WizardLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9fb] p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={scaleIn}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex w-full max-w-[960px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60"
      >
        <WizardHeader onSaveAndExit={onSaveAndExit} onClose={onClose} />

        <div className="flex min-h-[520px]">
          <WizardStepIndicator
            title={title}
            currentStep={currentStep}
            totalSteps={totalSteps}
            steps={steps}
          />
          <div className="flex flex-1 flex-col">
            <div className="flex-1 px-8 py-8">{children}</div>
            {footer}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

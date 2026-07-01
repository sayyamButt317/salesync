"use client";

import { ArrowRight, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useGsapArrowNudge } from "@/lib/motion/use-gsap-arrow-nudge";
import { useGsapButtonGlow } from "@/lib/motion/use-gsap-button-glow";
import { useGsapRocketHover } from "@/lib/motion/use-gsap-rocket";

export interface WizardFooterProps {
  onNext?: () => void;
  onBack?: () => void;
  showBack?: boolean;
  nextLabel?: string;
  nextDisabled?: boolean;
  isLastStep?: boolean;
}

export function WizardFooter({
  onNext,
  onBack,
  showBack = false,
  nextLabel = "Next",
  nextDisabled = false,
  isLastStep = false,
}: WizardFooterProps) {
  const arrowRef = useGsapArrowNudge<SVGSVGElement>();
  const rocketRef = useGsapRocketHover<SVGSVGElement>(nextDisabled);
  const nextRef = useGsapButtonGlow<HTMLButtonElement>(nextDisabled);

  return (
    <div className="flex items-center justify-between border-t border-gray-100 px-8 py-5">
      {showBack ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onBack}
          className="cursor-pointer rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-300 hover:bg-gray-50"
        >
          Back
        </motion.button>
      ) : (
        <span />
      )}

      <motion.button
        ref={nextRef}
        whileHover={{ scale: nextDisabled ? 1 : 1.02 }}
        whileTap={{ scale: nextDisabled ? 1 : 0.98 }}
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-6 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLastStep ? (
          <>
            <Rocket ref={rocketRef} className="h-4 w-4" />
            Create Agent
          </>
        ) : (
          <>
            {nextLabel}
            <ArrowRight ref={arrowRef} className="h-4 w-4" />
          </>
        )}
      </motion.button>
    </div>
  );
}

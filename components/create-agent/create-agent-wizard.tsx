"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  DESCRIPTION_MAX_LENGTH,
  WIZARD_STEPS,
  WIZARD_TITLE,
} from "@/lib/create-agent/constants";
import type {
  AgentWizardFormData,
  BusinessDetails,
  ChannelContact,
  ChannelContactErrors,
  CreateAgentWizardProps,
  IntegrationsConfig,
} from "@/lib/create-agent/types";
import { INITIAL_FORM_DATA } from "@/lib/create-agent/types";
import type { AgentTypeId } from "@/lib/create-agent/types";
import {
  hasChannelErrors,
  isChannelContactComplete,
  validateAgentType,
  validateBusinessDetails,
  validateChannelContact,
  validateNicheSelection,
} from "@/lib/create-agent/validation";
import { wizardStepContent } from "@/lib/motion/variants";
import { WizardFooter } from "./wizard-footer";
import { WizardLayout } from "./wizard-layout";
import { BusinessDetailsStep } from "./steps/business-details-step";
import { ChannelContactStep } from "./steps/channel-contact-step";
import { SelectNichesStep } from "./steps/select-niches-step";
import { SelectAgentTypeStep } from "./steps/select-agent-type-step";
import { IntegrationsStep } from "./steps/integrations-step";
import { ReviewConfirmStep } from "./steps/review-confirm-step";

export function CreateAgentWizard({
  onSaveAndExit,
  onComplete,
  onClose,
}: CreateAgentWizardProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<AgentWizardFormData>(INITIAL_FORM_DATA);
  const [confirmed, setConfirmed] = useState(false);
  const [businessErrors, setBusinessErrors] = useState<
    Partial<Record<keyof BusinessDetails, string>>
  >({});
  const [nicheError, setNicheError] = useState<string | undefined>();
  const [agentTypeError, setAgentTypeError] = useState<string | undefined>();
  const [channelErrors, setChannelErrors] = useState<ChannelContactErrors>({});

  const totalSteps = WIZARD_STEPS.length;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.push("/");
    }
  }, [onClose, router]);

  const handleSaveAndExit = useCallback(() => {
    onSaveAndExit?.(formData);
    handleClose();
  }, [formData, handleClose, onSaveAndExit]);

  const updateBusinessDetails = useCallback(
    (field: keyof BusinessDetails, value: string) => {
      setFormData((previous) => ({
        ...previous,
        businessDetails: {
          ...previous.businessDetails,
          [field]: value,
        },
      }));

      if (businessErrors[field]) {
        setBusinessErrors((previous) => {
          const next = { ...previous };
          delete next[field];
          return next;
        });
      }
    },
    [businessErrors],
  );

  const togglePopularNiche = useCallback((nicheId: string) => {
    setFormData((previous) => {
      const popular = previous.niches.popular.includes(nicheId)
        ? previous.niches.popular.filter((id) => id !== nicheId)
        : [...previous.niches.popular, nicheId];

      return {
        ...previous,
        niches: { ...previous.niches, popular },
      };
    });
    setNicheError(undefined);
  }, []);

  const updateCustomNiches = useCallback((custom: string[]) => {
    setFormData((previous) => ({
      ...previous,
      niches: { ...previous.niches, custom },
    }));
    setNicheError(undefined);
  }, []);

  const selectAgentType = useCallback((agentType: AgentTypeId) => {
    setFormData((previous) => ({ ...previous, agentType }));
    setAgentTypeError(undefined);
  }, []);

  const updateChannels = useCallback((channels: ChannelContact) => {
    setFormData((previous) => ({ ...previous, channels }));
    setChannelErrors({});
  }, []);

  const updateIntegrations = useCallback((integrations: IntegrationsConfig) => {
    setFormData((previous) => ({ ...previous, integrations }));
  }, []);

  const validateCurrentStep = useCallback((): boolean => {
    if (currentStep === 1) {
      const stepErrors = validateBusinessDetails(formData.businessDetails);
      setBusinessErrors(stepErrors);
      return Object.keys(stepErrors).length === 0;
    }

    if (currentStep === 2) {
      const error = validateNicheSelection(formData.niches);
      setNicheError(error);
      return !error;
    }

    if (currentStep === 3) {
      const error = validateAgentType(formData.agentType);
      setAgentTypeError(error);
      return !error;
    }

    if (currentStep === 4) {
      const errors = validateChannelContact(formData.channels);
      setChannelErrors(errors);
      return !hasChannelErrors(errors);
    }

    if (currentStep === 6) {
      return confirmed;
    }

    return true;
  }, [
    currentStep,
    formData.businessDetails,
    formData.niches,
    formData.agentType,
    formData.channels,
    confirmed,
  ]);

  const goToStep = useCallback(
    (step: number) => {
      setDirection(step > currentStep ? 1 : -1);
      setCurrentStep(step);
    },
    [currentStep],
  );

  const handleNext = useCallback(() => {
    if (!validateCurrentStep()) return;

    if (isLastStep) {
      onComplete?.(formData);
      handleClose();
      return;
    }

    goToStep(currentStep + 1);
  }, [
    validateCurrentStep,
    isLastStep,
    onComplete,
    formData,
    handleClose,
    goToStep,
    currentStep,
  ]);

  const handleBack = useCallback(() => {
    if (!isFirstStep) {
      goToStep(currentStep - 1);
    }
  }, [isFirstStep, goToStep, currentStep]);

  const handleEditSummary = useCallback(() => {
    goToStep(1);
  }, [goToStep]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BusinessDetailsStep
            data={formData.businessDetails}
            errors={businessErrors}
            onChange={updateBusinessDetails}
          />
        );
      case 2:
        return (
          <SelectNichesStep
            data={formData.niches}
            error={nicheError}
            onTogglePopular={togglePopularNiche}
            onCustomChange={updateCustomNiches}
          />
        );
      case 3:
        return (
          <SelectAgentTypeStep
            value={formData.agentType}
            error={agentTypeError}
            onSelect={selectAgentType}
          />
        );
      case 4:
        return (
          <ChannelContactStep
            data={formData.channels}
            errors={channelErrors}
            onChange={updateChannels}
          />
        );
      case 5:
        return (
          <IntegrationsStep
            data={formData.integrations}
            onChange={updateIntegrations}
          />
        );
      case 6:
        return (
          <ReviewConfirmStep
            data={formData}
            confirmed={confirmed}
            onConfirmedChange={setConfirmed}
            onEdit={handleEditSummary}
          />
        );
      default:
        return null;
    }
  };

  const isNextDisabled = (() => {
    if (currentStep === 1) {
      return (
        !formData.businessDetails.brandName.trim() ||
        !formData.businessDetails.description.trim() ||
        formData.businessDetails.description.length > DESCRIPTION_MAX_LENGTH
      );
    }

    if (currentStep === 2) {
      return (
        formData.niches.popular.length === 0 &&
        formData.niches.custom.length === 0
      );
    }

    if (currentStep === 3) {
      return formData.agentType === null;
    }

    if (currentStep === 4) {
      return !isChannelContactComplete(formData.channels);
    }

    if (currentStep === 6) {
      return !confirmed;
    }

    return false;
  })();

  return (
    <WizardLayout
      title={WIZARD_TITLE}
      currentStep={currentStep}
      totalSteps={totalSteps}
      steps={WIZARD_STEPS}
      onSaveAndExit={handleSaveAndExit}
      onClose={handleClose}
      footer={
        <WizardFooter
          showBack={!isFirstStep}
          onBack={handleBack}
          onNext={handleNext}
          nextDisabled={isNextDisabled}
          isLastStep={isLastStep}
        />
      }
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={wizardStepContent}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>
    </WizardLayout>
  );
}

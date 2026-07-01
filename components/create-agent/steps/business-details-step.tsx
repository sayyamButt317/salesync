"use client";

import { motion } from "framer-motion";
import { FieldLabel, Input, TextArea } from "@/components/ui";
import { DESCRIPTION_MAX_LENGTH } from "@/lib/create-agent/constants";
import type { BusinessDetails } from "@/lib/create-agent/types";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";

export interface BusinessDetailsStepProps {
  data: BusinessDetails;
  errors?: Partial<Record<keyof BusinessDetails, string>>;
  onChange: (field: keyof BusinessDetails, value: string) => void;
}

export function BusinessDetailsStep({
  data,
  errors = {},
  onChange,
}: BusinessDetailsStepProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-lg"
    >
      <motion.div variants={fadeUp}>
        <h3 className="text-xl font-bold tracking-tight text-gray-900">
          Let&apos;s start with your business
        </h3>
        <p className="mt-1.5 text-sm text-gray-500">
          Tell us about your business to help us configure the perfect agent.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8 space-y-6">
        <div>
          <FieldLabel htmlFor="brandName">Business / Brand Name</FieldLabel>
          <Input
            id="brandName"
            placeholder="e.g. Acme Real Estate"
            value={data.brandName}
            onChange={(event) => onChange("brandName", event.target.value)}
            error={errors.brandName}
          />
        </div>

        <div>
          <FieldLabel
            htmlFor="description"
            hint="Describe your business, what you do, your target audience and unique value proposition."
          >
            Business Description
          </FieldLabel>
          <TextArea
            id="description"
            placeholder="Write a short description about your business..."
            value={data.description}
            onChange={(event) => onChange("description", event.target.value)}
            error={errors.description}
            showCount
            maxLength={DESCRIPTION_MAX_LENGTH}
          />
        </div>

        <div>
          <FieldLabel htmlFor="website" optional>
            Website
          </FieldLabel>
          <Input
            id="website"
            type="url"
            placeholder="https://yourwebsite.com"
            value={data.website}
            onChange={(event) => onChange("website", event.target.value)}
            error={errors.website}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

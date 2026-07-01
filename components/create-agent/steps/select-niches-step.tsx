"use client";

import { motion } from "framer-motion";
import { FieldLabel, NicheCard, TagInput } from "@/components/ui";
import { POPULAR_NICHES } from "@/lib/create-agent/niches";
import type { NicheSelection } from "@/lib/create-agent/types";
import { useGsapStaggerGrid } from "@/lib/motion/use-gsap-stagger-grid";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";

export interface SelectNichesStepProps {
  data: NicheSelection;
  error?: string;
  onTogglePopular: (nicheId: string) => void;
  onCustomChange: (custom: string[]) => void;
}

export function SelectNichesStep({
  data,
  error,
  onTogglePopular,
  onCustomChange,
}: SelectNichesStepProps) {
  const gridRef = useGsapStaggerGrid<HTMLDivElement>(POPULAR_NICHES.length);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-2xl"
    >
      <motion.div variants={fadeUp}>
        <h3 className="text-xl font-bold tracking-tight text-gray-900">
          Select your business niches
        </h3>
        <p className="mt-1.5 text-sm text-gray-500">
          Choose the niches that best represent your business.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8">
        <p className="mb-3 text-xs font-semibold tracking-wide text-gray-400 uppercase">
          Popular Niches
        </p>
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        >
          {POPULAR_NICHES.map((niche) => (
            <div key={niche.id} data-stagger-card>
              <NicheCard
                id={niche.id}
                label={niche.label}
                icon={niche.icon}
                selected={data.popular.includes(niche.id)}
                onToggle={onTogglePopular}
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8">
        <FieldLabel optional>Other Niches</FieldLabel>
        <TagInput
          tags={data.custom}
          onTagsChange={onCustomChange}
          placeholder="Type and press Enter to add niche"
        />
      </motion.div>

      {error ? (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-xs text-red-500"
        >
          {error}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

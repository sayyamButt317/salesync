"use client";

import { COUNTRIES } from "@/lib/pitch-tracker/constants";
import type { CountryFilter } from "@/lib/pitch-tracker/types";
import { FilterPills, InfoBanner, SearchInput } from "@/components/ui";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion/variants";

export interface PitchTrackerFiltersProps {
  search: string;
  country: CountryFilter;
  onSearchChange: (value: string) => void;
  onCountryChange: (value: CountryFilter) => void;
}

export function PitchTrackerFilters({
  search,
  country,
  onSearchChange,
  onCountryChange,
}: PitchTrackerFiltersProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchInput
          value={search}
          onValueChange={onSearchChange}
          placeholder="Search agency, CEO or focus..."
        />
        <FilterPills
          options={COUNTRIES}
          value={country}
          onChange={onCountryChange}
        />
      </div>

      <InfoBanner>
        <strong>Email note:</strong> CEO personal emails are private. Use
        LinkedIn (links below) to connect, or check agency website contact pages.
        Email hints are common patterns — always verify before sending.
      </InfoBanner>
    </motion.div>
  );
}

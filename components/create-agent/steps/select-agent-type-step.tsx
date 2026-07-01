"use client";

import { motion } from "framer-motion";
import { SelectionCard } from "@/components/ui";
import { AGENT_TYPE_OPTIONS } from "@/lib/create-agent/agent-types";
import type { AgentTypeId } from "@/lib/create-agent/types";
import { useGsapStaggerGrid } from "@/lib/motion/use-gsap-stagger-grid";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";

export interface SelectAgentTypeStepProps {
  value: AgentTypeId | null;
  error?: string;
  onSelect: (agentType: AgentTypeId) => void;
}

export function SelectAgentTypeStep({
  value,
  error,
  onSelect,
}: SelectAgentTypeStepProps) {
  const gridRef = useGsapStaggerGrid<HTMLDivElement>(
    AGENT_TYPE_OPTIONS.length,
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-2xl"
    >
      <motion.div variants={fadeUp}>
        <h3 className="text-xl font-bold tracking-tight text-gray-900">
          What type of agent do you want?
        </h3>
        <p className="mt-1.5 text-sm text-gray-500">
          Choose the primary purpose of your agent.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8">
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {AGENT_TYPE_OPTIONS.map((option) => (
            <div key={option.id} data-stagger-card>
              <SelectionCard
                id={option.id}
                title={option.label}
                description={option.description}
                icon={option.icon}
                iconColor={option.iconColor}
                selected={value === option.id}
                onSelect={(id) => onSelect(id as AgentTypeId)}
              />
            </div>
          ))}
        </div>
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

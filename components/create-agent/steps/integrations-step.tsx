"use client";

import { motion } from "framer-motion";
import { IntegrationRow, Select } from "@/components/ui";
import { CRM_TOOLS, SOCIAL_PLATFORMS } from "@/lib/create-agent/integration-constants";
import type { CrmToolId, IntegrationsConfig, SocialPlatformId } from "@/lib/create-agent/types";
import { useGsapStaggerGrid } from "@/lib/motion/use-gsap-stagger-grid";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { SocialPlatformIcon } from "../platform-icons";

export interface IntegrationsStepProps {
  data: IntegrationsConfig;
  onChange: (integrations: IntegrationsConfig) => void;
}

export function IntegrationsStep({ data, onChange }: IntegrationsStepProps) {
  const listRef = useGsapStaggerGrid<HTMLDivElement>(SOCIAL_PLATFORMS.length);

  const toggleSocial = (platformId: SocialPlatformId) => {
    onChange({
      ...data,
      social: {
        ...data.social,
        [platformId]: !data.social[platformId],
      },
    });
  };

  const updateCrmTool = (crmTool: CrmToolId) => {
    onChange({ ...data, crmTool });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-xl"
    >
      <motion.div variants={fadeUp}>
        <h3 className="text-xl font-bold tracking-tight text-gray-900">
          Connect your social accounts
        </h3>
        <p className="mt-1.5 text-sm text-gray-500">
          Connect social platforms your agent can interact with.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8">
        <p className="mb-3 text-xs font-semibold tracking-wide text-gray-400 uppercase">
          Social Media (Optional)
        </p>

        <div
          ref={listRef}
          className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-100"
        >
          {SOCIAL_PLATFORMS.map((platform) => (
            <div key={platform.id} data-stagger-card>
              <IntegrationRow
                icon={<SocialPlatformIcon platform={platform.id} />}
                name={platform.label}
                connected={data.social[platform.id]}
                onConnect={() => toggleSocial(platform.id)}
                onDisconnect={() => toggleSocial(platform.id)}
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8">
        <p className="mb-1 text-xs font-semibold tracking-wide text-gray-400 uppercase">
          CRM / Other Tools (Optional)
        </p>
        <p className="mb-3 text-xs text-gray-500">
          Connect your favorite tools to supercharge your agent.
        </p>

        <Select
          value={data.crmTool}
          onChange={(event) =>
            updateCrmTool(event.target.value as CrmToolId)
          }
        >
          {CRM_TOOLS.map((tool) => (
            <option key={tool.id || "placeholder"} value={tool.id}>
              {tool.label}
            </option>
          ))}
        </Select>
      </motion.div>
    </motion.div>
  );
}

"use client";

import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Checkbox, SummaryCard, SummaryRow, Tag } from "@/components/ui";
import type { AgentWizardFormData } from "@/lib/create-agent/types";
import {
  buildAgentSummary,
  formatNicheTags,
} from "@/lib/create-agent/summary";
import { useGsapStaggerGrid } from "@/lib/motion/use-gsap-stagger-grid";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { WhatsAppChannelIcon } from "../channel-icons";
import { SocialPlatformIcon } from "../platform-icons";

export interface ReviewConfirmStepProps {
  data: AgentWizardFormData;
  confirmed: boolean;
  onConfirmedChange: (confirmed: boolean) => void;
  onEdit?: () => void;
}

function ChannelSummaryIcon({ channelId }: { channelId: string }) {
  if (channelId === "whatsapp") {
    return (
      <div className="scale-75">
        <WhatsAppChannelIcon />
      </div>
    );
  }

  if (channelId === "email") {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100">
        <Mail className="h-4 w-4 text-violet-600" />
      </div>
    );
  }

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100">
      <Phone className="h-4 w-4 text-pink-500" />
    </div>
  );
}

export function ReviewConfirmStep({
  data,
  confirmed,
  onConfirmedChange,
  onEdit,
}: ReviewConfirmStepProps) {
  const summary = buildAgentSummary(data);
  const { visible, overflow } = formatNicheTags(summary.nicheLabels);
  const cardRef = useGsapStaggerGrid<HTMLDivElement>(1);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-xl"
    >
      <motion.div variants={fadeUp}>
        <h3 className="text-xl font-bold tracking-tight text-gray-900">
          Review &amp; Confirm
        </h3>
        <p className="mt-1.5 text-sm text-gray-500">
          Please review your agent configuration before launching.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8" ref={cardRef}>
        <div data-stagger-card>
          <SummaryCard title="Agent Summary" onEdit={onEdit}>
            <SummaryRow label="Business / Brand" value={summary.brandName} />
            <SummaryRow
              label="Description"
              value={
                <span className="leading-relaxed text-gray-700">
                  {summary.description}
                </span>
              }
            />
            <SummaryRow
              label="Niches"
              value={
                <div className="flex flex-wrap items-center gap-1.5">
                  {visible.map((niche) => (
                    <Tag key={niche}>{niche}</Tag>
                  ))}
                  {overflow > 0 ? (
                    <Tag variant="gray">+{overflow} more</Tag>
                  ) : null}
                </div>
              }
            />
            <SummaryRow label="Agent Type" value={summary.agentTypeLabel} />
            {summary.channels.length > 0 ? (
              <SummaryRow
                label="Channels"
                value={
                  <div className="space-y-2.5">
                    {summary.channels.map((channel) => (
                      <div
                        key={channel.id}
                        className="flex items-center gap-2.5"
                      >
                        <ChannelSummaryIcon channelId={channel.id} />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-900">
                            {channel.label}
                          </p>
                          <p className="truncate text-xs text-gray-500">
                            {channel.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                }
              />
            ) : null}
            {summary.socialAccounts.length > 0 ? (
              <SummaryRow
                label="Social Accounts"
                value={
                  <div className="flex flex-wrap gap-3">
                    {summary.socialAccounts.map((account) => (
                      <div
                        key={account.id}
                        className="flex items-center gap-2"
                      >
                        <div className="scale-75 origin-left">
                          <SocialPlatformIcon platform={account.id} />
                        </div>
                        <span className="text-xs font-medium text-gray-700">
                          {account.label}
                        </span>
                      </div>
                    ))}
                  </div>
                }
              />
            ) : null}
            {summary.crmToolLabel ? (
              <SummaryRow label="CRM Tool" value={summary.crmToolLabel} />
            ) : null}
          </SummaryCard>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-6">
        <Checkbox
          id="confirm-agent"
          checked={confirmed}
          onChange={onConfirmedChange}
          label="I confirm that the above information is correct."
        />
      </motion.div>
    </motion.div>
  );
}

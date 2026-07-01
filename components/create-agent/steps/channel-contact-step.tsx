"use client";

import { motion } from "framer-motion";
import {
  ChannelCard,
  Input,
  PhoneInput,
  Select,
} from "@/components/ui";
import { BUSINESS_HOURS_OPTIONS } from "@/lib/create-agent/channel-constants";
import type {
  BusinessHoursOption,
  ChannelContact,
  ChannelContactErrors,
} from "@/lib/create-agent/types";
import { useGsapStaggerGrid } from "@/lib/motion/use-gsap-stagger-grid";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import {
  BusinessHoursChannelIcon,
  EmailChannelIcon,
  PhoneChannelIcon,
  WhatsAppChannelIcon,
} from "../channel-icons";

export interface ChannelContactStepProps {
  data: ChannelContact;
  errors?: ChannelContactErrors;
  onChange: (channels: ChannelContact) => void;
}

export function ChannelContactStep({
  data,
  errors = {},
  onChange,
}: ChannelContactStepProps) {
  const listRef = useGsapStaggerGrid<HTMLDivElement>(4);

  const update = (partial: Partial<ChannelContact>) => {
    onChange({ ...data, ...partial });
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
          How should your agent connect?
        </h3>
        <p className="mt-1.5 text-sm text-gray-500">
          Choose the channels and provide contact details.
        </p>
      </motion.div>

      <motion.div
        ref={listRef}
        variants={fadeUp}
        className="mt-8 space-y-4"
      >
        <div data-stagger-card>
          <ChannelCard
            icon={<WhatsAppChannelIcon />}
            title="WhatsApp (Optional)"
            description="Connect with your customers on WhatsApp."
            enabled={data.whatsapp.enabled}
            onToggle={(enabled) =>
              update({ whatsapp: { ...data.whatsapp, enabled } })
            }
          >
            <PhoneInput
              countryCode={data.whatsapp.countryCode}
              number={data.whatsapp.number}
              onCountryCodeChange={(countryCode) =>
                update({
                  whatsapp: { ...data.whatsapp, countryCode },
                })
              }
              onNumberChange={(number) =>
                update({ whatsapp: { ...data.whatsapp, number } })
              }
              error={errors.whatsapp}
              disabled={!data.whatsapp.enabled}
            />
          </ChannelCard>
        </div>

        <div data-stagger-card>
          <ChannelCard
            icon={<EmailChannelIcon />}
            title="Email"
            description="Provide the email address for your agent."
            enabled={data.email.enabled}
            onToggle={(enabled) =>
              update({ email: { ...data.email, enabled } })
            }
          >
            <Input
              type="email"
              value={data.email.address}
              onChange={(event) =>
                update({
                  email: { ...data.email, address: event.target.value },
                })
              }
              placeholder="hello@yourbusiness.com"
              error={errors.email}
              disabled={!data.email.enabled}
            />
          </ChannelCard>
        </div>

        <div data-stagger-card>
          <ChannelCard
            icon={<PhoneChannelIcon />}
            title="Phone (Optional)"
            description="Provide a phone number for calls (if needed)."
            enabled={data.phone.enabled}
            onToggle={(enabled) =>
              update({ phone: { ...data.phone, enabled } })
            }
          >
            <PhoneInput
              countryCode={data.phone.countryCode}
              number={data.phone.number}
              onCountryCodeChange={(countryCode) =>
                update({ phone: { ...data.phone, countryCode } })
              }
              onNumberChange={(number) =>
                update({ phone: { ...data.phone, number } })
              }
              error={errors.phone}
              disabled={!data.phone.enabled}
            />
          </ChannelCard>
        </div>

        <div data-stagger-card>
          <ChannelCard
            icon={<BusinessHoursChannelIcon />}
            title="Business Hours"
            description="Set the availability of your agent."
            showToggle={false}
          >
            <Select
              value={data.businessHours}
              onChange={(event) =>
                update({
                  businessHours: event.target.value as BusinessHoursOption,
                })
              }
            >
              {BUSINESS_HOURS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </ChannelCard>
        </div>
      </motion.div>

      {errors.general ? (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-xs text-red-500"
        >
          {errors.general}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

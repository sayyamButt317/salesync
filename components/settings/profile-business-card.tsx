"use client";

import { Camera } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Button,
  Card,
  FieldLabel,
  Input,
  PhoneInput,
  Select,
} from "@/components/ui";
import { DEFAULT_PROFILE, TIMEZONE_OPTIONS } from "@/lib/settings/data";
import type { ProfileFormData } from "@/lib/settings/types";
import { fadeUp } from "@/lib/motion/variants";

export function ProfileBusinessCard() {
  const [profile, setProfile] = useState<ProfileFormData>(DEFAULT_PROFILE);

  const update = (patch: Partial<ProfileFormData>) => {
    setProfile((prev) => ({ ...prev, ...patch }));
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.05 }}
      className="mb-6"
      id="profile"
    >
      <Card>
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Profile & Business
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Update your personal information and business profile.
            </p>
          </div>
          <Button size="sm">Save Changes</Button>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-600 text-2xl font-bold text-white">
                {profile.initials}
              </div>
              <button
                type="button"
                className="absolute right-0 bottom-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-gray-100 text-gray-600 shadow-sm transition-colors hover:bg-gray-200"
                aria-label="Change avatar"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-sm font-semibold text-gray-900">
                Change Avatar
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                JPG, PNG or GIF. Max 2MB.
              </p>
              <Button variant="secondary" size="sm" className="mt-3">
                Upload Image
              </Button>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                <Input
                  id="fullName"
                  value={profile.fullName}
                  onChange={(event) =>
                    update({ fullName: event.target.value })
                  }
                />
              </div>
              <div>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(event) =>
                    update({ email: event.target.value })
                  }
                />
              </div>
              <div>
                <FieldLabel>Phone Number</FieldLabel>
                <PhoneInput
                  countryCode={profile.phoneCountryCode}
                  number={profile.phoneNumber}
                  onCountryCodeChange={(code) =>
                    update({ phoneCountryCode: code })
                  }
                  onNumberChange={(number) =>
                    update({ phoneNumber: number })
                  }
                />
              </div>
              <div>
                <FieldLabel htmlFor="timezone">Time Zone</FieldLabel>
                <Select
                  id="timezone"
                  value={profile.timezone}
                  onChange={(event) =>
                    update({ timezone: event.target.value })
                  }
                >
                  {TIMEZONE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

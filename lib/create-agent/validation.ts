import type {
  BusinessDetails,
  NicheSelection,
  AgentTypeId,
  ChannelContact,
  ChannelContactErrors,
} from "./types";

export function validateBusinessDetails(
  details: BusinessDetails,
): Partial<Record<keyof BusinessDetails, string>> {
  const errors: Partial<Record<keyof BusinessDetails, string>> = {};

  if (!details.brandName.trim()) {
    errors.brandName = "Business name is required";
  }

  if (!details.description.trim()) {
    errors.description = "Description is required";
  } else if (details.description.length > 1000) {
    errors.description = "Description must be 1000 characters or less";
  }

  if (details.website.trim()) {
    try {
      const url = details.website.startsWith("http")
        ? details.website
        : `https://${details.website}`;
      new URL(url);
    } catch {
      errors.website = "Enter a valid URL";
    }
  }

  return errors;
}

export function validateNicheSelection(
  niches: NicheSelection,
): string | undefined {
  const hasPopular = niches.popular.length > 0;
  const hasCustom = niches.custom.some((niche) => niche.trim().length > 0);

  if (!hasPopular && !hasCustom) {
    return "Select at least one niche to continue";
  }

  return undefined;
}

export function validateAgentType(
  agentType: AgentTypeId | null,
): string | undefined {
  if (!agentType) {
    return "Select an agent type to continue";
  }

  return undefined;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateChannelContact(
  channels: ChannelContact,
): ChannelContactErrors {
  const errors: ChannelContactErrors = {};

  const hasEnabledChannel =
    channels.whatsapp.enabled ||
    channels.email.enabled ||
    channels.phone.enabled;

  if (!hasEnabledChannel) {
    errors.general = "Enable at least one contact channel to continue";
  }

  if (channels.whatsapp.enabled && !channels.whatsapp.number.trim()) {
    errors.whatsapp = "WhatsApp number is required";
  }

  if (channels.email.enabled) {
    if (!channels.email.address.trim()) {
      errors.email = "Email address is required";
    } else if (!isValidEmail(channels.email.address)) {
      errors.email = "Enter a valid email address";
    }
  }

  if (channels.phone.enabled && !channels.phone.number.trim()) {
    errors.phone = "Phone number is required";
  }

  return errors;
}

export function hasChannelErrors(errors: ChannelContactErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function isChannelContactComplete(channels: ChannelContact): boolean {
  return !hasChannelErrors(validateChannelContact(channels));
}

export type BusinessHoursOption =
  | "24/7"
  | "business-hours"
  | "weekdays-only"
  | "custom";

export interface PhoneChannel {
  enabled: boolean;
  countryCode: string;
  number: string;
}

export interface EmailChannel {
  enabled: boolean;
  address: string;
}

export interface ChannelContact {
  whatsapp: PhoneChannel;
  email: EmailChannel;
  phone: PhoneChannel;
  businessHours: BusinessHoursOption;
  /** Authorization code from Meta WhatsApp Embedded Signup */
  whatsappAuthCode?: string | null;
}

export interface ChannelContactErrors {
  whatsapp?: string;
  email?: string;
  phone?: string;
  general?: string;
}

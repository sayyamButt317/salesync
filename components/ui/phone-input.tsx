import { COUNTRY_CODES } from "@/lib/create-agent/channel-constants";
import { Input } from "./input";

export interface PhoneInputProps {
  countryCode: string;
  number: string;
  onCountryCodeChange: (code: string) => void;
  onNumberChange: (number: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

export function PhoneInput({
  countryCode,
  number,
  onCountryCodeChange,
  onNumberChange,
  placeholder = "(555) 123-4567",
  error,
  disabled = false,
}: PhoneInputProps) {
  return (
    <div className="flex gap-2">
      <select
        value={countryCode}
        onChange={(event) => onCountryCodeChange(event.target.value)}
        disabled={disabled}
        className="w-[72px] shrink-0 cursor-pointer rounded-xl border border-gray-200 bg-white px-2 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {COUNTRY_CODES.map((code) => (
          <option key={code.value} value={code.value}>
            {code.label}
          </option>
        ))}
      </select>
      <Input
        type="tel"
        value={number}
        onChange={(event) => onNumberChange(event.target.value)}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
        className="flex-1"
      />
    </div>
  );
}

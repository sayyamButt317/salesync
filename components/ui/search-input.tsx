import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  onValueChange?: (value: string) => void;
}

export function SearchInput({
  className = "",
  onValueChange,
  onChange,
  ...props
}: SearchInputProps) {
  return (
    <div className="relative flex-1">
      <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="search"
        className={`w-full rounded-xl border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-violet-300 focus:ring-2 focus:ring-violet-100 ${className}`}
        onChange={(event) => {
          onChange?.(event);
          onValueChange?.(event.target.value);
        }}
        {...props}
      />
    </div>
  );
}

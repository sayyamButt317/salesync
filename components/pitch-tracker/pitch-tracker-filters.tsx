import { COUNTRIES } from "@/lib/pitch-tracker/constants";

interface PitchTrackerFiltersProps {
  search: string;
  country: string;
  onSearchChange: (value: string) => void;
  onCountryChange: (value: string) => void;
}

export function PitchTrackerFilters({
  search,
  country,
  onSearchChange,
  onCountryChange,
}: PitchTrackerFiltersProps) {
  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2.5">
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="🔍  Search agency, CEO or focus..."
          className="min-w-[200px] flex-1 rounded-lg border border-[#1e2a3a] bg-[#131927] px-3.5 py-2 text-[13px] text-slate-200 outline-none focus:border-indigo-500/50"
        />
        <div className="flex flex-wrap gap-1.5">
          {COUNTRIES.map((item) => {
            const isActive = country === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => onCountryChange(item)}
                className={`cursor-pointer rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white"
                    : "border border-[#1e2a3a] bg-[#131927] text-slate-400 hover:text-slate-200"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mb-3.5 text-xs text-slate-600">
        ⚠️ <strong className="text-slate-500">Email note:</strong> CEO personal
        emails are private. Use LinkedIn (links below) to connect, or check agency
        website contact pages. Email hints are common patterns — always verify
        before sending.
      </p>
    </>
  );
}

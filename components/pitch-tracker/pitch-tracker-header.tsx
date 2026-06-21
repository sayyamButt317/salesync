interface PitchTrackerHeaderProps {
  title: string;
  subtitle: string;
}

export function PitchTrackerHeader({
  title,
  subtitle,
}: PitchTrackerHeaderProps) {
  return (
    <div className="mb-1.5 flex items-center gap-3.5">
      <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-gradient-to-br from-indigo-500 to-violet-500 text-[22px]">
        🤝
      </div>
      <div>
        <h1 className="m-0 text-[22px] font-bold tracking-tight">{title}</h1>
        <p className="m-0 text-[13px] text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}

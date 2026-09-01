import type { WorkflowStep } from "@/lib/ai-employees/types";

export interface WorkflowPipelineProps {
  steps: WorkflowStep[];
  summary?: string;
  accentColor?: string;
}

export function WorkflowPipeline({
  steps,
  summary,
  accentColor = "#7c3aed",
}: WorkflowPipelineProps) {
  return (
    <div>
      {summary ? (
        <p
          className="mb-4 text-center text-sm font-semibold tracking-wide uppercase"
          style={{ color: accentColor }}
        >
          {summary}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-2">
            <span className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm">
              {step.label}
            </span>
            {index < steps.length - 1 ? (
              <span className="text-gray-300" aria-hidden>
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

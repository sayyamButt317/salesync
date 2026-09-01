"use client";

import { motion } from "framer-motion";
import {
  AI_EMPLOYEES,
  CLINIC_EXAMPLE,
  REAL_ESTATE_EXAMPLE,
  REPUTATION_EXAMPLE,
} from "@/lib/ai-employees/data";
import { fadeUp } from "@/lib/motion/variants";
import { BusinessProcessFlow } from "./business-process-flow";
import { BeforeAfterPanel } from "./before-after-panel";
import { ReputationDemoPanel } from "./reputation-demo-panel";
import { LeadQualificationPanel } from "./lead-qualification-panel";
import { ClinicDemoPanel } from "./clinic-demo-panel";

export function EmployeeDetailSections() {
  return (
    <div className="space-y-24 bg-gray-50/50 py-16 sm:py-20">
      {AI_EMPLOYEES.map((employee, index) => (
        <motion.section
          key={employee.id}
          id={`employee-${employee.id}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ delay: index * 0.05 }}
          className="scroll-mt-24"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <span className="text-3xl" aria-hidden>
                {employee.emoji}
              </span>
              <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                {employee.name}
              </h2>
              <p className="mt-2 text-lg font-medium text-gray-600">
                {employee.tagline}
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-500">
                {employee.description}
              </p>
            </div>

            <div className="mb-10">
              <BeforeAfterPanel
                withoutAgent={employee.withoutAgent}
                withAgent={employee.withAgent}
                youGet={employee.youGet}
                accentColor={employee.accentColor}
              />
            </div>

            <div className="mb-10 grid gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <BusinessProcessFlow
                  steps={employee.processSteps}
                  accentColor={employee.accentColor}
                />
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="mb-4 text-xs font-bold tracking-wide text-gray-400 uppercase">
                  What you&apos;ll see in your dashboard
                </p>
                {employee.id === "reputation" ? (
                  <ReputationDemoPanel example={REPUTATION_EXAMPLE} compact />
                ) : null}
                {employee.id === "real-estate" ? (
                  <LeadQualificationPanel example={REAL_ESTATE_EXAMPLE} compact />
                ) : null}
                {employee.id === "clinic" ? (
                  <ClinicDemoPanel example={CLINIC_EXAMPLE} compact />
                ) : null}
              </div>
            </div>
          </div>
        </motion.section>
      ))}
    </div>
  );
}

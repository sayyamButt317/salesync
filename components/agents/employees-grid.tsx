"use client";

import { motion } from "framer-motion";
import { AI_EMPLOYEES, COMING_SOON_LABEL } from "@/lib/ai-employees/data";
import type { EmployeeId } from "@/lib/ai-employees/types";
import { useGsapStaggerGrid } from "@/lib/motion/use-gsap-stagger-grid";
import { fadeUp } from "@/lib/motion/variants";
import { SectionHeader } from "@/components/landing/section-header";
import { EmployeeProductCard } from "./employee-product-card";

function scrollToEmployee(id: EmployeeId) {
  document.getElementById(`employee-${id}`)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function EmployeesGrid() {
  const gridRef = useGsapStaggerGrid<HTMLDivElement>(
    AI_EMPLOYEES.length,
    true,
    "[data-employee-card]",
  );

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-10 flex justify-center"
        >
          <SectionHeader
            title="Which problem do you need solved?"
            description="Pick the agent that matches your biggest headache. Each one is built for a specific business outcome—not generic chatbots."
          />
        </motion.div>

        <div
          ref={gridRef}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {AI_EMPLOYEES.map((employee) => (
            <EmployeeProductCard
              key={employee.id}
              employee={employee}
              onSelect={scrollToEmployee}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-sm font-medium text-gray-400">
          {COMING_SOON_LABEL}
        </p>
      </div>
    </section>
  );
}

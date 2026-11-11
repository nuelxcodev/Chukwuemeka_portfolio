"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { EXPERIENCE } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });

  return (
    <section id="experience" className="relative px-6 py-28 md:px-12 md:py-40 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          label="Experience"
          title="Five teams, one *throughline.*"
          lede="From intern to team lead: each role added a layer, from components and APIs to architecture and engineering standards."
        />

        <ol ref={ref} className="relative">
          {/* timeline rail + live progress */}
          <div aria-hidden className="absolute bottom-0 left-[7px] top-2 w-px bg-line md:left-[calc(22%-1px)]" />
          <motion.div
            aria-hidden
            style={{ scaleY }}
            className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-accent md:left-[calc(22%-1px)]"
          />

          {EXPERIENCE.map((job, i) => (
            <li
              key={job.company + job.role}
              className="relative grid gap-4 pb-16 pl-10 last:pb-0 md:grid-cols-[22%_1fr] md:gap-0 md:pb-24 md:pl-0"
            >
              <span
                aria-hidden
                className="absolute left-0 top-2 grid h-[15px] w-[15px] place-items-center rounded-full border border-line-strong bg-bg md:left-[calc(22%-8px)]"
              >
                <span
                  className={
                    job.current
                      ? "h-1.5 w-1.5 animate-pulse rounded-full bg-accent"
                      : "h-1.5 w-1.5 rounded-full bg-muted"
                  }
                />
              </span>

              <Reveal delay={0.05} className="md:pr-12 md:text-right">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  {job.period}
                </p>
                {job.current && (
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    Current
                  </p>
                )}
              </Reveal>

              <Reveal delay={0.1 + i * 0.02} className="md:pl-14">
                <h3 className="text-2xl font-semibold tracking-tight md:text-4xl">{job.role}</h3>
                <p className="mt-2 text-lg text-muted">
                  <span className="text-fg">{job.company}</span> · {job.location}
                </p>
                <ul className="mt-6 max-w-2xl space-y-3 text-muted">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3 leading-relaxed">
                      <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

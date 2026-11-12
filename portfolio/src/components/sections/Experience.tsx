"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ChevronDown } from "lucide-react";
import { EXPERIENCE, EXPERIENCE_VISIBLE, type Job } from "@/data/site";
import { cn, EASE } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";

function JobItem({ job, last }: { job: Job; last: boolean }) {
  return (
    <li
      className={cn(
        "relative grid gap-4 pl-10 md:grid-cols-[22%_1fr] md:gap-0 md:pl-0",
        last ? "pb-0" : "pb-16 md:pb-24",
      )}
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
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{job.period}</p>
        {job.current && (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Current
          </p>
        )}
      </Reveal>

      <Reveal delay={0.1} className="md:pl-14">
        <h3 className="text-2xl font-semibold tracking-tight md:text-4xl">{job.role}</h3>
        <p className="mt-2 text-lg text-muted">
          <span className="text-fg">{job.company}</span> · {job.location}
        </p>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg/90">{job.summary}</p>
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
  );
}

export function Experience() {
  const railRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const recent = EXPERIENCE.slice(0, EXPERIENCE_VISIBLE);
  const earlier = EXPERIENCE.slice(EXPERIENCE_VISIBLE);

  const { scrollYProgress } = useScroll({
    target: railRef,
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
          lede="Each role added a layer: first components and APIs, then whole mobile apps and dashboards, and now the architecture and standards a backend team works by."
        />

        <div ref={railRef} className="relative">
          {/* timeline rail + live progress */}
          <div
            aria-hidden
            className="absolute bottom-0 left-[7px] top-2 w-px bg-line md:left-[calc(22%-1px)]"
          />
          <motion.div
            aria-hidden
            style={{ scaleY }}
            className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-accent md:left-[calc(22%-1px)]"
          />

          <ol aria-label="Most recent positions">
            {recent.map((job, i) => (
              <JobItem
                key={job.company + job.role}
                job={job}
                last={!open && i === recent.length - 1}
              />
            ))}
          </ol>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                key="earlier"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.75, ease: EASE }}
                className="overflow-hidden"
              >
                <ol start={EXPERIENCE_VISIBLE + 1} aria-label="Previous positions" className="pt-16 md:pt-24">
                  {earlier.map((job, i) => (
                    <JobItem
                      key={job.company + job.role}
                      job={job}
                      last={i === earlier.length - 1}
                    />
                  ))}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {earlier.length > 0 && (
          <div className="mt-12 flex md:pl-[calc(22%+3.5rem)]">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={open ? panelId : undefined}
              className="group glass inline-flex items-center gap-3 rounded-full border border-line-strong px-6 py-3.5 font-medium transition-colors duration-300 hover:border-fg"
            >
              {open ? "Show fewer positions" : "Show more previous positions"}
              {!open && (
                <span className="rounded-full bg-fg/10 px-2 py-0.5 font-mono text-xs text-muted">
                  {earlier.length}
                </span>
              )}
              <ChevronDown
                size={18}
                aria-hidden
                className={cn("transition-transform duration-500", open && "rotate-180")}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

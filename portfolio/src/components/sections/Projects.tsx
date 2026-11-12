"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { EARLIER_WORK, PROJECTS, type Project, type Shot } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { Chip } from "@/components/ui/Chip";
import { ChartVisual } from "@/components/visuals/Visuals";

/** Real screenshot inside a browser frame (web) or on a glowing stage (phone). */
function ScreenShot({ shot }: { shot: Shot }) {
  if (shot.kind === "phone") {
    return (
      <div className="relative grid h-full min-h-[22rem] place-items-center overflow-hidden rounded-2xl border border-line bg-surface-2 py-8">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgb(91_124_255/0.28),transparent_62%)]"
        />
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes="(min-width: 768px) 260px, 70vw"
          className="relative h-auto w-[min(70%,15.5rem)] drop-shadow-[0_30px_50px_rgb(0_0_0/0.55)] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.04]"
        />
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface-2">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
        {shot.host && (
          <span className="mx-auto max-w-[70%] truncate rounded-full bg-bg/70 px-4 py-1 font-mono text-[10px] text-muted">
            {shot.host}
          </span>
        )}
        <span className="w-[42px]" aria-hidden />
      </div>
      <div className="overflow-hidden">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes="(min-width: 1280px) 560px, (min-width: 768px) 45vw, 90vw"
          className="h-auto w-full transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.035]"
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reverse = project.layout === "wide-reverse";

  return (
    <Reveal className="md:col-span-2">
      <TiltCard className="glass h-full rounded-[2rem] border border-line p-5 transition-colors duration-500 hover:border-line-strong md:p-6">
        <article className="grid h-full items-center gap-6 md:grid-cols-2 md:gap-10">
          <div className={cn(reverse ? "md:order-1" : "md:order-2")}>
            {project.shot ? <ScreenShot shot={project.shot} /> : <ChartVisual />}
          </div>

          <div
            className={cn(
              "flex h-full flex-col justify-between gap-8 p-1 md:p-3",
              reverse ? "md:order-2" : "md:order-1",
            )}
          >
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                <span className="text-accent">0{index + 1}</span>
                <span>{project.kicker}</span>
                {project.badge && (
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold text-accent-ink">
                    {project.badge}
                  </span>
                )}
              </div>

              <h3 className="text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl">
                {project.title}
              </h3>
              <p className="mt-5 max-w-xl leading-relaxed text-muted">{project.summary}</p>

              <ul className="mt-6 space-y-2.5 text-sm text-muted">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span aria-hidden className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-line pt-4 text-sm">
                <span className="text-muted">
                  {project.role}
                  {project.year ? ` · ${project.year}` : ""}
                </span>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-fg transition-colors hover:text-accent"
                  >
                    Visit live site <ArrowUpRight size={16} aria-hidden />
                    <span className="sr-only"> {project.title} (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28 md:px-12 md:py-40 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          label="Selected work"
          title="Things I've *shipped* and am shipping."
          lede="AI products, logistics platforms, mobile marketplaces and desktop tools."
        />

        <div className="grid gap-5 md:grid-cols-2 md:gap-6" style={{ perspective: "1400px" }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <div className="mt-24 md:mt-32">
          <Reveal>
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-muted">
              Earlier work
            </h3>
          </Reveal>
          <ul className="border-t border-line">
            {EARLIER_WORK.map((w, i) => (
              <li key={w.title} className="border-b border-line">
                <Reveal delay={i * 0.06} y={16}>
                  <a
                    href={w.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid items-center gap-2 py-6 transition-[padding] duration-500 hover:pl-4 md:grid-cols-[1.4fr_1fr_1.4fr_auto] md:gap-8 md:py-8"
                  >
                    <span className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                      {w.title}
                    </span>
                    <span className="text-muted">
                      {w.role} · {w.year}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted">
                      {w.stack}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="hidden text-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:block"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

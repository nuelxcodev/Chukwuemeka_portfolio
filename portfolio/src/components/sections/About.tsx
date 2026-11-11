"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { ABOUT } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { Chip } from "@/components/ui/Chip";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative px-6 py-28 md:px-12 md:py-40 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="01" label="About" title={ABOUT.heading} />

        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
          <div className="space-y-6 text-lg leading-relaxed text-muted md:text-xl">
            {ABOUT.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <p className="border-t border-line pt-6 font-mono text-xs uppercase tracking-[0.18em]">
                <span className="text-accent">Education</span>
                <span className="mx-3 text-line-strong">/</span>
                <span className="text-fg">
                  {ABOUT.education.program}, {ABOUT.education.school}
                </span>
                <span className="ml-3">{ABOUT.education.period}</span>
              </p>
            </Reveal>
          </div>

          <dl className="grid grid-cols-3 gap-4 self-start">
            {ABOUT.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="glass flex h-full flex-col rounded-2xl border border-line p-5">
                  <dt className="order-2 mt-3 text-xs leading-snug text-muted">{s.label}</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-fg md:text-5xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <ul className="mt-20 grid gap-4 md:mt-28 md:grid-cols-2 lg:grid-cols-4">
          {ABOUT.capabilities.map((c, i) => (
            <li key={c.title}>
              <Reveal delay={i * 0.08} className="h-full">
                <TiltCard className="glass h-full rounded-3xl border border-line p-6 transition-colors duration-500 hover:border-line-strong">
                  <p className="mb-8 font-mono text-xs text-accent">0{i + 1}</p>
                  <h3 className="mb-3 text-xl font-semibold tracking-tight">{c.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-muted">{c.body}</p>
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

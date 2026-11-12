"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { ABOUT, EDUCATION } from "@/data/site";
import { EASE } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoleFit } from "./RoleFit";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: EASE,
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
    <section id="about" className="relative px-6 py-28 md:px-12 md:py-40 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="01" label="About" title={ABOUT.heading} />

        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
          <div className="space-y-6 text-lg leading-relaxed text-muted md:text-xl">
            {ABOUT.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="space-y-4 self-start">
            <dl className="grid grid-cols-3 gap-4">
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

            <Reveal delay={0.2}>
              <div className="glass rounded-2xl border border-line p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  Education
                </p>
                <p className="mt-3 text-lg font-medium leading-snug">{EDUCATION.school}</p>
                <p className="mt-1 text-muted">
                  {EDUCATION.program} · {EDUCATION.status}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <RoleFit />
      </div>
    </section>
  );
}

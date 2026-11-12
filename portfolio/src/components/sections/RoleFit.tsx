"use client";

import { FIT, FIT_HEADING, FIT_LEDE } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { TiltCard } from "@/components/ui/TiltCard";
import { Chip } from "@/components/ui/Chip";

/** Maps each role a recruiter might be hiring for to real evidence from the CV. */
export function RoleFit() {
  return (
    <div className="mt-24 md:mt-36">
      <Reveal>
        <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted">
          <span className="h-px w-10 bg-line-strong" />
          Role fit
        </p>
      </Reveal>
      <SplitText
        as="h3"
        text={FIT_HEADING}
        className="max-w-3xl text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
      />
      <Reveal delay={0.1} className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
        <p>{FIT_LEDE}</p>
      </Reveal>

      <ul className="mt-12 grid gap-4 md:grid-cols-2">
        {FIT.map((f, i) => (
          <li key={f.role}>
            <Reveal delay={(i % 2) * 0.08} className="h-full">
              <TiltCard className="glass h-full rounded-3xl border border-line p-6 transition-colors duration-500 hover:border-line-strong md:p-8">
                <p className="mb-6 font-mono text-xs text-accent">0{i + 1}</p>
                <h4 className="text-2xl font-semibold tracking-tight">{f.role}</h4>
                <p className="mt-3 leading-relaxed text-muted">{f.pitch}</p>
                <p className="mb-3 mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-fg/70">
                  Where I've done it
                </p>
                <ul className="space-y-2.5 text-sm leading-relaxed text-muted">
                  {f.evidence.map((e) => (
                    <li key={e} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      {e}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {f.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

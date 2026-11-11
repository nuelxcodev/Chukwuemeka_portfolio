"use client";

import { STACK } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ALL = STACK.flatMap((g) => g.items);
const ROW_A = ALL.filter((_, i) => i % 2 === 0);
const ROW_B = ALL.filter((_, i) => i % 2 === 1);

function Row({ items, reverse, dur }: { items: string[]; reverse?: boolean; dur: string }) {
  // list is rendered twice so the -50% translate loops seamlessly
  const doubled = [...items, ...items];
  return (
    <div className="marquee overflow-hidden" aria-hidden>
      <div className="marquee-track" data-reverse={reverse} style={{ ["--dur" as string]: dur }}>
        {doubled.map((t, i) => (
          <span
            key={i}
            className="glass whitespace-nowrap rounded-full border border-line px-6 py-3 text-lg font-medium md:text-2xl"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Stack() {
  return (
    <section id="stack" className="relative py-28 md:py-40">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            index="04"
            label="Stack"
            title="Tools I reach for *daily.*"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Row items={ROW_A} dur="52s" />
        <Row items={ROW_B} reverse dur="60s" />
      </div>

      <div className="mt-20 px-6 md:px-12 lg:px-20">
        <dl className="mx-auto grid max-w-7xl gap-x-10 gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-5">
          {STACK.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.06} y={18}>
              <div>
                <dt className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {g.group}
                </dt>
                <dd>
                  <ul className="space-y-2 text-muted">
                    {g.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

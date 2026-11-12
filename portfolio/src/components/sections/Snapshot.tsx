"use client";

import { Download, Mail, UserPlus } from "lucide-react";
import { SITE, SNAPSHOT } from "@/data/site";
import { downloadVCard } from "@/lib/vcard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Recruiter snapshot: the whole pitch in one glance, with the three actions
 * a recruiter actually wants (CV, save contact, email).
 */
export function Snapshot() {
  return (
    <section
      id="snapshot"
      aria-labelledby="snapshot-title"
      className="relative px-6 pb-10 pt-6 md:px-12 md:pb-16 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="glass rounded-[2rem] border border-line p-6 md:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                {SITE.openToWork && (
                  <p className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                    {SITE.statusText}
                  </p>
                )}
                <h2
                  id="snapshot-title"
                  className="text-3xl font-semibold tracking-[-0.03em] md:text-5xl"
                >
                  {SNAPSHOT.title}
                </h2>
                <p className="mt-3 max-w-xl text-muted">{SNAPSHOT.lede}</p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <a
                  href={SITE.cv}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition-transform duration-300 hover:scale-[1.03]"
                >
                  <Download size={16} aria-hidden /> Download CV
                </a>
                <button
                  type="button"
                  onClick={downloadVCard}
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-medium transition-colors hover:border-fg"
                >
                  <UserPlus size={16} aria-hidden /> Save contact
                </button>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-medium transition-colors hover:border-fg"
                >
                  <Mail size={16} aria-hidden /> Email me
                </a>
              </div>
            </div>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {SNAPSHOT.facts.map((f) => (
                <div key={f.label} className="bg-surface/80 p-5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                    {f.label}
                  </dt>
                  <dd className="mt-2 text-base font-medium leading-snug">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

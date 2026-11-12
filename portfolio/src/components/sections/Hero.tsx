"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { HERO, SITE } from "@/data/site";
import { scrollToId } from "@/lib/store";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

// Intro choreography starts once the preloader lifts.
const T0 = 1.05;

function LagosClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: SITE.timezone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time || "--:--"}</span>;
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col justify-between px-6 pb-8 pt-32 md:px-12 lg:px-20"
    >
      <div className="mx-auto w-full max-w-7xl flex-1">
        <Reveal immediate delay={T0} y={12}>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            {SITE.openToWork && (
              <p className="inline-flex items-center gap-3 rounded-full border border-line-strong bg-surface/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {SITE.statusText}
              </p>
            )}
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted backdrop-blur">
              {SITE.location} · <LagosClock /> WAT
            </p>
          </div>
        </Reveal>

        <h1 className="text-[clamp(3.4rem,13vw,12rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
          <SplitText text="Chukwuemeka" className="block" immediate delay={T0 + 0.1} stagger={0.1} />
          <SplitText text="*Ekine.*" className="block" immediate delay={T0 + 0.25} stagger={0.1} />
        </h1>

        <div className="mt-10 grid max-w-3xl gap-8 md:mt-14">
          <Reveal immediate delay={T0 + 0.5}>
            <div className="space-y-4">
              <p className="text-xl leading-snug md:text-2xl">
                <span className="font-medium text-accent">{SITE.role}</span>{" "}
                <span className="text-fg">{HERO.line}</span>
              </p>
              <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">{HERO.sub}</p>
            </div>
          </Reveal>

          <Reveal immediate delay={T0 + 0.65} className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <button
                onClick={() => scrollToId("projects")}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-accent-ink transition-shadow duration-300 hover:shadow-[0_0_48px_-8px_var(--accent)]"
              >
                View selected work
                <ArrowUpRight
                  size={18}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href={SITE.cv}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/40 px-7 py-4 font-medium backdrop-blur transition-colors duration-300 hover:border-fg"
              >
                <Download size={16} aria-hidden /> Download CV
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>

      <Reveal
        immediate
        delay={T0 + 0.9}
        className="mx-auto mt-16 flex w-full max-w-7xl items-end justify-between gap-6"
      >
        <button
          onClick={() => scrollToId("about")}
          className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-fg"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-accent group-hover:text-accent">
            <ArrowDown size={16} aria-hidden className="animate-bounce" />
          </span>
          Scroll
        </button>

        <div className="flex items-center gap-2">
          <a
            href={SITE.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-fg hover:text-fg"
          >
            <GithubIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href={SITE.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-fg hover:text-fg"
          >
            <LinkedinIcon className="h-[18px] w-[18px]" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

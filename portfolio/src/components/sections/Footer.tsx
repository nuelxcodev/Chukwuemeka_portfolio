"use client";

import { ArrowUp } from "lucide-react";
import { SITE } from "@/data/site";
import { scrollToId } from "@/lib/store";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-bg/70 px-6 py-8 backdrop-blur md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {SITE.fullName}. Designed and built with Next.js, Tailwind
          and Three.js.
        </p>
        <button
          onClick={() => scrollToId("home")}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:text-fg"
        >
          Back to top
          <ArrowUp
            size={14}
            aria-hidden
            className="transition-transform duration-300 group-hover:-translate-y-1"
          />
        </button>
      </div>
    </footer>
  );
}

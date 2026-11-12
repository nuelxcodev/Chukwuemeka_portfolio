"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { NAV, SITE } from "@/data/site";
import { SECTIONS, scrollToId } from "@/lib/store";
import { cn, EASE } from "@/lib/utils";
import { useActiveSection } from "@/components/ui/useActiveSection";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const activeId = SECTIONS[active];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // let the menu close before scrolling so Lenis isn't fighting overflow:hidden
    window.setTimeout(() => scrollToId(id), open ? 250 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.2 }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <nav
          aria-label="Primary"
          className="glass flex items-center gap-1 rounded-full border border-line py-1.5 pl-2 pr-1.5 shadow-[0_8px_40px_-12px_rgb(var(--shadow-rgb)/0.45)]"
        >
          <button
            onClick={() => go("home")}
            aria-label="Back to top"
            className="mr-1 grid h-9 w-9 place-items-center rounded-full bg-fg font-mono text-xs font-semibold text-bg transition-transform duration-300 hover:scale-105"
          >
            CE
          </button>

          <ul className="hidden items-center md:flex">
            {NAV.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => go(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-fg/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <ThemeToggle className="ml-1" />

          <a
            href={SITE.cv}
            download
            className="ml-1 hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-transform duration-300 hover:scale-[1.04] md:inline-flex"
          >
            <Download size={14} aria-hidden /> CV
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="ml-1 grid h-9 w-9 place-items-center rounded-full text-fg md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at 90% 4%)" }}
            animate={{ clipPath: "circle(150% at 90% 4%)" }}
            exit={{ clipPath: "circle(0% at 90% 4%)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg/95 px-8 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-2">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: EASE }}
                >
                  <button
                    onClick={() => go(item.id)}
                    className="flex w-full items-baseline gap-4 py-2 text-left text-5xl font-semibold tracking-tight"
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex items-center gap-3">
              <a
                href={SITE.cv}
                download
                className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink"
              >
                <Download size={16} aria-hidden /> Download CV
              </a>
              <ThemeToggle className="border border-line-strong" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

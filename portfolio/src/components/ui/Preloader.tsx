"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "@/lib/utils";

/** A short, purposeful intro that masks the 3D scene's first compile. */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }
    const start = performance.now();
    const duration = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 120);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-bg p-6 md:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <span>Chukwuemeka Ekine</span>
            <span>Portfolio · 2026</span>
          </div>
          <div className="flex items-end justify-between">
            <p className="font-display text-6xl italic text-fg md:text-8xl">Hello.</p>
            <p className="font-mono text-6xl tabular-nums text-accent md:text-8xl">
              {String(count).padStart(3, "0")}
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-line">
            <div className="h-full bg-accent" style={{ width: `${count}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

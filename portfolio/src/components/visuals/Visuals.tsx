"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/utils";

/** Generative dashboard art for projects that have no screenshot. Decorative. */
const BARS = [38, 62, 48, 80, 58, 92, 70];

export function ChartVisual() {
  return (
    <div
      aria-hidden
      className="relative h-full min-h-[260px] w-full overflow-hidden rounded-2xl border border-line bg-surface-2"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 font-mono text-[11px] text-muted">Dashboard</span>
      </div>
      <div className="grid grid-cols-3 gap-3 p-5 pb-0">
        {["Members", "Income", "Expenses"].map((l, i) => (
          <div key={l} className="rounded-xl border border-line bg-bg/50 p-3">
            <p className="font-mono text-[9px] uppercase tracking-wider text-muted">{l}</p>
            <div
              className={`mt-2 h-2 rounded-full ${i === 2 ? "bg-ion/60" : "bg-accent/70"}`}
              style={{ width: `${60 + i * 12}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex h-36 items-end gap-3 px-5 pb-5 pt-6">
        {BARS.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-accent/10 to-accent"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE, delay: i * 0.07 }}
          />
        ))}
      </div>
    </div>
  );
}

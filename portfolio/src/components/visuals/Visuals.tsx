"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/utils";

/**
 * Generative project art. Each is decorative (aria-hidden) and built from
 * SVG/CSS so the page ships zero image weight.
 */

const frame =
  "relative h-full min-h-[240px] w-full overflow-hidden rounded-2xl border border-line bg-surface-2";

/* ---------- MatchMind AI: matching graph ---------- */
const NODES: Array<[number, number]> = [
  [50, 60], [110, 130], [60, 210], [170, 50], [190, 150],
  [160, 245], [290, 80], [335, 170], [280, 240], [245, 125],
];
const EDGES: Array<[number, number]> = [
  [0, 1], [1, 2], [0, 3], [1, 4], [3, 4], [4, 5], [4, 9], [9, 6], [6, 7], [7, 8], [9, 7], [5, 8], [2, 5],
];

export function GraphVisual() {
  return (
    <div aria-hidden className={frame}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgb(91_124_255/0.18),transparent_60%)]" />
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]}
            stroke="rgb(200 255 77 / 0.35)" strokeWidth="1" className="edge"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
        {/* the "match": a bright pair */}
        <line x1="190" y1="150" x2="245" y2="125" stroke="#c8ff4d" strokeWidth="2" />
        {NODES.map(([x, y], i) => (
          <circle
            key={i} cx={x} cy={y} r="4.5" fill="#f3f2ee" className="node"
            style={{ animationDelay: `${i * 0.28}s` }}
          />
        ))}
        {[[190, 150], [245, 125]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="7" fill="#c8ff4d" />
            <circle cx={x} cy={y} r="7" fill="none" stroke="#c8ff4d" strokeWidth="1.5" className="ring" />
          </g>
        ))}
      </svg>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-line bg-bg/70 px-4 py-3 font-mono text-[11px] uppercase tracking-wider backdrop-blur">
        <span className="text-muted">best match</span>
        <span className="text-accent">found</span>
      </div>
    </div>
  );
}

/* ---------- nux-express: request log ---------- */
const LOG = [
  ["GET", "/api/v1/health", "200", "4ms"],
  ["POST", "/api/v1/auth/login", "201", "38ms"],
  ["GET", "/api/v1/users/me", "200", "11ms"],
  ["PATCH", "/api/v1/orders/42", "200", "23ms"],
  ["GET", "/api/v1/admin/audit", "403", "2ms"],
  ["GET", "/api/v1/products", "200", "9ms"],
] as const;

export function TerminalVisual() {
  return (
    <div aria-hidden className={frame}>
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 font-mono text-[11px] text-muted">server.log</span>
      </div>
      <div className="space-y-2.5 p-5 font-mono text-[12px] leading-none">
        {LOG.map(([m, path, status, ms], i) => (
          <div
            key={path}
            className="log-line flex items-center gap-3 whitespace-nowrap"
            style={{ animationDelay: `${0.2 + i * 0.35}s` }}
          >
            <span className="w-12 text-ion">{m}</span>
            <span className="flex-1 truncate text-fg/80">{path}</span>
            <span className={status === "403" ? "text-[#ff6b6b]" : "text-accent"}>{status}</span>
            <span className="w-10 text-right text-muted">{ms}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-1 text-muted">
          <span className="text-accent">▸</span>
          <span className="caret inline-block h-3 w-1.5 bg-accent" />
        </div>
      </div>
    </div>
  );
}

/* ---------- GigHive: phone + map ---------- */
const PINS: Array<[string, string, string]> = [
  ["22%", "30%", "0s"],
  ["64%", "22%", "0.6s"],
  ["48%", "52%", "1.2s"],
  ["30%", "66%", "0.3s"],
];

export function PhoneVisual() {
  return (
    <div aria-hidden className={`${frame} grid place-items-center`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgb(200_255_77/0.12),transparent_55%)]" />
      <div className="relative h-[88%] w-[150px] overflow-hidden rounded-[28px] border-[3px] border-white/15 bg-bg shadow-2xl sm:w-[170px]">
        <div className="absolute left-1/2 top-2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/15" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgb(255 255 255/.06) 1px,transparent 1px),linear-gradient(90deg,rgb(255 255 255/.06) 1px,transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        {PINS.map(([l, t, d], i) => (
          <span key={i} className="pin absolute" style={{ left: l, top: t, animationDelay: d }}>
            <span className="block h-3 w-3 rounded-full bg-accent shadow-[0_0_16px_2px_rgb(200_255_77/0.7)]" />
          </span>
        ))}
        <div className="absolute inset-x-2 bottom-2 rounded-2xl border border-line bg-surface/90 p-3 backdrop-blur">
          <p className="text-[11px] font-semibold">Electrician</p>
          <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-muted">0.8 km away</p>
          <div className="mt-2 rounded-full bg-accent py-1 text-center text-[10px] font-semibold text-accent-ink">
            Book now
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Desktop app: dashboard ---------- */
const BARS = [38, 62, 48, 80, 58, 92, 70];

export function ChartVisual() {
  return (
    <div aria-hidden className={frame}>
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
            <div className={`mt-2 h-2 rounded-full ${i === 2 ? "bg-ion/60" : "bg-accent/70"}`} style={{ width: `${60 + i * 12}%` }} />
          </div>
        ))}
      </div>
      <div className="flex h-36 items-end gap-3 px-5 pt-6 pb-5">
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

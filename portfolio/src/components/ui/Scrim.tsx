"use client";

import { motion } from "motion/react";
import { useActiveSection } from "./useActiveSection";

/**
 * Faded overlay between the 3D scene and the page content, so text is always
 * easy to read. In the hero it darkens only the text side (the object stays
 * vivid); everywhere else it dims the whole scene evenly. Soft fades at the
 * top and bottom edges keep the nav and section transitions clean.
 */
export function Scrim() {
  const hero = useActiveSection() === 0;
  const fade = { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[5]">
      {/* hero: directional (left-to-right on desktop, top-to-bottom on mobile) */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--bg-rgb)/0.1)_0%,rgb(var(--bg-rgb)/0.55)_45%,rgb(var(--bg-rgb)/0.88)_100%)] md:bg-[linear-gradient(90deg,rgb(var(--bg-rgb)/0.9)_0%,rgb(var(--bg-rgb)/0.62)_36%,rgb(var(--bg-rgb)/0.1)_68%,transparent_100%)]"
        animate={{ opacity: hero ? 1 : 0 }}
        transition={fade}
      />
      {/* every other section: even dimming, a touch stronger at the edges */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(var(--bg-rgb)/0.7),rgb(var(--bg-rgb)/0.86))]"
        animate={{ opacity: hero ? 0 : 1 }}
        transition={fade}
      />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-bg to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}

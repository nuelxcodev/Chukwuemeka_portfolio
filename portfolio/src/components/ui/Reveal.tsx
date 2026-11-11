"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** animate on mount instead of when scrolled into view */
  immediate?: boolean;
};

/** Fade + rise. Transform/opacity only, so it stays on the compositor. */
export function Reveal({ children, className, delay = 0, y = 28, immediate }: Props) {
  const transition = { duration: 0.9, ease: EASE, delay };
  if (immediate) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

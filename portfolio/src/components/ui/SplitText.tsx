"use client";

import { motion } from "motion/react";
import { cn, EASE } from "@/lib/utils";

type Props = {
  /** Use \n for line breaks and *word* to set a word in the serif italic accent. */
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/** Masked word-by-word reveal. Screen readers get the plain string. */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.07,
  immediate,
  as: Tag = "span",
}: Props) {
  const plain = text.replace(/\*/g, "").replace(/\n/g, " ");
  const lines = text.split("\n");
  let index = 0;

  return (
    <Tag className={className} aria-label={plain}>
      {lines.map((line, li) => (
        <span key={li} aria-hidden className="block">
          {line.split(" ").filter(Boolean).map((raw) => {
            const accent = raw.startsWith("*") || raw.endsWith("*");
            const word = raw.replace(/\*/g, "");
            const i = index++;
            const motionProps = immediate
              ? { animate: { y: "0%" } }
              : {
                  whileInView: { y: "0%" },
                  viewport: { once: true, margin: "0px 0px -10% 0px" },
                };
            return (
              <span
                key={`${li}-${i}`}
                className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
              >
                <motion.span
                  className={cn(
                    "inline-block will-change-transform",
                    accent && "font-display italic font-normal text-accent",
                  )}
                  initial={{ y: "115%" }}
                  {...motionProps}
                  transition={{ duration: 1, ease: EASE, delay: delay + i * stagger }}
                >
                  {word}
                </motion.span>
                {" "}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { FAQ, FAQ_HEADING } from "@/data/site";
import { cn, EASE } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

function Item({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="border-b border-line">
      <h4>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="group flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-medium transition-colors hover:text-accent"
        >
          {q}
          <Plus
            size={20}
            aria-hidden
            className={cn("shrink-0 text-muted transition-transform duration-500", open && "rotate-45 text-accent")}
          />
        </button>
      </h4>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <div>
      <SplitText
        as="h3"
        text={FAQ_HEADING}
        className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
      />
      <Reveal delay={0.1} className="mt-6 border-t border-line">
        {FAQ.map((f, i) => (
          <Item key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
        ))}
      </Reveal>
    </div>
  );
}

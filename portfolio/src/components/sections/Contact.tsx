"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Phone, UserPlus } from "lucide-react";
import { CONTACT, SITE } from "@/data/site";
import { downloadVCard } from "@/lib/vcard";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Magnetic } from "@/components/ui/Magnetic";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { ContactForm } from "./ContactForm";
import { Faq } from "./Faq";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  return (
    <section id="contact" className="relative px-6 py-28 md:px-12 md:py-40 lg:px-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="text-center">
          <Reveal>
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.22em] text-muted">
              <span className="text-accent">05</span> — Contact
            </p>
          </Reveal>

          <SplitText
            as="h2"
            text={CONTACT.heading}
            className="text-[clamp(3rem,10vw,9rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
          />

          <Reveal delay={0.2} className="mx-auto mt-8 max-w-xl text-lg text-muted">
            <p>{CONTACT.lede}</p>
          </Reveal>

          <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${SITE.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-lg font-semibold text-accent-ink transition-shadow duration-300 hover:shadow-[0_0_56px_-8px_var(--accent)]"
              >
                {SITE.email}
                <ArrowUpRight
                  size={20}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={copy}
              className="glass inline-flex h-[60px] items-center gap-2 rounded-full border border-line-strong px-6 font-medium transition-colors hover:border-fg"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "done" : "copy"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2"
                >
                  {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
                  {copied ? "Copied" : "Copy email"}
                </motion.span>
              </AnimatePresence>
            </button>
            <span className="sr-only" role="status">
              {copied ? "Email address copied to clipboard" : ""}
            </span>
          </Reveal>

          <Reveal
            delay={0.4}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-muted"
          >
            <a
              href={SITE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-fg"
            >
              <LinkedinIcon className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href={SITE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-fg"
            >
              <GithubIcon className="h-4 w-4" /> GitHub
            </a>
            <button
              type="button"
              onClick={downloadVCard}
              className="inline-flex items-center gap-2 transition-colors hover:text-fg"
            >
              <UserPlus size={16} aria-hidden /> Save contact
            </button>
            {SITE.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 tabular-nums transition-colors hover:text-fg"
              >
                <Phone size={16} aria-hidden /> {p}
              </a>
            ))}
          </Reveal>
        </div>

        <div className="mt-24 grid gap-12 md:mt-32 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Faq />
        </div>
      </div>
    </section>
  );
}

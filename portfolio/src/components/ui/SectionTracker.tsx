"use client";

import { useEffect } from "react";
import { SECTIONS, setSection, type SectionId } from "@/lib/store";

/** Watches which section crosses the middle of the viewport. */
export function SectionTracker() {
  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setSection(SECTIONS.indexOf(e.target.id as SectionId));
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

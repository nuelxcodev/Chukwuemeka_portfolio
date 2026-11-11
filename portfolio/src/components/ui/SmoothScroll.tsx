"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { lenisRef, store } from "@/lib/store";

/** Inertial scrolling + the pointer/scroll feed that drives the 3D scene. */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    store.reduced = reduced;

    const onPointer = (e: PointerEvent) => {
      store.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      store.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const updateProgress = (scroll: number, velocity: number) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      store.progress = max > 0 ? Math.min(Math.max(scroll / max, 0), 1) : 0;
      store.velocity = velocity;
    };

    let lenis: Lenis | null = null;
    let raf = 0;
    let onNativeScroll: (() => void) | null = null;

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      lenisRef.current = lenis;
      lenis.on("scroll", (l: Lenis) => updateProgress(l.scroll, l.velocity));
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    } else {
      onNativeScroll = () => updateProgress(window.scrollY, 0);
      window.addEventListener("scroll", onNativeScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("pointermove", onPointer);
      if (onNativeScroll) window.removeEventListener("scroll", onNativeScroll);
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}

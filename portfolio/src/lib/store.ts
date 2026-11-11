import type Lenis from "lenis";

/**
 * Tiny mutable store shared between the DOM and the WebGL scene.
 * The scene reads it every frame inside useFrame, so scroll and pointer
 * updates never trigger React re-renders.
 */
export const SECTIONS = [
  "home",
  "about",
  "experience",
  "projects",
  "stack",
  "contact",
] as const;
export type SectionId = (typeof SECTIONS)[number];

export const store = {
  progress: 0,
  velocity: 0,
  pointerX: 0,
  pointerY: 0,
  section: 0,
  reduced: false,
};

export const lenisRef: { current: Lenis | null } = { current: null };

type Listener = () => void;
const listeners = new Set<Listener>();

export function setSection(index: number) {
  if (index < 0 || store.section === index) return;
  store.section = index;
  listeners.forEach((l) => l());
}

export function subscribeSection(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSection() {
  return store.section;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisRef.current) {
    lenisRef.current.scrollTo(el, { offset: 0, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

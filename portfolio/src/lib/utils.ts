export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** The shared easing curve: fast start, long soft landing (expo-out). */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

"use client";

import { useEffect, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { getTheme, setTheme, subscribeTheme, syncTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

function useTheme(): Theme {
  // server snapshot is "dark"; the real value is read right after hydration
  return useSyncExternalStore(subscribeTheme, getTheme, () => "dark");
}

/** Keeps the 3D scene's theme flag in sync with what the init script chose. */
export function ThemeSync() {
  useEffect(() => {
    syncTheme();
  }, []);
  return null;
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        "relative grid h-9 w-9 place-items-center overflow-hidden rounded-full text-fg transition-colors duration-300 hover:bg-fg/10",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -50 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 50 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="grid place-items-center"
        >
          {theme === "dark" ? <Sun size={17} aria-hidden /> : <Moon size={17} aria-hidden />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

import { cn } from "@/lib/utils";

export function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

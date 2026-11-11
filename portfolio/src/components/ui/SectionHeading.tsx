import { SplitText } from "./SplitText";
import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  label,
  title,
  lede,
}: {
  index: string;
  label: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="mb-14 md:mb-20">
      <Reveal>
        <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted">
          <span className="text-accent">{index}</span>
          <span className="h-px w-10 bg-line-strong" />
          {label}
        </p>
      </Reveal>
      <SplitText
        as="h2"
        text={title}
        className="max-w-4xl text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
      />
      {lede && (
        <Reveal delay={0.15} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          <p>{lede}</p>
        </Reveal>
      )}
    </header>
  );
}

import { cn } from "../../lib/cn";

export default function SectionHeading({ eyebrow, title, subtitle, className }) {
  return (
    <header className={cn("mb-10", className)}>
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-active">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-3 max-w-2xl text-text-secondary">{subtitle}</p> : null}
    </header>
  );
}

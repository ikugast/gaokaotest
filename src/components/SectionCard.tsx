import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionCardProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function SectionCard({
  title,
  eyebrow,
  description,
  children,
  className,
}: SectionCardProps) {
  return (
    <section
      className={cn(
        "rounded-[24px] border border-stone-200 bg-white p-6 shadow-sm",
        className,
      )}
    >
      <div className="mb-5 space-y-2">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
            {eyebrow}
          </p>
        ) : null}
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-['Oxanium'] text-2xl font-semibold text-stone-900">
            {title}
          </h2>
        </div>
        {description ? (
          <p className="max-w-2xl text-sm text-stone-500">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

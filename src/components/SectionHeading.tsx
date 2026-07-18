import type { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
};

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
      {children}
    </h2>
  );
}

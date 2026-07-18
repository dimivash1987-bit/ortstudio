import type { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
};

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-4xl font-medium text-ink md:text-5xl">{children}</h2>
  );
}

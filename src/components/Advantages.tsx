import { advantages } from "@/data/advantages";
import { SectionHeading } from "@/components/SectionHeading";

export function Advantages() {
  return (
    <section
      id="advantages"
      className="scroll-mt-24 border-y border-line bg-bg-elevated px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading>Наши преимущества</SectionHeading>

        <ol className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {advantages.map((item, i) => (
            <li key={item.title} className="border-t border-line pt-6">
              <div className="flex items-start gap-4">
                <span className="text-2xl font-medium text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-medium leading-snug text-ink md:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-muted">
                    {item.text}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

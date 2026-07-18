import { pricingDisclaimer, pricingPackages } from "@/data/pricing";
import { SectionHeading } from "@/components/SectionHeading";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading>Стоимость</SectionHeading>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
          Два формата работы — от полного дизайн-проекта до реализации с
          авторским надзором.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {pricingPackages.map((pkg) => (
            <article
              key={pkg.id}
              className="flex flex-col border border-line bg-bg-elevated p-7 md:p-9"
            >
              <h3 className="text-2xl font-medium text-ink md:text-3xl">{pkg.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{pkg.priceNote}</p>
              <p className="mt-6 text-4xl font-medium text-accent md:text-5xl">
                {pkg.priceLabel}
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                {pkg.description}
              </p>
              <ul className="mt-8 space-y-3 border-t border-line pt-6">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-ink md:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contacts"
                className="mt-10 inline-flex w-fit rounded-full bg-ink px-5 py-3 text-sm text-bg transition-colors hover:bg-accent"
              >
                Запросить расчёт
              </a>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-muted">
          {pricingDisclaimer}
        </p>
      </div>
    </section>
  );
}

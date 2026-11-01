import { pricingDisclaimer, pricingPackages } from "@/data/pricing";
import { SectionHeading } from "@/components/SectionHeading";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionHeading>Стоимость</SectionHeading>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
            Три формата работы — от планировки до полного проекта с авторским
            надзором.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-start">
          {pricingPackages.map((pkg) => (
            <article
              key={pkg.id}
              className="grid grid-rows-[auto_auto_1fr_auto] border border-line bg-bg-elevated p-7 md:p-8"
            >
              <div className="min-h-[4.25rem] md:min-h-[5.25rem]">
                <h3 className="text-xl font-medium leading-snug text-ink md:text-2xl">
                  {pkg.title}
                </h3>
              </div>
              <p className="mt-4 text-3xl font-medium text-accent md:text-4xl">
                {pkg.priceLabel}
              </p>
              <div className="mt-4">
                <p className="text-sm leading-relaxed text-ink-muted md:text-base">
                  {pkg.description}
                </p>
                {pkg.details ? (
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
                    {pkg.details}
                  </p>
                ) : null}
                {pkg.includes?.length ? (
                  <div className="mt-5">
                    <p className="text-sm font-medium text-ink md:text-base">
                      {pkg.includesLabel}
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-muted md:text-base">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              <a
                href="#contacts"
                className="mt-8 inline-flex w-fit rounded-full bg-ink px-5 py-3 text-sm text-bg transition-colors hover:bg-accent"
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
